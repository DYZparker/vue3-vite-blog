<template>
  <el-dialog
    v-model="dialogVisible"
    width="30%"
    :before-close="handleClose"
    center
  >
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="dialogData.data"
      :rules="rules"
      style="max-width: 460px"
    >
      <el-form-item v-for="item in isEditTableMenu" :label="item.title" :prop="item.propName">
        <!-- 判断可编辑项是否用插槽的样式展示，默认用input -->
        <div v-if="item.hasSlot">
          <slot :data="dialogData.data"></slot>
        </div>
        <div v-else>
          <el-input v-model="dialogData.data[item.propName]"></el-input>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="editDialog">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { computed, ref, reactive, watchEffect } from 'vue'
  import { useStore } from '../store'

  const rules = {
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' },
      { min: 4, max: 24, message: '账号长度需要在4~24之间', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 4, max: 24, message: '密码长度需要在4~24之间', trigger: 'blur' }
    ]
  }
  const store = useStore()
  const { tableMenu } = store.state.userAbout
  const labelPosition = ref('right')
  const isEditTableMenu = computed(() => tableMenu.filter(item => item.isEdit === true))
  // 计算值dialogVisible双向绑定v-model要用完整写法包含set
  const dialogVisible = computed({
    get() {
      return store.state.userAbout.dialogVisible
    },
    set(value: boolean) {
      store.state.userAbout.dialogVisible = value
    }
  })
  
  /* 
    不能用v-model绑定vuex的state中对象类型的计算值（computed），
    原因：
        1. 双向绑定computed参数对象中要写set函数，如果input是v-for循环不好定义输入类型
        2. 就算单个input双向绑定了，input输入就会更改vuex的state
    解决：
        在组件中声明中间变量，watchEffect监听vuex中数据变化并赋值给中间变量，中间变量值改变页面重新渲染
  */
  let dialogData = reactive({
    index: -1,
    data: {
      _id: 0,
      username: '',
      password: '',
      isAdmin: false
    }
  })
  watchEffect(() => {
    const obj = store.state.userAbout.editData
    /* 
      拷贝对象，用JSON方法或者解构赋值都会丢失响应性，只能用for循环，且不能深拷贝
      1.  dialogData = reactive(JSON.parse(JSON.stringify(obj)))
      2.  const {...a} = store.state.userAbout.editData
          dialogData = a 
    */
    dialogData.index = obj.index
    for(let item in dialogData.data){
      dialogData.data[item] = obj.data[item]
    }
  })
  const closeDialog = () => store.commit('userAbout/DIALOG_TRIGGER', false)
  const editDialog = () => store.dispatch('userAbout/editUser', dialogData)
  const handleClose = () => {
    ElMessageBox.confirm('确定要取消编辑吗？')
      .then(() => closeDialog())
      .catch(() => {}
    )
  }
</script>

<style scoped lang="scss">
  .form-inline {
    padding: 20px 20px 0 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
