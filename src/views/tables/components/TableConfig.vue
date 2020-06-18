<template>
  <div class="table-config">
    <el-form ref="form" label-position="top" class="fullWidth">
      <div class="table-config__fields">
        <el-form-item :label="$t('tables.tableConfigForm.uniqueColumn')" class="table-config--field-cont">
          <el-select v-model="form.unique_column" filterable placeholder="Select unique column" class="fullWidth">
            <el-option
              v-for="item in columnOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('tables.tableConfigForm.geoLocation')" class="table-config--field-cont">
          <el-select
            v-model="form.geo_point_field"
            filterable
            placeholder="Select geolocation point column"
            class="fullWidth"
          >
            <el-option
              v-for="item in columnOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>

      <div class="table-config__fields">
        <el-form-item :label="$t('tables.tableConfigForm.latitude')" class="table-config--field-cont">
          <el-select
            v-model="form.latitude_field"
            filterable
            placeholder="Select latitude column"
            class="fullWidth"
          >
            <el-option
              v-for="item in columnOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('tables.tableConfigForm.longitude')" class="table-config--field-cont">
          <el-select
            v-model="form.longitude_field"
            filterable
            placeholder="Select longitude column"
            class="fullWidth"
          >
            <el-option
              v-for="item in columnOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="table-config__fields">
        <el-form-item :label="$t('tables.tableConfigForm.mapToolTipField')" class="fullWidth">
          <el-select
            v-model="form.tool_tip_field"
            filterable
            placeholder="Select longitude column"
            class="fullWidth"
          >
            <el-option
              v-for="item in columnOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="table-config__action-btns">
        <el-button @click="$emit('closeModal')">{{ $t('actionVerbs.cancel') }}</el-button>
        <el-button type="primary" @click="updateTable">{{ $t('actionVerbs.submit') }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { tableActions } from '@/store/modules/tables'

export default {
  name: 'TableConfig',
  props: {
    tableObject: { type: Object, required: false, default: null },
    columns: { type: Array, required: false, default: () => [] }
  },
  data() {
    return {
      form: {}
    }
  },
  computed: {
    columnOptions() {
      return this.columns.map(item => {
        return { value: item, label: item }
      })
    }
  },
  methods: {
    /** *
     * set table configurations
     */
    updateTable() {
      const tableData = {
        changes: {
          metadata: this.form
        },
        uuid: this.tableObject.uuid
      }
      this.$store.dispatch(`tables/${tableActions.EDIT_TABLE}`, tableData).then(response => {
        this.$emit('closeModal')
        this.$notify({
          title: 'Success',
          message: this.$t('notifications.successConfigSave', { table: response.name }),
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang="scss">
  .fullWidth {
    width: 100%;
  }

  .table-config {
    display: flex;

    &--field-cont {
      width: 45%;
    }

    &__fields {
      display: flex;
      justify-content: space-between;
    }

    &__field-item {
      flex: 1;
      margin-right: 8px;

      &:last-child {
        margin-right: unset;
      }
    }

    &__action-btns {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
