<template>
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <h2 class="title">{{ $t('forgotPassword.title') }}</h2>
      <p class="body-2-reg">{{ $t('forgotPassword.description') }}</p>
      <el-form
        ref="emailForm"
        v-loading="loading"
        :model="formData"
        :rules="rules"
      >
        <el-form-item prop="email">
          <el-input v-model="formData.email" :placeholder="$t('forgotPassword.enterEmail')" />
        </el-form-item>
      </el-form>
      <h-button
        type="primary"
        :disabled="loading"
        @click="submitEmail"
      >{{ $t('forgotPassword.sendPassword') }}{{ emailSent ? ` ${6 - count}` : '' }}
      </h-button>
    </el-col>
  </el-row>
</template>
<script>
import { validEmail } from '@/utils/validate'
import { resetPassword } from '@/api/user'

export default {
  name: 'ForgotPassword',
  data: function() {
    return {
      loading: false,
      emailSent: false,
      count: 0,
      formData: {
        email: ''
      },
      rules: {
        email: [
          { required: true, message: this.$t('general.requiredField'), trigger: 'blur' },
          { validator: this.isValidEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    isValidEmail(rule, value, callback) {
      if (!validEmail(value)) {
        callback(new Error(this.$t('register.invalidEmail')))
      } else {
        callback()
      }
    },
    submitEmail() {
      this.$refs.emailForm.validate(async isValid => {
        if (isValid) {
          try {
            this.loading = true
            await resetPassword(this.formData)
            this.emailSent = true
            this.$message.success(this.$t('forgotPassword.emailSent'))
            this.count = 0
            const handler = setInterval(() => {
              this.count++
              if (this.count === 5) {
                clearInterval(handler)
                this.goToLogin()
              }
            }, 1000)
          } catch (e) {
            console.error(e)
            this.$message.error('Unable to reset password')
          } finally {
            this.loading = false
          }
        } else {
          return false
        }
      })
    },
    goToLogin() {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style scoped lang="scss">
.el-row {
  padding-top: 10%;

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
    text-align: center;
  }

  .el-form {
    width: 100%;
    margin-top: 40px;
    margin-bottom: 20px;

    .h-input {
      width: 100%;
    }
  }

}
</style>
