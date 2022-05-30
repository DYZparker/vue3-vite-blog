<template>
  <SearchBlock 
    placeholderName="账号" 
    @getData="getData" 
    @addNew="addNew" 
  />
  <DataTableBlock 
    :tableMenu="tableMenu" 
    :tableList="tableList" 
    @edit="edit" 
    @remove="remove" 
  />
  <PaginationBlock 
    :total="total" 
    :paginationData="paginationData" 
    @changePage="changePage" 
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SearchBlock from '../components/SearchBlock.vue'
import DataTableBlock from '../components/DataTableBlock.vue'
import PaginationBlock from '../components/PaginationBlock.vue'
import { useStore } from '../store'
import { IPagination } from '../types/common'
import { ITableRowData } from '../types/article'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const articleAbout = store.state.articleAbout
const tableMenu = [
  { 
    title: '标题',
    propName: 'title',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '标签',
    propName: 'tags',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '封面地址',
    propName: 'img',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '简介',
    propName: 'summary',
    isEdit: true,
    hasSlot: false,
    width: 180
  }
]

/* SearchBlock组件start */
const initEditData = {
  index: -1,
  data: {
    _id: 0,
    title: '',
    tags: [],
    img: '',
    summary: ''
  }
}
const getData = (data: IPagination) => store.dispatch('articleAbout/getArticleData', data)
const addNew = () => store.dispatch('articleAbout/editDialog', initEditData)
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
