<template>
  <div v-loading="loading">
    <h-breadcrumb :items="path" class="spacer" />
    <el-row type="flex" class="spacer">
      <el-col :span="14">
        <h-card class="h-plain-card">
          <div slot="items">
            <h-form
              ref="userProfileForm"
              label-position="left"
              label-width="160px"
              :rules="rules"
              :model="userProfileForm"
            >
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('profile.index.form.firstName')" prop="first_name">
                    <h-input
                      v-model="userProfileForm.first_name"
                      :placeholder="$t('profile.index.form.firstName')"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('profile.index.form.lastName')" prop="last_name">
                    <h-input
                      v-model="userProfileForm.last_name"
                      :placeholder="$t('profile.index.form.lastName')"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    :label="$t('profile.index.form.title')"
                    prop="title"
                  >
                    <h-input
                      v-model="userProfileForm.title"
                      :placeholder="$t('profile.index.form.title')"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    :label="$t('profile.index.form.username')"
                    prop="username"
                  >
                    <h-input
                      v-model="userProfileForm.username"
                      :placeholder="$t('profile.index.form.username')"
                      disabled
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    :label="$t('profile.index.form.email')"
                    prop="email"
                  >
                    <h-input
                      v-model="userProfileForm.email"
                      :placeholder="$t('profile.index.form.email')"
                      disabled
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="text-right">
                  <h-button size="medium" type="primary" :loading="loading" @click="updateProfile">{{ $t('actionVerbs.save') }}</h-button>
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
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileSettings',
  data() {
    return {
      loading: false,
      path: [
        {
          label: this.$t('profile.index.title')
        }
      ],
      rules: {
        first_name: [
          { required: true, message: this.$t('profile.index.form.validationErrors.firstName'), trigger: 'blur' }
        ],
        last_name: [
          { required: true, message: this.$t('profile.index.form.validationErrors.lastName'), trigger: 'blur' }
        ],
        title: [
          { required: true, message: this.$t('profile.index.form.validationErrors.title'), trigger: 'blur' }
        ],
        username: [
          { required: true, message: this.$t('profile.index.form.validationErrors.username'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('profile.index.form.validationErrors.email'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('user', ['getUserDetails']),
    userProfileForm: {
      get() {
        return this.getUserDetails
      }
    }
  },
  methods: {
    updateProfile() {
      this.$refs['userProfileForm'].$children[0].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/updateProfile', this.userProfileForm)
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
.text-right {
  text-align: right;
}
</style>
