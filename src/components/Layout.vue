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
  background-color: #2d3a4b;
  // color: var(--el-text-color-primary);
  // text-align: center;
  height: 80px;
}

.el-aside {
  background-color: #545c64;
  // color: var(--el-text-color-primary);
  height: calc(100vh - 80px);
  // line-height: 200px;
}

// .el-main {
//   background-color: #e9eef3;
//   color: var(--el-text-color-primary);
// }

// .layout {
//   position: absolute;
//   display: flex;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   .el-container {
//     background-color: #f10aac;
//   }
// }
</style>
