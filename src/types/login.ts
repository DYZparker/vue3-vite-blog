// import type { FormInstance } from 'element-plus'
import FormInstance from 'element-plus'
import {ref} from 'vue'

type FormInstance = /*unresolved*/ any

export interface LoginFormInt {
  user_name: string,
  password: string
}

export class InitData {
  loginForm: LoginFormInt = {
    user_name: '',
    password: ''
  }
  // loginFormRef: any = null
  loginFormRef = ref<FormInstance>()
}