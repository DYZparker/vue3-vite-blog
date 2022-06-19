<template>
  <div class="card">
    <span>{{user.nickname}} 你好，你是{{user.isAdmin ? '管理员，可以进行操作！' : '普通用户，仅有浏览权限！'}}</span>
  </div>
  <el-row>
    <el-col :span="16">
      <!-- <el-card>
        <template #header>
          <span>文章分类</span>
        </template>
        <div class="btnbox">
          <el-button 
            class="btn" 
            v-for="item in tagList.reverse()" 
            :key="item._id"
            @click="handleClick"
            type="primary" 
            size="medium" 
            plain
          >{{item.tagName}}</el-button>
        </div>
      </el-card> -->
      <el-card>
        <template #header>
          <span>最新文章</span>
        </template>
        <el-table :data="articleList" style="width: 100%" :show-header="false">
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="tags" label="标签" width="260" />
          <el-table-column label="日期" width="100">
            <template #default="scope">
              {{initDate(scope.row)}}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="8" class="row-right">
      <el-calendar v-model="value" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '../store'
import { initDate } from '../utils/common'
import { getUser } from '../utils/auth'
import Crypto from '../utils/crypto'

const store = useStore()
const myCrypto = new Crypto()
const user = computed(() => myCrypto.decryptCBC(getUser()))
const { articleAbout } = store.state
const value = ref(new Date())
// const tagList = computed(() => tagAbout.tableData.list)
// if(tagList.value.length === 0) {
//   store.dispatch('tagAbout/getTagsData')
// }
const articleList = computed(() => articleAbout.tableData.list)
if(articleList.value.length === 0) {
  store.dispatch('articleAbout/getArticleData')
}
</script>

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
// .btnbox {
//   display: flex;
//   flex-flow: row wrap;
//   align-content: space-around;
//   .btn{
//     margin: 0 0 10px 10px;
//   }
// }
.row-right {
  padding-left: 20px;
  height: 100px;
}
</style>
