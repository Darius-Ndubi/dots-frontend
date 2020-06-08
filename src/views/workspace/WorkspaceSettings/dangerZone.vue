<template>
  <el-row type="flex" justify="center" class="spacer">
    <el-col :span="24">
      <h-card class="card-danger h-plain-card">
        <div slot="items">
          <el-row class="mb-20">
            <el-col
              :span="18"
            >{{ $t('workspace.rename') }}.</el-col>
            <el-col :span="6" class="text-right">
              <h-button size="medium" type="danger">{{ $t('workspace.action.rename') }}</h-button>
            </el-col>
          </el-row>
          <el-row class="mb-20">
            <el-col
              :span="18"
            >
              {{ $t('workspace.leave') }}.</el-col>
            <el-col :span="6" class="text-right">
              <h-button size="medium" type="danger">{{ $t('workspace.action.leave') }}</h-button>
            </el-col>
          </el-row>
          <el-row class="mb-20">
            <el-col
              :span="18"
            >{{ $t('workspace.transfer') }}.</el-col>
            <el-col :span="6" class="text-right">
              <h-button size="medium" type="danger"> {{ $t('workspace.action.transfer') }} </h-button>
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
