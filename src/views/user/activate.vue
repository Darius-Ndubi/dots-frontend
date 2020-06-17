<template>
  <el-row type="flex" justify="center">
    <el-col v-loading="loading" :span="24">
      <el-col v-show="!loading && success">
        <h2 class="title">{{ $t('userActivation.success.title') }}</h2>
        <p class="body-3-reg">{{ $t('userActivation.success.description') }}</p>
        <h-button type="primary" @click="goToLogin">{{ $t('userActivation.success.action') }} </h-button>
      </el-col>
      <el-col v-show="!loading && !success">
        <h2 class="title">{{ $t('userActivation.failed.title') }}</h2>
        <p class="body-3-reg">{{ $t('userActivation.failed.description') }}</p>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'UserActivation',
  props: {
    token: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activation_key: '',
      loading: true,
      success: ''
    }
  },
  created() {
    this.activation_key = this.$route.params.token
    this.$store.dispatch('user/activateUser', this.activation_key)
      .then(() => {
        this.success = true
        this.loading = false
      })
      .catch((e) => {
        this.success = false
        this.loading = false
      })
  },
  updated() {
    this.activation_key = this.$route.params.token
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
