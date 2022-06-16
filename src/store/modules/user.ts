import { Module } from 'vuex'
import { IPagination, IState } from '../../types/common'
import { IEditData, IUserAbout, ITableData } from '../../types/user'
import {  getUsers, register, setUser, deleteUser } from '../../http/user'
import { DIALOG_TRIGGER, SET_EDITDATA, SET_TABLEDATA, SET_PAGEDATA } from '../mutation_types'
import { showMessage } from '../../utils/common'

const userModule: Module<IUserAbout, IState> = {
  namespaced:true,
  state:() =>({
    dialogVisible: false,
    tableData: {
      total: 0,
      list: []
    },
    editData: {
      index: -1,
      data: {
        _id: 0,
        username: '',
        nickname: '',
        password: '',
        phone: null,
        gender: 1,
        isAdmin: false
      }
    },
    paginationData: {
      page: 1,
      size: 10,
      search: {}
    }
  }),

  actions:{
    // 获取用户列表
    async getUsersData(context: any, data?: IPagination){
      const res = await getUsers(data ? data : context.state.paginationData)
      data && context.commit('SET_PAGEDATA', data)
      context.commit('SET_TABLEDATA',res.data.result)
    },
    
    // 打开dialog并传递编辑信息
    editDialog(context: any, data: IEditData){
      context.commit('DIALOG_TRIGGER', true)
      context.commit('SET_EDITDATA', data)
    },
    
    // 提交dialog，先判断是新增还是编辑再发送到服务器
    editUser(context: any, data: IEditData){
      // 包装showMessage函数
      const middleFn = async (fn: Function, data: any) => {
        const res = await showMessage(fn, data)
        if(res) {
          context.dispatch('getUsersData')
          context.commit('DIALOG_TRIGGER', false)
        }
      }
      // 用dialog数据是否有序号来判断是新增还是编辑
      if(data.index === -1) {
        middleFn(register, data.data)
      }else{
        middleFn(setUser, data.data)
      }
    },
    
    // 删除用户
    async removeUser(context: any, data: IEditData){
      const res = await showMessage(deleteUser, data.data)
      if(res) {
        context.dispatch('getUsersData')
      }
    }
  },

  mutations:{
    // 更改tableData
    [SET_TABLEDATA](state: IUserAbout, data: ITableData){
      state.tableData.total = data.total
      state.tableData.list = [...data.list]
    },
    
    // dialog打开或者关闭
    [DIALOG_TRIGGER](state: IUserAbout, data: boolean){
      state.dialogVisible = data
    },
    
    // 打开dialog编辑已有的项
    [SET_EDITDATA](state: IUserAbout, data: IEditData){
      state.editData = {...data}
    },
    
    // 更新paginationData
    [SET_PAGEDATA](state: IUserAbout, data: IPagination){
      state.paginationData = {...data}
    },
  }
}

export default userModule