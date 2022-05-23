<template>
  <div class="pagination-block">
    <el-pagination
      v-model:currentPage="pagination.page"
      v-model:page-size="pagination.size"
      :page-sizes="[5, 10, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40"
      @size-change="handleChange"
      @current-change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive, watchEffect } from 'vue'
  import { useStore } from '../store'

  const store = useStore()
  const pagination = reactive({
    page: 1,
    size: 10,
    search: ''
  })
  watchEffect(() => {
    const obj = store.state.userAbout.paginationData
    for(let item in pagination){
      pagination[item] = obj[item]
    }
  })
  const handleChange = (val: number) => {
    store.commit('userAbout/SET_PAGEDATA', pagination)
    store.dispatch('userAbout/getUsersData', pagination)
  }
</script>

<style scoped lang="scss">
  .pagination-block {
    margin-top: 10px;
    text-align: center;
  }
</style>