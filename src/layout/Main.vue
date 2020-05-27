<template>
  <el-container direction="vertical">
    <Navbar />
    <el-main>
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
      <create-workspace :open-drawer="showCreateDrawer" />
      <workspaces :open-drawer="showWorkspacesDrawer" />
    </el-main>
  </el-container>
</template>

<script>
import Navbar from './components/Navbar'
import { EventBus, TOGGLE_DRAWER, TOGGLE_WORKSPACE_DRAWER } from '@/utils/bus'
import CreateWorkspace from '@/views/workspace/CreateWorkspace'
import Workspaces from './components/Workspaces'

export default {
  name: 'Main',
  components: {
    Workspaces,
    Navbar,
    CreateWorkspace
  },
  data: function() {
    return {
      showWorkspacesDrawer: false,
      showCreateDrawer: false
    }
  },
  created() {
    EventBus.$on(TOGGLE_DRAWER, () => {
      this.showWorkspacesDrawer = !this.showWorkspacesDrawer
    })
    EventBus.$on(TOGGLE_WORKSPACE_DRAWER, () => {
      this.showCreateDrawer = !this.showCreateDrawer
    })
  }
}
</script>

<style scoped lang="scss">
.spacer {
  margin-right: 30px;
  margin-left: 30px;
}
.drawer {
  .header {
    display: flex;
    margin-top: 45px;
    margin-right: 30px;
    margin-left: 30px;
    align-items: center;
  }
}
</style>
