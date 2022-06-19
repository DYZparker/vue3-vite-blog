<template>
  <el-row>
    <el-col :span="20">
      <h2>云中博客后台管理系统</h2>
    </el-col>
    <el-col :span="4" class="btnbox">
      <span>{{ user.nickname }}</span>
      <el-button class="out-btn" type="danger" @click="handlelogout">退出</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router'
import { getUser } from '../utils/auth'
import Crypto from '../utils/crypto'

const router = useRouter()
const myCrypto = new Crypto()
const user = computed(() => myCrypto.decryptCBC(getUser()))
const handlelogout = () => {
  ElMessageBox.confirm('确定要退出吗？')
    .then(() => {
      router.replace('/login')
    })
    .catch(() => {}
  )
}
</script>


<style scoped lang="scss">
h2 {
  text-align: center;
  color: #fff;
  font-size: 30px;
  height: 80px;
  line-height: 80px;
}

.btnbox {
  display: flex;
  span {
    flex-grow: 1;
    margin: auto;
    color: #fff;
    font-size: 20px;
    text-align: right;
    margin-right: 20px;
  }

  .out-btn {
    width: 80px;
    margin: auto;
  }
}
</style>
