<template>
  <div class="maps">
    <link
      href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css"
      rel="stylesheet"
    >
    <link href="https://api.mapbox.com/mapbox-gl-js/v0.42.0/mapbox-gl.css" rel="stylesheet">
    <el-container style="height:90vh; border: 1px solid #eee">
      <collapse-nav default-active="1">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-school" />
            <span slot="title">Country</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="item in countries"
              :key="item.code"
              index="2-1"
              @click="countrySelected(item)"
            >{{ item.country }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-coordinate" />
            <span slot="title">Admin Boundary</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="adminLevelSelected('ADM0')">Admin Level 0</el-menu-item>
            <el-menu-item index="1-2" @click="adminLevelSelected('ADM1')">Admin Level 1</el-menu-item>
            <el-menu-item index="1-2" @click="adminLevelSelected('ADM2')">Admin Level 2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-pie-chart" />
            <span slot="title">Data</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="item in tableList"
              :key="item.table_uuid"
              index="2-1"
              @click="loadMapData(item)"
            >{{ item.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </collapse-nav>

      <el-container>
        <el-main>
          <template v-if="!loading">

            <mapbox
              :access-token="accessToken"
              :map-options="{
                style: mapStyle,
                center: [-96, 37.8],
                zoom: 3,
              }"
              @map-load="loaded"
              @map-click:tablePoints="clicked"
              @map-mouseenter:tablePoints="mouseEntered"
              @map-mouseleave:tablePoints="mouseLeft"
            />
          </template>
          <template v-else>
            <div v-loading="loading" class="loading" />
          </template>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import { countryData } from './sample-data'
import { mapGetters } from 'vuex'
import Mapbox from 'mapbox-gl-vue'
import PopupContent from './components/PopupContent.vue'

const GEO_JSON_BASE_URL = process.env.VUE_APP_GEO_JSON_BASE_URL
const MAP_BOX_STYLE = process.env.VUE_APP_MAP_BOX_STYLE
import { tableActions } from '@/store/modules/tables'
import { layers } from './layers'

export default {
  name: 'Maps',
  components: {
    Mapbox
  },
  data: () => {
    return {
      adminLevel: 'ADM1',
      countries: countryData,
      country: countryData[0],
      mapParams: null,
      showMap: true,
      layerInit: false,
      selectedTable: null,
      accessToken: process.env.VUE_APP_MAPBOX_API_KEY,
      mapStyle: MAP_BOX_STYLE,
      layers: layers,
      geoJsonSource: {
        type: 'geojson',
        data: `${GEO_JSON_BASE_URL}/${countryData[0].code}/ADM0/${countryData[0].code}-ADM0.geojson`
      },
      loading: false,
      mapDefaults: null
    }
  },
  computed: {
    ...mapGetters('tables', ['getAllTables']),

    tableList() {
      return this.getAllTables
    }
  },
  created() {
    this.loadTables()
    this.mapDefaults = {
      latitude: this.country.latitude,
      longitude: this.country.longitude,
      zoom: this.country.zoom,
      speed: 1
    }
  },
  methods: {
    /**
       * triggered on country selection
       * @param selectedCountry
       */
    countrySelected(selectedCountry) {
      this.country = selectedCountry
      const data = {
        type: 'geojson',
        data: `${GEO_JSON_BASE_URL}/${this.country.code}/${this.adminLevel}/${this.country.code}-${this.adminLevel}.geojson`
      }
      const newCenter = {
        latitude: this.country.latitude,
        longitude: this.country.longitude,
        zoom: 5.2
      }
      this.addLayerToMap(
        { ...layers.layer1, id: this.country.country },
        data,
        newCenter
      )
    },

    /**
       * triggered on admin level selection
       * @param level
       */
    adminLevelSelected(level) {
      this.adminLevel = level

      // set geojson data
      const data = {
        type: 'geojson',
        data: `${GEO_JSON_BASE_URL}/${this.country.code}/${this.adminLevel}/${this.country.code}-${this.adminLevel}.geojson`
      }
      const newCenter = {
        latitude: this.country.latitude,
        longitude: this.country.longitude,
        zoom: 5.2
      }

      // reset layer if exists
      this.resetLayerSource(this.country.country)
      this.addLayerToMap(
        { ...layers.layer1, id: this.country.country },
        data,
        newCenter
      )
    },
    /** *
       * load table data and plot the maps
       * @param table: table to load it's data
       */
    loadMapData(table) {
      this.layerInit = true
      this.showMap = false
      this.selectedTable = `table${table.id}`
      this.$store.dispatch(
        `tables/${tableActions.GET_MAP_DATA}`,
        table.table_uuid
      ).then((response) => {
        this.layerInit = true
        const data =
            {
              type: 'geojson',
              data: response.data
            }

        // set coordinates to the first point
        const coordinates = response.data.features[0].geometry.coordinates
        const newCenter = {
          latitude: coordinates[1],
          longitude: coordinates[0],
          zoom: 5.2
        }

        setTimeout(() => {
          this.showMap = true
          this.resetLayerSource('tablePoints')

          this.addLayerToMap(
            { ...layers.layer2, id: `tablePoints` },
            data,
            newCenter
          )
        }, 500)

        this.loading = false
      })
    },

    /**
       * Load Tables
       */
    loadTables() {
      this.loading = true
      this.$store.dispatch(
        `tables/${tableActions.GET_TABLES}`
      ).finally(() => {
        this.loading = false
      })
    },

    /**
       * Map loaded
       * @param map: map instance
       */
    loaded(map) {
      this.myMap = map
      const newCenter = {
        latitude: this.country.latitude,
        longitude: this.country.longitude,
        zoom: 5.2
      }

      // add layer to map
      this.addLayerToMap(
        { ...layers.layer1, id: this.country.country },
        this.geoJsonSource,
        newCenter
      )
    },

    /**
       * triggered when a coordinate point on the map is clicked
       * @param map: map instance
       * @param e: mapbox click event payload
       */
    clicked(map, e) {
      if (e.features) {
        const coordinates = e.features[0].geometry.coordinates.slice()
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new mapboxgl.Popup()
          .setLngLat({ lng: coordinates[0], lat: coordinates[1] })
          .setHTML('<div id="vue-popup-content"></div>')
          .addTo(map)

        new PopupContent({
          propsData: { feature: e.features[0] }
        }).$mount('#vue-popup-content')
      }
    },

    /**
       * add a new layer to the map
       * @param layer
       * @param sourceData
       * @param newCenter
       */
    addLayerToMap(layer, sourceData, newCenter) {
      this.myMap.addLayer({ ...layer, source: sourceData })
      setTimeout(() => {
        this.myMap.flyTo(
          {
            center: [newCenter.longitude, newCenter.latitude],
            zoom: newCenter.zoom,
            speed: 1
          }
        )
      }, 500)
    },

    /**
       * triggered when mouse enters geojson point
       * @param map: map instance
       */
    mouseEntered(map) {
      map.getCanvas().style.cursor = 'pointer'
    },

    /**
       * triggered when mouse enters geojson point
       * @param map: map instance
       */
    mouseLeft(map) {
      map.getCanvas().style.cursor = ''
    },

    /**
       * Reset an existing map layer before adding another one
       * @param layerId: layer id
       */
    resetLayerSource(layerId) {
      if (this.myMap.getLayer(layerId)) {
        this.myMap.removeLayer(layerId)
      }
      if (this.myMap.getSource(layerId)) {
        this.myMap.removeSource(layerId)
      }
    }
  }
}
</script>

<style lang="scss">
  .loading {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  #map {
    width: 100%;
    height: 85vh;
  }

  .maps {
  .el-menu-item {
    height: auto;
    white-space: normal;
    word-break: break-word;
  }
}

</style>
