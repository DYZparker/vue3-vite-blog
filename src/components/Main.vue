<script setup lang="ts">
import { ref } from 'vue'
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const value = ref(new Date())
const tableData = [
  {
    date: '2016-05-03',
    tags: 'Tom',
    title: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    tags: 'Jim',
    title: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    tags: 'Tom',
    title: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    tags: 'Jim',
    title: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    tags: 'Tom',
    title: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    tags: 'Jim',
    title: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    tags: 'Tom',
    title: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    tags: 'Jim',
    title: 'No. 189, Grove St, Los Angeles',
  }
]
</script>

<template>
  <!-- <div class="card">
    <el-avatar :size="50" :src="circleUrl"></el-avatar>
    <span>你好，</span>
  </div> -->
  <el-row>
    <el-col :span="16">
      <el-card>
        <template #header>
          <span>文章分类</span>
        </template>
        <el-row>
          <el-col :span="4">
            <el-button type="primary" size="medium" plain>H5</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain>JavaScript</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain>React</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain>Vue</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain>Flutter</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain>Node</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <template #header>
          <span>最新文章</span>
        </template>
          <el-table :data="tableData" style="width: 100%" :show-header="false">
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="tags" label="标签" width="180" />
            <el-table-column prop="date" label="日期" width="180" />
          </el-table>
      </el-card>
    </el-col>
    <el-col :span="8" class="row-right">
      <el-calendar v-model="value" />
    </el-col>
  </el-row>
</template>

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

.row-right {
  padding-left: 20px;
  height: 100px;
}
</style>
