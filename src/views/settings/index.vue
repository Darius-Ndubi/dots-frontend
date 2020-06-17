<template>
  <h-tab
    :active-name="activeTab"
    tab-position="left"
    class="h-tab profile-tab"
  >
    <el-tab-pane disabled>
      <div slot="label" class="avatar-wrapper width-100 text-center pd-30">
        <el-avatar :size="96">{{ nameInitials }}</el-avatar>
        <div>
          {{ name }}
        </div>
      </div>

    </el-tab-pane>
    <el-tab-pane :label="$t('profile.index.title')" name="profile">
      <profile-settings />
    </el-tab-pane>
    <el-tab-pane :label="$t('profile.security.title')" name="security">
      <security-settings />
    </el-tab-pane>
    <el-tab-pane :label="$t('profile.language.title')" name="language">
      <language-settings />
    </el-tab-pane>
  </h-tab>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileSettings from './profile'
import SecuritySettings from './security'
import LanguageSettings from './language'

export default {
  name: 'ProfileIndex',
  components: {
    ProfileSettings,
    SecuritySettings,
    LanguageSettings
  },
  data() {
    return {
      activeTab: 'profile'
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
  }
}
</script>

<style lang="scss">

.el-tabs__header.is-left{
  position: absolute;
  left: 0;
}

.el-tabs__content{
  margin-left: 250px;
}

.width-100 {
  width: 100%;
}

.profile-tab .el-tabs__item {

  .el-avatar {
  border-radius: 50%;
  font-size: 48px;
  margin-bottom: 20px;
  }

  height: auto;

  .text-center {
  text-align: center;
  }

  .pd-30 {
  padding-bottom: 30px;
  }
}

</style>
