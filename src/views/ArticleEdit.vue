<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="articleRules"
    label-width="80px"
    size="default"
  >
    <el-form-item label="文章标题" prop="title">
      <el-input v-model="ruleForm.title" />
    </el-form-item>
    <el-form-item label="封面地址" prop="img">
      <el-input v-model="ruleForm.img" />
    </el-form-item>
    <el-form-item label="简介" prop="summary">
      <el-input v-model="ruleForm.summary" />
    </el-form-item>
    <el-form-item label="标签分类" prop="tags">
      <el-checkbox-group v-model="ruleForm.tags">
        <el-checkbox 
          v-for="item in tagList" 
          :key="item._id"
          :label="item.tagName" 
          name="type" 
        />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="文章内容" prop="content">
      <v-md-editor v-model="ruleForm.content" height="400px"></v-md-editor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >提交</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue'
import { useStore } from '../store'
import { useRoute, useRouter } from 'vue-router'
import { FormInstance } from '../types/common'
import { InitArticleData } from '../types/article'
import { articleRules } from '../utils/constant'

const route = useRoute()
const router = useRouter()
const store = useStore()
const {articleAbout, tagAbout} = store.state
const ruleFormRef = ref<FormInstance>()
const { ruleForm } = reactive(new InitArticleData)
const tableList = computed(() => articleAbout.tableData.list)
const tagList = computed(() => tagAbout.tableData.list)
if(tagList.value.length === 0) {
  store.dispatch('tagAbout/getTagsData')
}

onMounted(() => {
  const num = Number(route.query.index)
  if(route.query.index && tableList.value.length > 0) {
    for(let item in ruleForm){
      ruleForm[item] = tableList.value[num][item]
    }
  }
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.dispatch('articleAbout/editArticle', {
        index: route.query.index,
        data: ruleForm
      })
      router.push('/article/classify')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped lang="scss">
</style>
