<script setup lang="ts">
  import { watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
    const handleOpen = () => {
      console.log('open')
    }
    const handleClose = () => {
      console.log('close')
    }
  const router = useRoute()
  const activemenu = router.path
  console.log(activemenu)
</script>

<template>
  <div class="nav">
    <el-menu
      :router="true"
      :default-active="activemenu"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff" 
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-document"></i>
        <span>基本信息</span>
      </el-menu-item>
      <el-sub-menu index="/manage">
        <template #title>
          <i class="el-icon-menu"></i>
          <span>页面管理</span>
        </template>
          <el-menu-item index="1-1">导航</el-menu-item>
          <el-menu-item index="/manage/tag">标签</el-menu-item>
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
      <el-menu-item index="/user">
        <i class="el-icon-s-custom"></i>
        <span>用户管理</span>
      </el-menu-item>
    </el-menu>

      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<style scoped lang="scss">
</style>
