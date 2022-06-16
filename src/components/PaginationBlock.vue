<template>
  <div class="pagination-block">
    <el-pagination
      v-model:currentPage="pagination.page"
      v-model:page-size="pagination.size"
      :page-sizes="[5, 10, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleChange"
      @current-change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { IPagination } from '../types/common'

const props = defineProps<{
  total: number,
  paginationData: IPagination
}>()
const emit  = defineEmits(['changePage'])
const pagination = reactive({
  page: 1,
  size: 10,
  search: {}
})
watchEffect(() => {
  for(let item in pagination){
    pagination[item] = props.paginationData[item]
  }
})
const handleChange = () => emit('changePage', pagination)
</script>

<style scoped lang="scss">
.pagination-block {
  margin-top: 10px;
  text-align: center;
}
</style>