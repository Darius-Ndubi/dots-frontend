<template>
  <div>
    <el-row type="flex" justify="center" class="spacer">
      <el-col :span="12">
        <h2>Workspace Users</h2>
      </el-col>
      <el-col :span="6">
        <h-search placeholder="Search user name or email" clearable />
      </el-col>
      <el-col :span="3" class="text-center">
        <h-filter class="no-shadow" />
      </el-col>
      <el-col :span="3" class="text-center">
        <h-button type="primary" icon="el-icon-plus">Add new user</h-button>
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
