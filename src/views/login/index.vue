<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      v-loading="loading"
      class="login-form"
      :model="formData"
      :rules="rules"
    >
      <div class="header">
        <span class="heading">{{ $t('login.header') }}</span>
      </div>
      <el-form-item
        prop="username"
        :class="{ 'dark-bg': formData.username }"
      >
        <span class="svg-container">
          <svg-icon icon-name="user" />
        </span>
        <el-input
          v-model="formData.username"
          :placeholder="$t('login.username')"
        />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" :content="$t('login.capsLockOn')" placement="right" manual>
        <el-form-item
          prop="password"
          :class="{ 'dark-bg': formData.password }"
        >
          <span class="svg-container">
            <svg-icon icon-name="password" />
          </span>
          <el-input
            ref="password"
            v-model="formData.password"
            :placeholder="$t('login.password')"
            :type="passwordType"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="login"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <div class="forgot-password-container">
        <router-link class="forgot-password body-reg" to="">{{ $t('login.forgotPassword') }}</router-link>
      </div>
      <div class="actions">
        <span>{{ $t('login.noAccount') }}<br><router-link class="register" :to="{name: 'Register'}">{{ $t('register.register') }}</router-link></span>
        <h-button type="primary" @click="login('loginForm')">{{ $t('login.login') }}</h-button>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: this.$t('general.requiredField'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('general.requiredField'), trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password',
      capsTooltip: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    login() {
      this.$refs.loginForm.validate(isValid => {
        if (isValid) {
          this.loading = true
          this.$store.dispatch('user/login', this.formData)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch((e) => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
  $bg: $background-color;
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 12px 5px 12px 5px;
        height: 47px;
        color: $heading-grey;
        caret-color: $primary-color;

        &::placeholder {
          color: $light-body-grey;
          opacity: 1;
        }

        &:-ms-input-placeholder {
          color: $dark-body-grey;
        }

        &::-ms-input-placeholder {
          color: $dark-body-grey;
        }

        &:-webkit-autofill {
          box-shadow: 0 0 0 1000px $heading-grey inset !important;
          -webkit-text-fill-color: $primary-color !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(0, 0, 0, 0.2);
      // background: $bg;
      border-radius: 6px;
      box-sizing: border-box;
      // color: $dark-body-grey;
    }
  }
</style>

<style scoped lang="scss">
  $bg: $heading-grey;
  $light_gray:$heading-grey;
  $cursor: #fff;

  .dark-bg {
    background: $background-color;
  }

  .login-container {
    vertical-align: middle;
    min-height: 100%;
    width: 100%;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 360px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .header {
      text-align: center;
      margin-bottom: 40px;
      span {
        color: $primary-color;
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $heading-grey ;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $heading-grey;
      cursor: pointer;
      user-select: none;
    }

    .forgot-password-container {
      height: 20px;
      margin-bottom: 70px;
      .forgot-password {
        float: right;
      }
    }

    .actions {
      height: 80px;
      .el-button {
        float: right;
        min-width: 30%;
        font-size: 1.2rem;
        display: flex;
        justify-content: center;
      }

      span {
        float: left;
        line-height: 20px;

        .register {
          float: left;
          color: $primary-color;
        }
      }
    }
  }
</style>
