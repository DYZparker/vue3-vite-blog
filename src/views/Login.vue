<script setup lang="ts">
import { defineComponent } from 'vue'
  const handlelogin = () => {
    console.log()
  }
</script>

<template>
  <div class="header">
    <span>云中博客后台管理系统</span>
  </div>  
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  span {
    color: #fff;
    font-size: 30px;
    margin-left: 230px;
  }
  .log-button {
    font-size: 15px;
    margin: 5px 100px;
  }
}
</style>
