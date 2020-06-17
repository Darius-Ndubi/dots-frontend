<template>
  <div>
    <h-breadcrumb :items="path" class="spacer" />
    <el-row type="flex" class="spacer">
      <el-col :span="14">
        <h-card class="h-plain-card">
          <div slot="items">
            <h-form
              ref="userLanguageForm"
              label-position="left"
              label-width="160px"
              :model="userLanguageForm"
            >
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('profile.language.form.selectLanguage')" prop="prefered_language">
                    <h-select
                      v-model="userLanguageForm.prefered_language"
                      :options="languageOptions"
                      :placeholder="$t('profile.language.form.selectLanguage')"
                    />
                  </el-form-item>
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
  name: 'LanguageSettings',
  data() {
    return {
      loading: false,
      path: [
        {
          label: this.$t('profile.language.title')
        }
      ],
      userLanguageForm: {
        prefered_language: ''
      },
      languageOptions: [
      ]
    }
  },
  created() {
    this.$i18n.availableLocales.forEach(language => {
      this.languageOptions.push({
        label: language,
        value: language
      })
    })
  }
}
</script>
