<template>
  <el-row type="flex" justify="center">
    <el-col v-loading="loading" :span="12">
      <h2 class="title">{{ $t('resetPassword.title') }}</h2>
      <el-form
        ref="resetForm"
        class="reset-form"
        :model="formData"
        :rules="rules"
        label-width="100px"
        label-position="top"
      >
        <div class="form-group">
          <el-form-item prop="new_password" :label="$t('register.password')">
            <el-input
              v-model="formData.new_password"
              show-password
              :class="{ 'dark-bg': formData.new_password }"
            />
          </el-form-item>
          <el-form-item class="confirm-password" prop="confirm_new_password" :label="$t('register.confirmPassword')">
            <el-input
              v-model="formData.confirm_new_password"
              show-password
              :class="{ 'dark-bg': formData.confirm_new_password }"
            />
          </el-form-item>
        </div>
      </el-form>
      <div class="footer">
        <h-button :loading="loading" type="primary" @click="resetPassword">{{ $t('resetPassword.setPassword') }}</h-button>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { resetPassword } from '@/api/user'

export default {
  name: 'ConfirmResetPassword',
  props: {
    token: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      formData: {
        new_password: '',
        confirm_new_password: ''
      },
      rules: {
        new_password: [
          { required: true, message: this.$t('general.requiredField'), trigger: 'blur' },
          { min: 8, message: this.$t('register.minimumCharacters'), trigger: 'blur' }
        ],
        confirm_new_password: [
          { required: true, message: this.$t('general.requiredField'), trigger: 'blur' },
          { validator: this.passwordsMatch, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    passwordsMatch(rule, value, callback) {
      if (value !== this.formData.new_password) {
        callback(new Error(this.$t('register.passwordMismatch')))
      } else {
        callback()
      }
    },
    resetPassword() {
      this.$refs.resetForm.validate(async isValid => {
        if (isValid) {
          const payload = Object.assign({}, this.formData, { token: this.token })
          try {
            this.loading = true
            await resetPassword(payload)
            this.$message.success(this.$t('resetPassword.success'))
            await this.$router.push({ name: 'Login' })
          } catch (e) {
            console.error(e)
            this.$message.error(this.$t('resetPassword.invalidToken'))
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

    .reset-form {
      .form-group {
        display: inline-flex;
        justify-content: space-between;

        .el-form-item {
          margin: 10px;
        }
      }
    }

    .footer {
      padding: 25px 0 0 0;
      .el-button {
        float: right;
        min-width: 30%;
        font-size: 1.2rem;
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
