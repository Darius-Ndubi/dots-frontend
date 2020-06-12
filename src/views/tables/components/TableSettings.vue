<template>
  <h-drawer
    :visible.sync="show"
    size="40%"
    :show-close="false"
    :with-header="false"
    direction="ltr"
    class="tableSettingsDrawer"
    :modal="false"
  >
    <div class="drawer">
      <div class="topButtons">
        <h-button
          icon="el-icon-download"
          dark-text
          class="headerButton"
        >
          {{ $t('tables.tableSettingsForm.exportTable') }}
        </h-button>
        <h-button
          icon="el-icon-delete"
          type="danger"
          class="headerButton"
        >
          {{ $t('tables.tableSettingsForm.deleteTable') }}
        </h-button>
      </div>
      <h-form
        ref="tableSettingsForm"
        class="tableSettingsForm"
        label-position="left"
        label-width="160px"
        :model="tableSettingsForm"
      >
        <el-form-item :label="$t('tables.tableSettingsForm.tableName')">
          <h-input v-model="tableSettingsForm.name" />
        </el-form-item>
        <el-form-item :label="$t('tables.tableSettingsForm.ownerName')">
          <h-input
            v-model="tableSettingsForm.ownerName"
            :readonly="true"
            disabled
          />
        </el-form-item>
        <el-form-item :label="$t('tables.tableSettingsForm.source')">
          <h-input
            v-model="tableSettingsForm.source"
            :readonly="true"
            disabled
          />
        </el-form-item>
        <div class="actionButtons">
          <h-button
            dark-text
            @click="show = !show"
          >
            {{ $t('actionVerbs.cancel') }}
          </h-button>
          <h-button
            type="primary"
            @click="updateTable"
          >
            {{ $t('actionVerbs.save') }}
          </h-button>
        </div>
      </h-form>
    </div>
  </h-drawer>
</template>

<script>
export default {
  name: 'TableSettings',
  props: {
    openDrawer: {
      type: Boolean,
      default: false
    },

    tableObject: { type: Object, default: null }
  },
  data: function() {
    return {
      show: false,
      tableSettingsForm: {
        name: '',
        ownerName: '',
        source: ''
      }
    }
  },

  computed: {

  },

  watch: {
    openDrawer(val) {
      this.show = !this.show
    },

    tableObject: {
      handler(tableObject) {
        this.setFormValues(tableObject)
      },
      immediate: true
    }
  },

  methods: {
    updateTable() {
      console.log('click')
    },

    setFormValues(tableObject) {
      this.$set(this.tableSettingsForm, 'name', tableObject.name)
      this.$set(this.tableSettingsForm, 'ownerName', tableObject.owner)
      this.$set(this.tableSettingsForm, 'source', tableObject.source)
    }
  }
}
</script>

<style scoped lang="scss">
.drawer {
  height: 100%;
  margin: 50px 30px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
}
.tableSettingsDrawer {
  height: 80%;
  margin-top: 5%;
}
.topButtons {
  display: flex;
  padding-top: 5%;
  margin-left: 5%;

  .headerButton {
    margin-left: 10%;
  }
}
.tableSettingsForm {
  margin-top: 10%;
}
.actionButtons {
  margin-top: 10%;
  display: flex;
  float: right;
}
.el-drawer__body {
  padding: 20px 38px 0px 38px;
}
.el-button.el-button--primary.body-bold.button-style{
  margin-left:20px;
}
</style>
<style lang="scss">
.el-form-item__label {
  color: $dark-body-grey;
}
.h-input .el-input.is-disabled .el-input__inner{
  color:$heading-grey;
}
</style>
