<template>
  <div>
    <el-row type="flex" justify="center" class="spacer">
      <el-col :span="24">
        <h2>{{ $t('workspace.workspaceDetails') }}</h2>
      </el-col>
    </el-row>
    <settings-form :workspace="getDefaultWorkspace" />
    <danger-zone />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import settingsForm from './settingsForm'
import dangerZone from './dangerZone'

export default {
  name: 'WorkspaceDetails',
  components: {
    settingsForm,
    dangerZone
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['name', 'username']),
    ...mapGetters('workspace', ['getDefaultWorkspace', 'getOtherWorkspaces'])
  }
}
</script>
<style >
</style>
