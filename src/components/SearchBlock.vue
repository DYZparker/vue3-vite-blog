<template>
  <el-form :inline="true" :model="formInline" class="form-inline">
    <el-form-item label="">
      <el-input v-model.trim="formInline.inputData" :placeholder="searchMsg.placeholderName" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button v-if="isAddNew && user.isAdmin" type="primary" @click="onAdd">新增</el-button>
      <el-button @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { getUser } from '../utils/auth'
import Crypto from '../utils/crypto'

const myCrypto = new Crypto()
const user = computed(() => myCrypto.decryptCBC(getUser()))
const props = defineProps<{
  isAddNew: Boolean
  searchMsg: {
    searchName: String,
    placeholderName: String
  }
}>()
const emit  = defineEmits(['getData', 'addNew'])
const formInline = reactive({
  inputData: ''
})
const pagination = reactive({
  page: 1,
  size: 10,
  search: {}
})

const onSubmit = () => {
  if(formInline.inputData !== '') {
    const name = String(props.searchMsg.searchName)
    pagination.search = {[name]: formInline.inputData}
    emit('getData', pagination)
  }else{
    ElMessage({
      message: '请输入内容',
      type: 'warning',
    })
  }
}
const onAdd = () => emit('addNew')
const onReset = () => {
  formInline.inputData = ''
  pagination.search = {}
  emit('getData', pagination)
}
</script>

<style scoped lang="scss">
.form-inline {
  padding: 20px 20px 0 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
