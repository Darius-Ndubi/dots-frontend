<template>
  <h-drawer
    :title="addWorkspaceTitle"
    :visible.sync="show"
    size="48%"
    :show-close="false"
    :wrapper-closable="false"
    direction="ltr"
    :modal="false"
    class="create-workspace-drawer"
    @closed="clearFields"
    @opened="slug = createSlug(8)"
  >
    <h-form
      ref="workspaceForm"
      v-loading="creatingWorkspace"
      class="create-workspace-form"
      label-position="left"
      label-width="160px"
      :rules="rules"
      :model="workspaceForm"
    >
      <el-form-item
        :label="$t('workspace.workspaceName')"
        prop="name"
      >
        <h-input
          v-model="workspaceForm.name"
          :placeholder="$t('workspace.myWorkspace')"
        />
        <span
          v-if="workspaceForm.name"
          class="info url-hint"
        >{{ $t('workspace.urlHint', { name: slug }) }}</span>
      </el-form-item>
      <el-form-item
        :label="$t('workspace.workspaceEmail')"
        prop="email"
      >
        <h-input
          v-model="workspaceForm.email"
          placeholder="Organization email"
        />
      </el-form-item>
      <el-form-item label="Description">
        <h-input
          v-model="workspaceForm.description"
          type="textarea"
          rows="4"
        />
      </el-form-item>
      <h-input
        v-model="workspaceForm.website"
        :label="$t('workspace.website')"
      />
      <h-input
        v-model="workspaceForm.location"
        :label="$t('workspace.location')"
      />
      <div class="buttons">
        <h-button
          dark-text
          @click="show = !show"
        >
          {{ $t('actionVerbs.cancel') }}
        </h-button>
        <h-button
          type="primary"
          @click="createWorkspace"
        >
          {{ $t('actionVerbs.save') }}
        </h-button>
      </div>
    </h-form>
  </h-drawer>
</template>

<script>
import { validEmail } from '@/utils/validate'
import { createWorkspace } from '@/api/workspace'
import { workspaceActions } from '@/store/modules/workspace'

export default {
  name: 'CreateWorkspace',
  props: {
    openDrawer: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      show: false,
      addWorkspaceTitle: this.$t('workspace.addWorkspace'),
      workspaceForm: {
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
  watch: {
    openDrawer(val) {
      this.show = !this.show
    },
    workspaceForm: {
      handler(val) {
        const name = val.name
        let hintName = ''
        const tokens = name.split(' ')
        for (const token of tokens) {
          hintName += (token.charAt(0).toUpperCase() + token.substr(1))
        }
        this.hintName = hintName
      },
      deep: true
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
    createWorkspace() {
      this.$refs['workspaceForm'].$children[0].validate(async(isValid) => {
        if (isValid) {
          try {
            this.creatingWorkspace = true
            const payload = Object.assign({}, this.workspaceForm, { slug: this.slug })
            await createWorkspace(payload)
            await this.$store.dispatch(`workspace/${workspaceActions.GET_WORKSPACES}`)
            this.$message.success(this.$t('workspace.workspaceCreated'))
            this.show = !this.show
            if (this.$route.name !== 'Dashboard') {
              await this.$router.push({ path: '/ws/redirect' })
            }
          } catch (e) {
            console.error(e)
            this.$message.error(this.$t('workspace.workspaceFailure'))
          } finally {
            this.creatingWorkspace = false
          }
        } else {
          return false
        }
      })
    },
    clearFields() {
      this.$refs['workspaceForm'].$children[0].resetFields()
    },
    createSlug(length) {
      let result = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    }
  }
}
</script>

<style scoped lang="scss">
  .create-workspace-drawer {
    .create-workspace-form {
      .buttons {
        margin-top: 60px;
        display: flex;
        justify-content: flex-end;
      }

      .url-hint {
        color: $red;
      }
    }
  }
</style>
