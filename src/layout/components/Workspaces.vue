<template>
  <h-drawer
    :visible.sync="show"
    direction="rtl"
    size="50%"
    :show-close="false"
    :with-header="false"
    :modal="false"
  >
    <div class="drawer">
      <div class="header">
        <div class="avatar-wrapper">
          <el-avatar shape="square">{{ nameInitials }}</el-avatar>
        </div>
        <span class="username body-bold">
          {{ $t('main.profile', { username: username }) }}
        </span>
        <span class="logout body-reg" @click="logout"><svg-icon icon-name="logout" /> {{ $t('navbar.logout') }}</span>
      </div>
      <div class="workspaces">
        <h-card class="default">
          <div slot="items">
            <span class="heading">{{ getDefaultWorkspace.name }}</span>
            <br>
            <span class="body-2-reg">{{ getDefaultWorkspace.role }}</span>
          </div>
        </h-card>
        <el-row class="other-workspaces" :gutter="40">
          <el-col
            v-for="ws in getOtherWorkspaces"
            :key="ws.id"
            :sm="12"
            :xs="12"
            :md="8"
          >
            <h-card>
              <div slot="items">
                <span class="body-bold">{{ ws.name }}</span>
                <br>
                <span>{{ ws.role }}</span>
              </div>
            </h-card>
          </el-col>
        </el-row>
      </div>
      <div class="footer">
        <h-button icon="el-icon-circle-plus-outline" @click="createWorkspace">{{ $t('main.addWorkspace') }}</h-button>
        <h-button icon="el-icon-s-tools" @click="goToWorkspaceSettings">{{ $t('main.workspaceSettings') }}</h-button>
      </div>
    </div>
  </h-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus, TOGGLE_WORKSPACE_DRAWER } from '@/utils/bus'

export default {
  name: 'Workspaces',
  props: {
    openDrawer: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters(['name', 'username']),
    ...mapGetters('workspace', ['getDefaultWorkspace', 'getOtherWorkspaces']),
    nameInitials: function() {
      let initials = ''
      const names = this.name.split(' ')
      for (const name of names) {
        initials += name.charAt(0).toUpperCase()
      }
      return initials
    }
  },
  watch: {
    openDrawer(val) {
      this.show = !this.show
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      await this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    createWorkspace() {
      EventBus.$emit(TOGGLE_WORKSPACE_DRAWER)
    },
    goToWorkspaceSettings() {
      this.$router.push({ name: 'WorkspaceSettings' })
      this.show = false
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

    .header {
      display: flex;
      align-items: center;

      .avatar-wrapper {
        display: inline-block;
        height: 20px;
        margin-right: 10px;

        .el-avatar {
          height: 20px;
          width: 20px;
          font-size: 8px;
          line-height: 20px;
        }

      }

      .logout {
        margin-left: auto;
        cursor: pointer;
        text-align: center;
      }
    }

    .workspaces {
      flex: 0 1 600px;
      overflow-y: auto;
      overflow-x: hidden;
      padding-left: 50px;
      padding-right: 50px;
      margin-top: 80px;
      margin-bottom: 50px;

      .default {
        width: 100%;
        height: 240px;
        margin-bottom: 80px;
      }

      .other-workspaces {
        .el-col {
          & > * {
            width: 100%;
            height: 100%;
            min-height: 130px;
            margin-bottom: 40px;
          }
        }
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
