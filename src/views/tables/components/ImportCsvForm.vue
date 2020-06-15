<template>
  <div class="import-csv-form">
    <el-form ref="form" :model="form" label-position="top">
      <div class="import-csv-form__fields">
        <el-form-item :label="$t('tables.csvImportForm.name')" class="import-csv-form__field-item">
          <el-input v-model="form.name" />
          <span class="import-csv-form__help-text">{{ $t('tables.csvImportForm.nameHelpText') }}</span>
        </el-form-item>

        <el-form-item :label="$t('tables.listTable.source')" class="import-csv-form__field-item">
          <el-input v-model="form.source" :readonly="true" />
        </el-form-item>
      </div>
      <div v-if="!table">
        <template v-if="form.source ==='csv'">
          <el-upload
            class="import-csv-form__upload-area"
            action=""
            drag
            :auto-upload="false"
            :file-list="form.files"
            :limit="1"
            accept="csv"
            :on-change="setFile"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              {{ $t('tables.csvImportForm.drag') }} <em>{{ $t('tables.csvImportForm.clickUpload') }}</em>
            </div>
            <div slot="tip" class="el-upload__tip">
              {{ $t('tables.csvImportForm.attachFiles') }}
            </div>
          </el-upload>
        </template>
        <template v-else>
          <div class="import-csv-form__fields">
            <el-form-item
              :label="$t('tables.csvImportForm.selectForm', {source: form.source.toUpperCase()})"
              class="import-csv-form__field-item"
            >
              <el-select
                v-model="form.data.url"
                filterable
                class="fullWidth"
                placeholder="Select a form to import its data"
                @change="thirdPartyFormSelected"
              >
                <el-option
                  v-for="item in thirdPartyForms"
                  :key="item.id"
                  :label="item.title"
                  :value="item.url"
                />
              </el-select>
            </el-form-item>
          </div>
        </template>
      </div>

      <div class="import-csv-form__action-btns">
        <el-button @click="$emit('closeModal')">{{ $t('actionVerbs.cancel') }}</el-button>
        <el-button
          type="primary"
          :loading="saving"
          @click="saveData"
        >
          {{ $t('actionVerbs.submit') }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { toBase64 } from '@/utils/data.utils'
import { tableActions } from '@/store/modules/tables'

const EVENT_CLOSE = 'closeModal'

export default {
  name: 'ImportCsvForm',
  props: {
    table: { type: Object, required: false, default: null },
    source: { type: String, required: false, default: '' },
    thirdPartyForms: { type: Array, required: false, default: () => [] }
  },
  data() {
    return {
      form: {
        name: this.table && this.table.name || '',
        unique_column: this.table && this.table.uniqueColumn || '',
        data: {},
        source: ''
      },
      saving: false,
      editing: false
    }
  },

  watch: {
    table: {
      handler(x) {
        this.initForm()
      },
      immediate: true
    },
    source: {
      handler() {
        this.initForm()
      },
      immediate: true
    }
  },

  methods: {
    /**
       * Save data
       */
    saveData() {
      this.saving = true
      if (this.table) {
        this.editTable()
      } else {
        this.createTable()
      }
    },

    /**
       * create table
       **/
    createTable() {
      this.$store.dispatch(`tables/${tableActions.CREATE_TABLE}`, this.form).then(table => {
        this.$emit(EVENT_CLOSE)
        this.$notify({
          title: 'Success',
          message: this.$t('notifications.successCreate', { table: table.name }),
          type: 'success'
        })
      }).finally(() => {
        this.saving = false
      })
    },

    /**
       * edit table
       */
    editTable() {
      this.$store.dispatch(
        `tables/${tableActions.EDIT_TABLE}`, {
          changes: {
            name: this.form.name,
            unique_column: this.form.unique_column
          },
          uuid: this.table.table_uuid
        }).then(table => {
        this.$emit(EVENT_CLOSE)
        this.$notify({
          title: 'Success',
          message: this.$t('notifications.successEdit', { table: table.name }),
          type: 'success'
        })
      }).finally(() => {
        this.saving = false
      })
    },

    setFile(file, fileList) {
      console.log(file)
      if (!this.form.name) {
        this.form.name = file.name.split('.').slice(0, -1).join('.')
      }
      toBase64(file.raw).then(base64File => {
        this.form.data.value = base64File.split(';base64,')[1]
      })
    },

    initForm() {
      this.form = {
        name: this.table && this.table.name || '',
        unique_column: this.table && this.table.uniqueColumn || '',
        data: {},
        source: this.table && this.table.source || this.source
      }
    },

    thirdPartyFormSelected(event) {
      this.form.data = {
        url: event
      }
      if (!this.form.name) {
        const form = this.thirdPartyForms.find(item => item.url === event)
        this.form.name = form.title
      }
      console.log('event:::', event)
    }
  }
}
</script>

<style lang="scss" scoped>
  .import-csv-form {
    &__upload-area {
      width: 100%;
    }

    &__fields {
      display: flex;
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

    &__help-text {
      font-size: 14px;
      color: #25CED1;
    }
  }

  .fullWidth {
    width: 100%;
  }
</style>

<style lang="scss">
  .import-csv-form {
    .el-upload {
      width: 100%;
    }

    .el-upload-dragger {
      width: 100%;
    }

  }
</style>
