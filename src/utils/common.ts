import moment from 'moment'

// 将数据库自动注册的id转为日期
export function initDate(data: any) {
	// 截取_id的前8位十六进制时间戳转换为十进制
	const timeStr = data._id.toString().slice(0, 8)
	return moment(parseInt(timeStr, 16)*1000).format('YYYY-MM-DD')
}
    
// 发送请求后页面loading控制和返回信息展示（错误信息由拦截器处理）
export async function showMessage(fn: Function, data: any){
	const loading = ElLoading.service({
		lock: true,
		text: 'Loading',
		background: 'rgba(0, 0, 0, 0.7)',
	})
	const res = await fn(data)
	loading.close()
	if(res.data.code === 200){
		ElMessage({
			message: res.data.message,
			type: 'success',
		})
		return res
	}
	return null
}