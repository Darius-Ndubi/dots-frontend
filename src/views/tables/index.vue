<template>
  <div class="table-list">
    <h-drawer
      :visible="true"
      size="26%"
      :show-close="false"
      :wrapper-closable="false"
      direction="ltr"
      :modal="false"
      class="layers-drawer"
      :with-header="false"
    >
      <div class="title">Layers</div>
      <div class="subtitle">Baseline Survey</div>

      <div class="layers">

        <div
          v-for="(layer, i) in layers"
          :key="i"
          class="layer"
        >
          <div>{{ layer.title }}</div>
          <div style="display: flex">
            <h-switch />
            <h-dropdown>
              <div slot="title">
                <i class="el-icon-more el-icon--right" />
              </div>
              <template slot="items">
                <el-dropdown-item>Edit layer</el-dropdown-item>
                <el-dropdown-item>Delete layer</el-dropdown-item>
              </template>
            </h-dropdown>
          </div>

        </div>
      </div>
      <h-button
        icon="el-icon-circle-plus-outline"
        class="add-layer__button"
        workspace-button
      >
        <!-- {{ $t('main.addWorkspace') }} -->
        Add New Layer
      </h-button>
    </h-drawer>

    <template>
      <div class="table-list__item-list">
        <div class="table-list__import-btn">
          <el-dropdown @click="showModal = true" @command="sourceSelected">
            <el-button type="primary">
              {{ $t('tables.importLabel') }}<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="'csv'">CSV</el-dropdown-item>
              <el-dropdown-item :command="'kobo'">Kobo Toolbox</el-dropdown-item>
              <el-dropdown-item :command="'ona'">Ona</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="table-list__table-cont">
          <el-table
            v-loading.fullscreen.lock="loading"
            :data="tables"
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column property="name" :label="$t('tables.listTable.tableName')">
              <template slot-scope="scope">
                <router-link
                  :to="{
                    name: 'TableDetails',
                    params: { tableUuid:scope.row.table_uuid }
                  }"
                >{{ scope.row.name }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column property="source" :label="$t('tables.listTable.source')" />
            <el-table-column property="create_date" :label="$t('tables.listTable.createDate')">
              <template slot-scope="scope">
                {{ $moment(scope.row.create_date).format('YYYY-MM-DD') }}
              </template>
            </el-table-column>
            <el-table-column property="update_date" :label="$t('tables.listTable.updateDate')">
              <template slot-scope="scope">
                {{ $moment(scope.row.update_date).format('YYYY-MM-DD') }}
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="Operations"
              width="160"
            >
              <template slot-scope="scope">
                <h-button
                  type="text"
                  size="small"
                  dark-text
                  @click="$router.push({name: 'TableDetails', params: { tableUuid:scope.row.table_uuid }})"
                >
                  Detail
                </h-button>
                <h-button
                  type="text"
                  size="small"
                  dark-text
                  @click="editTable(scope.row)"
                >
                  Edit
                </h-button>
                <h-button
                  type="text"
                  size="small"
                  dark-text
                  @click="deleteTable(scope.row)"
                >
                  Delete
                </h-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </template>

    <el-dialog
      :title="$t('tables.importCsv')"
      :visible.sync="showModal"
      width="45%"
      destroy-on-close
      @close="modalClosed"
    >
      <import-csv-form
        :table="currentTable"
        :source="tableSource"
        :third-party-forms="thirdPartyForms"
        @closeModal="modalClosed"
      />
    </el-dialog>
  </div>
</template>

<script>
import { tableActions } from '@/store/modules/tables'
import { mapGetters } from 'vuex'
import ImportCsvForm from './components/ImportCsvForm'

export default {
  name: 'TableList',
  components: {
    ImportCsvForm
  },

  data: () => {
    return {
      showModal: false,
      loading: false,
      currentTable: null,
      tableSource: '',
      thirdPartyForms: null,
      // ! WIP for data layers
      layers: [
        {
          title: 'Percentage of health spending'
        },
        {
          title: 'Population by district'
        },
        {
          title: 'Hazard area mapping'
        },
        {
          title: 'Percentage of health spending'
        },
        {
          title: 'Population by district'
        },
        {
          title: 'Hazard area mapping'
        },
        {
          title: 'Percentage of health spending'
        },
        {
          title: 'Population by district'
        },
        {
          title: 'Hazard area mapping'
        },
        {
          title: 'Population by district'
        }
      ]
    }
  },

  computed: {
    ...mapGetters('tables', {
      tables: `getAllTables`
    })
  },

  created() {
    this.loadTables()
  },

  methods: {
    loadTables() {
      this.loading = true
      setTimeout(() => {
        this.$store.dispatch(
          `tables/${tableActions.GET_TABLES}`
        ).finally(() => {
          this.loading = false
        })
      }, 1000)
    },

    /**
       * delete table
       * @param table
       */
    deleteTable(table) {
      this.loading = true
      this.$store.dispatch(
        `tables/${tableActions.DELETE_TABLE}`,
        table.table_uuid
      ).finally(() => {
        this.$notify({
          title: 'Success',
          message: this.$t('notifications.successDelete', { table: table.name }),
          type: 'error'
        })
        this.loading = false
      })
    },

    /**
       * set table to edit and show modal
       * @param {Object} row: selected row object
       */
    editTable(row) {
      this.currentTable = row
      this.showModal = true
    },

    /**
       * Called on modal close event
       */
    modalClosed() {
      this.showModal = false
      this.currentTable = null
    },

    /**
       * trigger when a table source is selected
       * @param event
       */
    sourceSelected(event) {
      this.tableSource = event.toLowerCase()
      if (this.tableSource !== 'csv') {
        this.$store.dispatch(
          `tables/${tableActions.GET_THIRD_PARTY_FORMS}`,
          this.tableSource
        ).then((forms) => {
          this.thirdPartyForms = forms
        })
      }
      this.showModal = true
    }
  }
}
</script>

<style lang="scss" scoped>
.table-list {
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  &__item-list {
    width: 95%;
  }
  &__import-btn {
    padding: 25px 10px 25px 10px;
    display: flex;
    flex-direction: row-reverse;
  }

  .title {
    padding-top: 50px;
  }

  .subtitle {
    padding-top: 10px;
    padding-bottom: 30px;
  }

  .layers {
    height: 80%;
    .layer {
      padding-bottom: 20px;
    }
  }

  .add-layer__button {
    position: absolute;
    bottom: 0;
    width: 50%;
    margin: auto 0 35px 0;
  }
}

.el-button--text {
  padding: 1.5px 4px;
  border-radius: 30px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
}

.layers {
  display: flex;
  flex-direction: column;

  .layer {
    display: flex;
    justify-content: space-between  ;
  }
}
</style>
