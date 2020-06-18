<template>
  <top-nav class="navbar top-nav" default-active="1">
    <el-menu-item
      class="brand"
      index="0"
      @click="$router.push({name: 'WorkspaceRedirect'})"
    >
      <img class="logo" src="@/assets/logo.png">
      <h1>Dots</h1>
    </el-menu-item>
    <el-menu-item
      v-for="(item, i) in navItems"
      :key="item.name"
      :disabled="!hasWorkspace"
      :index="`${i+1}`"
      @click="$router.push({name: item.name})"
    >{{ item.label }}</el-menu-item>
    <div class="avatar-wrapper" @click="toggleDrawer">
      <el-avatar>{{ nameInitials }}</el-avatar>
    </div>
  </top-nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus, TOGGLE_DRAWER } from '@/utils/bus'

export default {
  name: 'Navbar',
  data: function() {
    return {
      navItems: [
        {
          name: 'Dashboard',
          label: this.$t('navbar.dashboard')
        },
        {
          name: 'Data',
          label: this.$t('navbar.data')
        },
        {
          name: 'Maps',
          label: this.$t('navbar.maps')
        },
        {
          name: 'Reports',
          label: this.$t('navbar.reports')
        }
      ],
      showDrawer: false
    }
  },
  computed: {
    ...mapGetters(['name', 'hasWorkspace']),
    nameInitials: function() {
      let initials = ''
      const names = this.name.split(' ')
      for (const name of names) {
        initials += name.charAt(0).toUpperCase()
      }
      return initials
    }
  },
  methods: {
    toggleDrawer() {
      EventBus.$emit(TOGGLE_DRAWER)
    }
  }
}
</script>

<style scoped lang="scss">
  .navbar {
    height: 50px;
    max-height: 50px;

    .brand {
      display: inline-flex;
      align-items: center;
      margin: 5px 25px 0px 0px;
      padding: 0px 25px 0px 25px;
      .logo {
        height: 32px;
      }

      h1 {
        margin-left: 20px;
        color: $primary-color;
        font-family: $main-font-family;
        font-weight: bold;
        font-size: 32px;
        line-height: 38px;
      }
      &.el-menu-item.is-active {
        background-color: transparent;
      }
    }

    .avatar-wrapper {
      float: right;
      display: flex;
      cursor: pointer;
      align-items: center;
      padding: 7px 15px 7px 25px;
      margin-left: 25px;
    }

    .el-menu-item.is-active{
      padding: 0px 25px;
      height:50px;
      line-height:50px
    }
      .el-menu-item{
      height:50px;
      line-height:50px
    }
  }
</style>
