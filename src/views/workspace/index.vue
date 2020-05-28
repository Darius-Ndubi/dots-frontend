<template>
  <div>
    <h-tab tab-position="left" active-name="first" class="h-tab">
      <el-tab-pane label="Workspace Settings" disabled />
      <el-tab-pane label="Workspace 1" disabled />
      <el-tab-pane label="Details" name="first">
        <workspace-settings />
      </el-tab-pane>
      <el-tab-pane label="People" name="second"><workspace-users /></el-tab-pane>
      <el-tab-pane label="Configurations" name="third"><workspace-config /></el-tab-pane>
    </h-tab>
  </div>
</template>

<script>
import WorkspaceSettings from './WorkspaceSettings/index'
import WorkspaceUsers from './users/index'
import WorkspaceConfig from './configurations/index'
export default {
  name: 'WorkspaceIndex',
  components: {
    WorkspaceSettings,
    WorkspaceUsers,
    WorkspaceConfig
  }
}
</script>
