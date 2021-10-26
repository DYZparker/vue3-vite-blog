<script setup lang="ts">
import { defineComponent } from 'vue'
  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
  }
  const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
  }
</script>

<template>
  <div class="nav">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="3">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-document"></i>
        <span>基本信息</span>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <i class="el-icon-menu"></i>
          <span>页面管理</span>
        </template>
          <el-menu-item index="1-1">导航</el-menu-item>
          <el-menu-item index="1-2">标签</el-menu-item>
          <el-menu-item index="1-3">链接</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <i class="el-icon-s-management"></i>
          <span>文章管理</span>
        </template>
          <el-menu-item index="1-1">分类</el-menu-item>
          <el-menu-item index="1-2">编辑</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="5">
        <i class="el-icon-s-custom"></i>
        <span>用户管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
</style>
