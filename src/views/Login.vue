<template>
  <div class="img-box">
    <div class="login-box">
      <h1>博客后台管理系统</h1>
      <el-tabs v-model="activeName" class="tabs">
        <el-tab-pane label="登录" name="first">
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            status-icon
            :rules="loginRules"
            label-width="80px"
          >
            <el-form-item label="账号" prop="username">
              <el-input v-model.trim="loginForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model.trim="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
              <el-button class="sub-btn" type="primary" @click="submitLoginForm(loginFormRef)">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-form
            ref="registFormRef"
            :model="registForm"
            status-icon
            :rules="registRules"
            label-width="80px"
          >
            <el-form-item label="账号" prop="username">
              <el-input v-model.trim="registForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model.trim="registForm.nickname" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model.trim="registForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordConfirm">
              <el-input v-model.trim="registForm.passwordConfirm" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input v-model.number="registForm.phone" autocomplete="off" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="registForm.gender">
                <el-radio :label='0'>女</el-radio>
                <el-radio :label='1'>男</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button class="sub-btn" type="primary" @click="submitRegistForm(registFormRef)">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from '../types/common'
import { InitLoginData } from '../types/user'
import { login, register, checkRegister } from '../http/user'
import { setUser, setToken } from '../utils/auth'
import { showMessage } from '../utils/common'
import Crypto from '../utils/crypto'

const { registForm, loginForm, registFormRef, loginFormRef } = reactive(new InitLoginData)
const router = useRouter()
const myCrypto = new Crypto()
const activeName = ref('first')
const validateUsername = async (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    const res = await checkRegister({username: value})
    res.data.code == 201 && callback(new Error('账号已存在'))
  }
}
const validateNickname = async (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入昵称'))
  } else {
    const res = await checkRegister({nickname: value})
    res.data.code == 201 && callback(new Error('昵称已存在'))
  }
}
const validatePhone = async (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else {
    const res = await checkRegister({phone: value})
    res.data.code == 201 && callback(new Error('手机号已存在'))
  }
}
const validatePasswordConfirm = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== registForm.password) {
    callback(new Error("两次输入的密码不一致"))
  } else {
    callback()
  }
}
const loginRules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 4, max: 24, message: '账号长度需要在4~24之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, max: 24, message: '密码长度需要在4~24之间', trigger: 'blur' }
  ]
}
const registRules = {
  username: [
    { min: 4, max: 24, message: '账号长度需要在4~24之间', trigger: 'blur' },
    { required: true, validator: validateUsername, trigger: 'blur' }
  ],
  nickname: [
    { min: 2, max: 12, message: '账号长度需要在2~12之间', trigger: 'blur' },
    { required: true, validator: validateNickname, trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, max: 24, message: '密码长度需要在4~24之间', trigger: 'blur' }
  ],
  passwordConfirm: [
    { required: true, validator: validatePasswordConfirm, trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' },
    { required: true, validator: validatePhone, trigger: 'blur' }
  ]
}

const submitLoginForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await showMessage(login, loginForm)
      if(res) {
        const { user, token } = res.data.result
        // CBC加密
        const cryUser = myCrypto.encryptCBC(user)
        setUser(cryUser)
        setToken(token)
        router.push('/home')
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
const submitRegistForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      const {passwordConfirm, ...rest} = registForm
      const res = await showMessage(register, {_id:0, isAdmin: false, ...rest})
      if(res) {
        activeName.value = 'first'
        formEl.resetFields()
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped lang="scss">
.img-box {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/bg.png");
  background-size: 100% 100%;
  box-sizing: border-box;
  padding-top: 250px;
  .login-box {
    width: 350px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    margin: 0 auto;
    padding: 40px;
    text-align: center;
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
