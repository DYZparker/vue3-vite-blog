import {ref} from 'vue'
import type { ElForm } from 'element-plus'

type FormInstance = InstanceType<typeof ElForm>

export interface LoginFormInt {
  user_name: string,
  password: string
}

export class InitData {
  loginForm: LoginFormInt = {
    user_name: '',
    password: ''
  }
  loginFormRef = ref<FormInstance>()
}