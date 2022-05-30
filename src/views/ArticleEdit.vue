<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
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
        <el-checkbox label="Online activities" name="type" />
        <el-checkbox label="Promotion activities" name="type" />
        <el-checkbox label="Offline activities" name="type" />
        <el-checkbox label="Simple brand exposure" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="文章内容" prop="content">
      <md-editor 
        v-model="ruleForm.content" 
        preview-only
      />
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
import { reactive, ref, onBeforeUnmount, shallowRef, onMounted, computed } from 'vue'
import type { ElForm } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../store'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const route = useRoute()
const router = useRouter()
const store = useStore()
const articleAbout = store.state.articleAbout
type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    _id: 0,
    title: '',
    tags: [],
    img: '',
    summary: '',
    content: ''
})
const valueHtml  = ref('<p>hello</p>')
const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' }
  ],
  tags: [
    {
      type: 'array',
      required: true,
      message: '请选择文章标签分类',
      trigger: 'change',
    },
  ],
  img: [
    {
      required: false,
      message: '请输入封面图片地址',
      trigger: 'change',
    },
  ],
  summary: [
    {
      required: true,
      message: '请输入文章介绍',
      trigger: 'change',
    },
  ],
  content: [
    {
      required: true,
      message: '请输入文章内容',
      trigger: 'blur',
    },
  ]
}
const tableList = computed(() => articleAbout.tableData.list)
onMounted(() => {
  const num = Number(route.query.index)
  if(route.query.index) {
    for(let item in ruleForm){
      ruleForm[item] = tableList.value[num][item]
    }
  }
      console.log('onMounted!', ruleForm, tableList.value)
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', ruleForm)
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
