<template>
  <el-col :span="12">
    <h-card class="spacer h-card">
      <el-row slot="title" class="body-3-bold">
        <h2>Label 1</h2>
      </el-row>
      <el-row slot="items">
        <h-form label-position="top">
          <el-form-item label="Admin Boundary">
            <h-input v-model="form.boundary" placeholder="Admin Boundary" />
          </el-form-item>
          <el-form-item label="Indicators">
            <h-input v-model="form.boundary" placeholder="Indicators" />
          </el-form-item>
        </h-form>
      </el-row>
    </h-card>
  </el-col>
</template>
<script>
export default {
  name: 'ConfigCard',
  data() {
    return {
      form: {
        boundary: ''
      }
    }
  }
}
</script>
