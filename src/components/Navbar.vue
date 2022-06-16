<template>
  <el-menu :router="true" :default-active="activemenu" active-text-color="#ffd04b" background-color="#545c64"
    text-color="#fff">
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="/manage">
      <template #title>
        <i class="el-icon-menu"></i>
        <span>侧栏管理</span>
      </template>
      <el-menu-item index="/sider/tag">标签</el-menu-item>
      <el-menu-item index="/sider/link">链接</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <i class="el-icon-s-management"></i>
        <span>文章管理</span>
      </template>
      <el-menu-item index="/article/classify">列表</el-menu-item>
      <el-menu-item index="/article/edit">新增</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/user">
      <i class="el-icon-s-custom"></i>
      <span>用户管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const activemenu = useRoute().path
</script>

<style scoped lang="scss">
.el-menu {
  border: 1px #545c64 solid;
}
</style>
