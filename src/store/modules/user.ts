import { ITableRowData, IEditData, IUserAbout, IPagination } from '../../types/user'
import {  getUsers, register, setUser, deleteUser } from '../../http/user'
import { DIALOG_TRIGGER, SET_EDITDATA, SET_TABLEDATA, UPDATE_TABLEDATA, SET_PAGEDATA } from '../mutation_types'
export default {
  namespaced:true,
  state:() =>({
    dialogVisible: false,
    tableMenu: [
      { 
        title: '账号',
        propName: 'username',
        isEdit: true,
        hasSlot: false,
        width: 180
      },
      { 
        title: '密码',
        propName: 'password',
        isEdit: true,
        hasSlot: false,
        width: 180
      },
      { 
        title: '管理员',
        propName: 'isAdmin',
        isEdit: true,
        hasSlot: true,
        width: 180
      }
    ],
    tableData: {
      total: 0,
      list: []
    },
    editData: {
      index: -1,
      data: {
        _id: 0,
        username: '',
        password: '',
        isAdmin: false
      }
    },
    paginationData: {
      page: 1,
      size: 10,
      search: ''
    }
  }),

  actions:{
    // 获取用户列表
    getUsersData(context: any, data: IPagination){
      console.log('actions中的getUsersData被调用了')
      getUsers(data).then(res => {
        context.commit('SET_TABLEDATA',res.data.result.userList)
      })
    },
    
    // 打开dialog并传递编辑信息
    editDialog(context: any, data: IEditData){
      console.log('actions中的editDialog被调用了')
      context.commit('DIALOG_TRIGGER', true)
      context.commit('SET_EDITDATA', data)
    },
    
    // 编辑某个用户信息
    editUser(context: any, data: IEditData){
      console.log('actions中的editUser被调用了')
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      // 编辑中等待loading加载，编辑成功提示信息，更改数据，关闭dialog
      const showMessage = (res: any) => {
        if(res){
          loading.close()
          ElMessage({
            message: '恭喜，操作服务器成功！',
            type: 'success',
          })
          context.commit('UPDATE_TABLEDATA', data.data)
          context.commit('DIALOG_TRIGGER', false)
        }else{
          loading.close()
          ElMessage.error('抱歉，服务器繁忙！')
        }
      }
      // 用dialog数据是否有序号来判断是新增还是编辑
      if(data.index === -1) {
        register(data.data).then(res => showMessage(res))
      }else{
        setUser(data.data).then(res => showMessage(res))
      }
    },
    
    // 删除用户
    removeUser(state: IUserAbout){
      console.log('actions中的removeUser被调用了')
      state.dialogVisible = false
    },
  },

  mutations:{
    // 更改tableData.list
    [SET_TABLEDATA](state: IUserAbout, data: Array<ITableRowData>){
      console.log('mutations中的SET_TABLEDATA被调用了')
      // 添加判断page+1才执行
      state.tableData.list = [...data]
    },
    
    // dialog打开或者关闭
    [DIALOG_TRIGGER](state: IUserAbout, data: boolean){
      console.log('mutations中的DIALOG_TRIGGER被调用了')
      state.dialogVisible = data
    },
    
    // 打开dialog编辑已有的项
    [SET_EDITDATA](state: IUserAbout, data: IEditData){
      console.log('mutations中的SET_EDITDATA被调用了')
      state.editData = {...data}
    },
    
    // 更新tableData.list的某一项，如果序号存在则提交编辑，如序号为-1则为添加新项
    [UPDATE_TABLEDATA](state: IUserAbout, data: ITableRowData){
      console.log('mutations中的UPDATE_TABLEDATA被调用了')
      if(state.editData.index === -1) {
        state.tableData.list.unshift({...data})
      }else{
        state.tableData.list[state.editData.index] = {...data}
      }
    },
    
    // 删除已有的项
    DELETE_USER(state: IUserAbout, index: number){
      console.log('mutations中的DELETE_USER被调用了')
      const arr = [...state.tableData.list]
      arr.splice(index, 1)
      state.tableData.list = arr
    },
    
    // 更新paginationData
    [SET_PAGEDATA](state: IUserAbout, data: IPagination){
      console.log('mutations中的SET_PAGEDATA被调用了')
      state.paginationData = {...data}
    },
  },
  // getters:{
  //   bigSum(state){
  //     return state.sum*10
  //   }
  // },
}
