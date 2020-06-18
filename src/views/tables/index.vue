<template>
  <div class="table-page-list">
    <template>
      <div class="table-page-list__item-list">
        <div class="table-page-list__import">
          <h3 class="heading">{{ $t('tables.tableList') }}</h3>
          <el-dropdown @click="showModal = true" @command="sourceSelected">
            <h-button type="primary">
              + {{ $t('tables.importLabel')
              }}<i class="el-icon-arrow-down el-icon--right" />
            </h-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="'csv'">CSV</el-dropdown-item>
              <el-dropdown-item :command="'kobo'">Kobo Toolbox</el-dropdown-item>
              <el-dropdown-item :command="'ona'">Ona</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="table-page-list__table-container">
          <div
            v-for="table in tables"
            :key="table.id"
            v-loading.fullscreen.lock="loading"
            class="table-page-list__card-button"
          >
            <h-card
              class="table-page-list__card"
              plain
              @click="editTable(table)"
            >
              <div slot="title">
                <h3 class="body-3-bold truncate-table-name">{{ table.name }}</h3>
              </div>
              <div slot="items" class="info">
                <h4>{{ table.owner }}</h4>
                <h4>{{ $moment(table.update_date).format('YYYY-MM-DD') }}</h4>
                <h4>{{ table.source }}</h4>
              </div>
            </h-card>
            <div class="table-page-list__button">
              <h-button
                icon="el-icon-data-board"
                size="medium"
                dark-text
                @click="
                  $router.push({
                    name: 'TableDetails',
                    params: { tableUuid: table.table_uuid }
                  })
                "
              >
                {{ $t('tables.tableButton') }}
              </h-button>
              <h-button icon="el-icon-connection" size="medium" dark-text>
                {{ $t('tables.layerButton') }}
              </h-button>
            </div>
          </div>
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
      thirdPartyForms: null
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
        this.$store
          .dispatch(`tables/${tableActions.GET_TABLES}`)
          .finally(() => {
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
      this.$store
        .dispatch(`tables/${tableActions.DELETE_TABLE}`, table.table_uuid)
        .finally(() => {
          this.$notify({
            title: 'Success',
            message: this.$t('notifications.successDelete', {
              table: table.name
            }),
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
        this.$store
          .dispatch(
            `tables/${tableActions.GET_THIRD_PARTY_FORMS}`,
            this.tableSource
          )
          .then(forms => {
            this.thirdPartyForms = forms
          })
      }
      this.showModal = true
    }
  }
}
</script>

<style lang="scss">
.table-page-list {
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  &__item-list {
    width: 95%;
  }
  &__import {
    padding: 0px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__table-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &__card-button{
    margin: 1rem;
  }
  &__card{
    width: 400px;
    height: 200px;
  }
  &__button{
    margin-top: 3rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .truncate-table-name{
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }
  .info{
    font-size: 14px;
  }
  .el-card__header{
    padding: 40px 25px 5px 0px;
  }
  .el-card.is-always-shadow{
      border-radius: 20px;
}
}
</style>
