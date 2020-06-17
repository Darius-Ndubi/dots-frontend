<template>
  <el-row type="flex" justify="center">
    <el-col :span="24">
      <h2 class="title">{{ $t('thankYou.title') }}</h2>
      <p class="body-3-reg">{{ $t('thankYou.description') }}</p>
      <h-button type="primary" @click="goToLogin">{{ $t('thankYou.logIn') }} {{ 6 - count }}</h-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ThankYou',
  data: () => {
    return {
      count: 1
    }
  },
  created() {
    const handler = setInterval(() => {
      this.count++
      if (this.count === 5) {
        clearInterval(handler)
        this.goToLogin()
      }
    }, 1000)
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: 'Login' })
    }
  }
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
