<template>
  <div class="login-box">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      :rules="rules"
      label-width="60px"
      class="loginForm"
    >
      <h1>博客后台管理系统</h1>
      <el-form-item label="账号" prop="user_name">
        <el-input type="user_name" v-model="loginForm.user_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button class="sub-btn" type="primary" @click="submitForm(loginFormRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { InitData } from '../types/login'
import FormInstance from 'element-plus'
import { login } from '../http/api'
import { setToken } from '../utils/auth'

import { useRouter } from 'vue-router'

type FormInstance = any

export default defineComponent({
  setup() {
    const data = reactive(new InitData)
    const router = useRouter()

    const rules = {
      user_name: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 4, max: 24, message: '账号长度需要在4~24之间', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 4, max: 24, message: '密码长度需要在4~24之间', trigger: 'blur' }
      ]
    }

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid: boolean) => {
        if (valid) {
          login(data.loginForm).then(res => {
            setToken(res.data.result.token)
            router.push('./home')
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    return {
      ...toRefs(data),
      rules,
      submitForm
    }
  }
})
</script>

<style scoped lang="scss">
.login-box {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/bg.png");
  background-size: 100% 100%;
  box-sizing: border-box;
  padding-top: 250px;
  .loginForm {
    width: 350px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    margin: 0 auto;
    padding: 30px;
    h1 {
      margin-bottom: 20px;
      font-size: 25px;
      font-weight: bolder;
      text-align: center;
      color: rgb(68, 64, 64);
    }
    .sub-btn {
      width: 100%;
    }
  }
}
</style>
