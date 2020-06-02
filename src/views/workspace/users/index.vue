<template>
  <div>
    <el-row type="flex" justify="center" class="spacer">
      <el-col :span="12">
        <h2>{{ $t('workspace.workspaceUsers') }}</h2>
      </el-col>
      <el-col :span="6">
        <h-search :placeholder="$t('workspace.action.search')" clearable />
      </el-col>
      <el-col :span="3" class="text-center">
        <h-filter />
      </el-col>
      <el-col :span="3" class="text-center">
        <h-button type="primary" icon="el-icon-plus">{{ $t('workspace.action.addNewUser') }}</h-button>
      </el-col>
    </el-row>
    <el-row class="spacer">
      <el-col :span="24">
        <user-table />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import UserTable from './user-table'

export default {
  name: 'WorkspaceUsers',
  components: {
    UserTable
  }
}
</script>
<style scoped>
.text-center {
  text-align: center;
}
</style>
