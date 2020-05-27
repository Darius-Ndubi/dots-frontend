<template>
  <el-row type="flex" justify="center" class="spacer">
    <el-col :span="24">
      <h-card class="card-danger">
        <div slot="items">
          <el-row class="mb-20">
            <el-col
              :span="18"
            >Renaming the workspace will cause changes to your WorkspaceDetails URL</el-col>
            <el-col :span="6" class="text-right">
              <h-button size="medium" type="danger">Rename workspace</h-button>
            </el-col>
          </el-row>
          <el-row class="mb-20">
            <el-col
              :span="18"
            >Once you leave your workspace you will no longer have access to this Workspace. However any other Workspace you are in will not be affected.</el-col>
            <el-col :span="6" class="text-right">
              <h-button size="medium" type="danger">Leave workspace</h-button>
            </el-col>
          </el-row>
          <el-row class="mb-20">
            <el-col
              :span="18"
            >Once you transfer your ownership, your role will be changed to Admin by default.</el-col>
            <el-col :span="6" class="text-right">
              <h-button size="medium" type="danger">Transfer ownership</h-button>
            </el-col>
          </el-row>
        </div>
      </h-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'DangerZone'
}
</script>
<style>
.card-danger {
  border-color: red !important;
}

.mb-20 {
  margin-bottom: 20px;
}

.text-right {
  text-align: right;
}
</style>
