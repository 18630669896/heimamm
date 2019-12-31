<template>
  <div class="dashboard-container">
    <div class="app-container">题库-精选</div>
    <el-card></el-card>
  </div>
</template>

<script>
export default {
  name: 'QuestionsChoice',
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
// 1. 如果在此处 scoped 当前组件下生效样式
// 2. 在style中的所有选择器 编译的时候会自动带上属性选择器
// 3. .box{} ===> .box[data-v-2c9827a4]{} 交集选择器
// 4. 在当前组件下暴露的标签都会加上 data-v-2c9827a4 属性
// 5. 但是如果是组件，其他组件内部的标签是不会加上这个属性 意味写组件内部的样式是不会生效的
// 6. 其他组件的样式都不会生效
</style>
