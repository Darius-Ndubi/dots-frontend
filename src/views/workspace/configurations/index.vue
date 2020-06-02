<template>
  <div>
    <el-row type="flex" justify class="spacer">
      <el-col :span="16">
        <h2>{{ $t('workspace.configutations') }}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fugiat aut molestias explicabo pariatur, tempora, minus odit quos quod voluptatibus modi at. Reiciendis voluptate illo assumenda cupiditate, officia rem voluptatibus.</p>
      </el-col>
    </el-row>
    <el-row class="spacer" :gutter="30">
      <config-card />
      <config-card />
    </el-row>
  </div>
</template>

<script>
import ConfigCard from './configCard'
export default {
  name: 'WorkspaceConfigurations',
  components: {
    ConfigCard
  }
}
</script>
