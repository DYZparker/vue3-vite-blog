<script setup lang="ts">
import Navbar from './Navbar.vue';
import Header from './Header.vue';

</script>

<template>
  <el-container>
    <el-header><Header /></el-header>
    <el-container>
      <el-aside width="200px"><Navbar /></el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.el-header {
  height: 80px;
  background-color: #2d3a4b;
}

.el-aside {
  height: calc(100vh - 80px);
  background-color: #545c64;
}

.el-main {
  display: flex;
  flex-flow: column nowrap;
  height: calc(100vh - 80px);
}
</style>
