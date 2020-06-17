<template>
  <div>
    <h-tab
      tab-position="left"
      active-name="first"
      class="h-tab"
    >
      <el-tab-pane :label="$t('workspace.settings')" disabled />
      <el-tab-pane label="Workspace 1" disabled />
      <el-tab-pane :label="$t('workspace.details')" name="first">
        <workspace-settings />
      </el-tab-pane>
      <el-tab-pane :label="$t('workspace.people')" name="second"><workspace-users /></el-tab-pane>
      <el-tab-pane :label="$t('workspace.configutations')" name="third"><workspace-config /></el-tab-pane>
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

<style lang="scss">
.el-tabs__header.is-left{
  position: absolute;
  left:0;
}
.el-tabs__content{
  margin-left:250px;
}

</style>
