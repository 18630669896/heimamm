<template>
  <div class="dashboard-container">
    <div class="app-container">
      面试技巧
    <el-button @click="$router.push({name:'articles-add'})">新增技巧</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticlesList',
  data() {
    return {}
  }
}
</script>

<style scoped>
</style>
