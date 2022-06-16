import axios from 'axios'
import { getToken } from '../utils/auth'

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
    config.headers.common['Authorization'] = 'Bearer ' + token
  }
  return config
})

// 响应拦截
$http.interceptors.response.use(res => {
  const code: number = res.data.code
  if(code == 200) {
    return res
  }
  ElMessage.error(res.data.message)
  return res
},err=>{
  console.log('服务器异常',err)
})

export default $http
