<template>
  <div class="table-details">
    <div class="table-details__table">
      <div class="table-details__details-header">
        <div class="table-details--header">
          <h3>{{ tableName }}</h3>
        </div>
        <div class="table-details--settings-btn">
          <el-button
            type="primary"
            @click="showModal = true"
          >
            {{ $t('tables.tableConfig') }}
          </el-button>
        </div>

      </div>
      <el-table
        v-loading.fullscreen.lock="loading"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          v-for="col in tableColumns"
          :key="col"
          fixed
          :prop="col"
          :label="col"
        />
      </el-table>
    </div>
    <el-dialog
      :title="$t('tables.setConfigs')"
      :visible.sync="showModal"
      width="35%"
      destroy-on-close
    >
      <table-config
        :columns="tableColumns"
        :table-object="tableObject"
        @closeModal="showModal=false"
      />
    </el-dialog>
  </div>
</template>

<script>
import { tableActions } from '@/store/modules/tables'
import { mapGetters } from 'vuex'
import TableConfig from './components/TableConfig'

export default {
  name: 'TableDetails',
  components: {
    TableConfig
  },
  data: () => {
    return {
      showModal: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters('tables', ['getTableDetails']),

    tableData() {
      return (this.getTableDetails.data && this.getTableDetails.data.data) || []
    },

    tableColumns() {
      return this.tableData.length && Object.keys(this.tableData[1])
    },

    tableName() {
      return this.getTableDetails.name
    },

    tableObject() {
      return {
        uuid: this.getTableDetails.table_uuid,
        name: this.getTableDetails.name
      }
    }
  },

  created() {
    this.loading = true
    this.$store.dispatch(
      `tables/${tableActions.GET_TABLE_DETAILS}`,
      this.$route.params.tableUuid
    ).finally(() => {
      this.loading = false
    })
  },

  mounted() {
    this.$nextTick().then(() => {
      this.table = this.getAllTables
    })
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
  .table-details {
    display: flex;
    justify-content: center;
    &__table {
      width: 80%;
    }

    &__details-header {
      display: flex;
      justify-content: space-between;

    }
    &--header{
      width: 50%;
    }
    &--settings-btn {
      display: flex;
      flex-direction: row-reverse;
      align-items: end;
      width: 50%;
    }
  }
</style>
