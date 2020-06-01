<template>
  <el-row type="flex" justify="center">
    <el-col :span="24">
      <h2 class="title">{{ $t('error.403.title') }}</h2>
      <p class="body-2-reg">{{ $t('error.403.description') }}</p>
      <router-link :to="{ name: 'Dashboard'}">
        <h-button type="primary">{{ $t('error.403.action') }} </h-button>
      </router-link>

    </el-col>
  </el-row>
</template>

<script>
export default {
  name: '403'
}
</script>

<style scoped lang="scss">
  .el-row {
    padding-top: 20%;

    .el-col {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h2 {
      color: $primary-color;
      text-align: center;
    }

    p {
      color: $dark-body-grey;
    }
  }
</style>
