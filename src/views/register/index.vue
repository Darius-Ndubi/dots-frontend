<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      class="register-form"
      :model="formData"
      :rules="rules"
      label-width="100px"
      label-position="top"
    >
      <div class="header">
        <h2>{{ $t('register.createAccount') }}</h2>
      </div>
      <div class="form-group">
        <el-form-item prop="first_name" :label="$t('register.firstName')">
          <el-input v-model="formData.first_name" />
        </el-form-item>
        <el-form-item prop="last_name" :label="$t('register.lastName')">
          <el-input v-model="formData.last_name" />
        </el-form-item>
      </div>
      <div class="form-group">
        <el-form-item prop="username" :label="$t('register.username')">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item prop="email" :label="$t('register.email')">
          <el-input v-model="formData.email" />
        </el-form-item>
      </div>
      <div class="form-group">
        <el-form-item prop="password" :label="$t('register.password')">
          <el-input v-model="formData.password" show-password />
        </el-form-item>
        <el-form-item class="confirm-password" prop="confirm_password" :label="$t('register.confirmPassword')">
          <el-input v-model="formData.confirm_password" show-password />
        </el-form-item>
      </div>
      <div class="footer">
        <span class="login-container">{{ $t('register.haveAccount') }}<br><router-link class="login" :to="{name: 'Login'}">{{ $t('login.login') }}</router-link></span>
        <h-button :loading="loading" type="primary" @click="register()">{{ $t('register.register') }}</h-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/user'
import { validEmail } from '@/utils/validate'

export default {
  name: 'Register',
  data() {
    return {
      formData: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      rules: {
        first_name: [
          { required: true, message: this.$t('general.requiredField'), trigger: 'blur' }
        ],
        last_name: [
          { required: true, message: this.$t('general.requiredField'), trigger: 'blur' }
        ],
        username: [
          { required: true, message: this.$t('general.requiredField'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('general.requiredField'), trigger: 'blur' },
          { validator: this.isValidEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('general.requiredField'), trigger: 'blur' },
          { min: 8, message: this.$t('register.minimumCharacters'), trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, message: this.$t('general.requiredField'), trigger: 'blur' },
          { validator: this.passwordsMatch, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    passwordsMatch(rule, value, callback) {
      if (value !== this.formData.password) {
        callback(new Error(this.$t('register.passwordMismatch')))
      } else {
        callback()
      }
    },
    isValidEmail(rule, value, callback) {
      if (!validEmail(value)) {
        callback(new Error(this.$t('register.invalidEmail')))
      } else {
        callback()
      }
    },
    register() {
      this.$refs.registerForm.validate(async isValid => {
        if (isValid) {
          this.loading = true
          try {
            await register(this.formData)
            await this.$router.push({ name: 'ThankYou' })
          } catch (e) {
            console.error(e)
            this.$message.error(String(e))
          } finally {
            this.loading = false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .register-container {
    vertical-align: middle;
    min-height: 100%;
    width: 100%;

    .register-form {
      position: relative;
      width: 600px;
      max-width: 100%;
      padding: 160px 35px 35px 0;
      margin: 0 auto;
      overflow: hidden;

      .form-group {
        display: inline-flex;
      }
    }

    .el-input {
      height: 47px;

      input {
        height: 47px;
      }
    }

    .header {
      margin-bottom: 40px;
      color: $primary-color;
      text-align: center;
      font-size: 20px;
    }

    .el-form-item {
      border-radius: 5px;
      color: $dark-body-grey;
      margin-bottom: 30px;
      padding: 0px 100px 0px 0px;
      width: 250px;
    }

    .confirm-password {
      .el-form-item__label {
        line-height: 1.5 !important;
      }
    }

    .footer {
      .el-button {
        float: right;
        min-width: 30%;
        font-size: 1.2rem;
        display: flex;
        justify-content: center;
      }

      .login-container {
        float: left;
        line-height: 20px;

        .login {
          float: left;
          color: $primary-color;
        }
      }
    }
  }
</style>
