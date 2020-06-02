<template>
  <el-table :data="users" style="width: 100%">
    <el-table-column prop="full_name" label="Name" />
    <el-table-column prop="email" label="Email" />
    <el-table-column prop="lastLogin" label="Last login">
      <template slot-scope="scope">{{ $moment(scope.row.lastLogin).fromNow() }}</template>
    </el-table-column>
    <el-table-column prop="role" label="Role" filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.role === 'Member' ? 'primary' : 'success'"
          disable-transitions
        >{{ scope.row.role }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="isActive" label="Status" />
    <el-table-column fixed="right" label>
      <template>
        <h-dropdown>
          <div slot="title">
            <i class="el-icon-more-outline el-dropdown-link" />
          </div>
          <template slot="items">
            <el-dropdown-item>{{ $t('workspace.users.action.resendInvitation') }}</el-dropdown-item>
            <el-dropdown-item>{{ $t('workspace.users.action.revokeInvitation') }}</el-dropdown-item>
            <el-dropdown-item class="danger">{{ $t('workspace.users.action.deactivateUser') }}</el-dropdown-item>
          </template>
        </h-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters } from 'vuex'
import { getWorkspaceUsers } from '@/api/workspace'

export default {
  name: 'UserTable',
  data() {
    return {
      users: []
    }
  },
  computed: {
    ...mapGetters('workspace', ['getDefaultWorkspace', 'getOtherWorkspaces'])
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      this.users = await getWorkspaceUsers(this.getDefaultWorkspace.id)
    }
  }
}
</script>
