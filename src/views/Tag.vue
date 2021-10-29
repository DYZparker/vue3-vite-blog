<script setup lang="ts">
import { ref } from 'vue'
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const value = ref(new Date())
</script>

<template>
  <div class="card">
    <el-avatar :size="50" :src="circleUrl"></el-avatar>
    <span>你好，</span>
  </div>
</template>

<style scoped lang="scss">
.el-card {
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.card {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.row-right {
  padding-left: 20px;
  height: 100px;
}
</style>
