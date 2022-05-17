<template>
  <el-menu :router="true" :default-active="activemenu" active-text-color="#ffd04b" background-color="#545c64"
    text-color="#fff">
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
      <el-menu-item index="/tag">标签</el-menu-item>
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
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const activemenu = route.path
    return {
      activemenu
    }
  }
})

</script>

<style scoped lang="scss">
.el-menu {
  border: 1px #545c64 solid;
}
</style>
