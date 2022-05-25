import axios from 'axios'
import { getToken } from '../utils/auth'
import { ElMessage } from 'element-plus'

enum MSGS {
  "操作成功" = 200,
  "密码错误",
  "账号错误",
  "用户已存在" = 10002,
  "请求异常"
}

const $http = axios.create({
  baseURL: "/api",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
})

// 请求拦截
$http.interceptors.request.use(config => {
  const token = getToken()
  config.headers = config.headers || {}
  if(token) {
    config.headers.token = token
  }
  return config
})

// 响应拦截
$http.interceptors.response.use(res => {
  const code: number = res.data.code
  if(code !== 200) {
    ElMessage.error(MSGS[code])
    // return Promise.reject(res.data)
    return res
  }
  return res
},err=>{
  console.log('服务器异常',err)
})

export default $http
