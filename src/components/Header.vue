<script setup lang="ts">
import { defineComponent } from 'vue'
const handlelogout = () => {
  console.log()
}
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <!-- <img class="logo" src="../assets/logo.png" alt=""> -->
    </el-col>
    <el-col :span="16">
      <h2>云中博客后台管理系统</h2>
    </el-col>
    <el-col :span="4">
      <el-button class="out-btn" type="danger" @click="handlelogout">退出</el-button>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.logo {
  height: 80px;
}

h2 {
  text-align: center;
  color: #fff;
  font-size: 30px;
  height: 80px;
  line-height: 80px;
}

.out-btn {
  margin: 20px auto;
}
</style>
