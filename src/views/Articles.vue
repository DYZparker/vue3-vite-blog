<template>
  <SearchBlock 
    :isAddNew="true"
    :searchMsg="searchArticleMsg" 
    @getData="getData" 
    @addNew="addNew" 
  />
  <DataTableBlock 
    :tableMenu="articleTableMenu" 
    :tableList="tableList" 
    @edit="edit" 
    @remove="remove" 
  >
    <!-- 插槽 -->
    <template #tags ="{data}: any">
      {{ data.tags.join('、') }}
    </template>
  </DataTableBlock>
  <PaginationBlock 
    :total="total" 
    :paginationData="paginationData" 
    @changePage="changePage" 
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'
import SearchBlock from '../components/SearchBlock.vue'
import DataTableBlock from '../components/DataTableBlock.vue'
import PaginationBlock from '../components/PaginationBlock.vue'
import { IPagination } from '../types/common'
import { ITableRowData } from '../types/article'
import { articleTableMenu, searchArticleMsg } from '../utils/constant'

const store = useStore()
const router = useRouter()
const articleAbout = store.state.articleAbout

/* SearchBlock组件start */
const getData = (data: IPagination) => store.dispatch('articleAbout/getArticleData', data)
const addNew = () => {
  router.push({
    path: '/article/edit'
  })
}
/* SearchBlock组件end */

/* DataTableBlock组件start */
const tableList = computed(() => articleAbout.tableData.list)
if(tableList.value.length === 0) {
  store.dispatch('articleAbout/getArticleData')
}
const edit = (index:number, data: ITableRowData) => {
  router.push({
    path: '/article/edit',
    query: {index}
  })
}
const remove = (index:number, data: ITableRowData) => store.dispatch('articleAbout/removeUser', { index, data })
/* DataTableBlock组件end */

/* PaginationBlock组件start */
const paginationData = computed(() => articleAbout.paginationData)
const total = computed(() => articleAbout.tableData.total)
const changePage = (data: IPagination) => store.dispatch('articleAbout/getArticleData', data)
/* PaginationBlock组件end */
</script>

<style scoped lang="scss">
.el-table {
  overflow: auto;
}
.el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
}
</style>
