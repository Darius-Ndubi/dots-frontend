<template>
  <div v-loading="loading">
    <h-breadcrumb :items="path" class="spacer" />
    <el-row type="flex" class="spacer">
      <el-col :span="14">
        <h-card class="h-plain-card">
          <div slot="items">
            <h-form
              ref="passwordResetForm"
              label-position="left"
              label-width="160px"
              :rules="rules"
              :model="passwordResetForm"
            >
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    :label="$t('profile.security.form.labels.currentPassword')"
                    prop="current_password"
                  >
                    <h-input
                      v-model="passwordResetForm.current_password"
                      :placeholder="$t('profile.security.form.labels.currentPassword')"
                      show-password
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('profile.security.form.labels.newPassword')" prop="new_password">
                    <h-input
                      v-model="passwordResetForm.new_password"
                      :placeholder="$t('profile.security.form.labels.newPassword')"
                      show-password
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    :label="$t('profile.security.form.labels.confirmNewPassword')"
                    prop="confirm_new_password"
                  >
                    <h-input
                      v-model="passwordResetForm.confirm_new_password"
                      :placeholder="$t('profile.security.form.labels.confirmNewPassword')"
                      show-password
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="text-right">
                  <h-button
                    size="medium"
                    type="primary"
                    :loading="loading"
                    @click="updateProfile('passwordResetForm')"
                  >{{ $t('actionVerbs.save') }}</h-button>
                </el-col>
              </el-row>
            </h-form>
          </div>
        </h-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'SecuritySettings',
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.passwordResetForm.new_password) {
        callback(new Error(this.$t('profile.security.form.validationErrors.passwordMismatch')))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      passwordResetForm: {
        current_password: '',
        confirm_new_password: '',
        new_password: ''
      },
      path: [
        {
          label: this.$t('profile.security.title')
        }
      ],
      rules: {
        current_password: [
          { required: true, message: this.$t('profile.security.form.validationErrors.currentPassword'), trigger: 'blur' }
        ],
        confirm_new_password: [
          { required: true, message: this.$t('profile.security.form.validationErrors.confirmNewPassword'), trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        new_password: [
          { required: true, message: this.$t('profile.security.form.validationErrors.newPassword'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: { },
  methods: {
    updateProfile(form) {
      this.$refs[form].$children[0].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/updatePassword', this.passwordResetForm)
            .then(() => {
              this.$refs[form].$children[0].resetFields()
              this.$notify({
                title: 'Success',
                message: 'Your password has been updated successfully',
                type: 'success'
              })
            })
            .catch((e) => {
              this.$notify({
                title: 'Error',
                message: e.response.data.current_password[0],
                type: 'error'
              })
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
<style>
</style>
