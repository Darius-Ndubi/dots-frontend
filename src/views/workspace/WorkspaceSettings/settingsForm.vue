<template>
  <div>
    <el-row type="flex" justify="center" class="spacer">
      <el-col :span="24">
        <h-card>
          <div slot="items">
            <h-form
              ref="workspaceDetailsForm"
              label-position="left"
              label-width="160px"
              :rules="rules"
              :model="workspaceDetailsForm"
            >
              <el-row>
                <el-col :span="18">
                  <el-form-item :label="$t('workspace.workspaceName')" prop="name">
                    <h-input
                      v-model="workspaceDetailsForm.name"
                      :placeholder="$t('workspace.myWorkspace')"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item :label="$t('workspace.workspaceEmail')" prop="email">
                    <h-input
                      v-model="workspaceDetailsForm.email"
                      placeholder="info@my-workspace.com"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="Description">
                    <input-text-area v-model="workspaceDetailsForm.description" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item :label="$t('workspace.website')">
                    <h-label-input v-model="workspaceDetailsForm.website" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item :label="$t('workspace.location')">
                    <h-label-input v-model="workspaceDetailsForm.location" />
                  </el-form-item>
                </el-col>
                <el-col :span="6" class="text-right">
                  <h-button size="medium" type="primary" class="body-bold button-style" @click="updateWorkspace">{{ $t('actionVerbs.save') }}</h-button>
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
  name: 'WorkspaceDetails',
  props: {
    workspace: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          description: '',
          website: '',
          location: '',
          slug: ''
        }
      }
    }
  },
  data: function() {
    return {
      show: false,
      addWorkspaceTitle: this.$t('workspace.addWorkspace'),
      workspaceDetailsForm: {
        name: '',
        email: '',
        description: '',
        website: '',
        location: '',
        slug: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t('general.requiredField'),
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: this.$t('general.requiredField'),
            trigger: 'blur'
          },
          {
            validator: this.isValidEmail,
            trigger: 'blur'
          }
        ]
      },
      hintName: '',
      creatingWorkspace: false
    }
  },
  created() {
    this.workspaceDetailsForm = this.workspace
  },
  methods: {
    updateWorkspace() {
      console.log('clicked')
    }
  }
}
</script>
