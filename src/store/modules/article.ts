import { Module } from 'vuex'
import { IPagination, IState } from '../../types/common'
import { ITableRowData, IEditData, IArticleAbout, ITableData } from '../../types/article'
import {  getArticleList, addArticle, getArticle, setArticle, deleteArticle } from '../../http/article'
import { DIALOG_TRIGGER, SET_EDITDATA, SET_TABLEDATA, UPDATE_TABLEDATA, SET_PAGEDATA, DELETE_USER } from '../mutation_types'

const articleModule: Module<IArticleAbout, IState> = {
  namespaced:true,
  state:() =>({
    tableData: {
      total: 0,
      list: []
    },
    editData: {
      index: -1,
      data: {
        _id: 0,
        title: '',
        tags: [],
        img: '',
        summary: '',
        content: ''
      }
    },
    paginationData: {
      page: 1,
      size: 10,
      search: {}
    }
  }),

  actions:{
    // 获取文章列表
    async getArticleData(context: any, data?: IPagination){
      const res = await getArticleList(data ? data : context.state.paginationData)
      data && context.commit('SET_PAGEDATA', data)
      context.commit('SET_TABLEDATA',res.data.result)
    },
    
    // // 打开dialog并传递编辑信息
    // editDialog(context: any, data: IEditData){
    //   context.commit('DIALOG_TRIGGER', true)
    //   context.commit('SET_EDITDATA', data)
    // },
    
    // 提交编辑，先判断是新增还是编辑再发送到服务器
    async editArticle(context: any, data: IEditData){
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      // 提交数据loading加载，成功后提示信息，更改数据，关闭dialog
      const showMessage = (msg: string) => {
        context.dispatch('getArticleData')
        ElMessage({
          message: msg,
          type: 'success',
        })
      }
      // 用数据是否有序号来判断是新增还是编辑
      if(data.index === -1) {
        const res = await addArticle(data.data)
        loading.close()
        res && showMessage(res.data.message)
      }else{
        const res = await setArticle(data.data)
        loading.close()
        res && showMessage(res.data.message)
      }
    },
    
    // // 删除用户
    // async removeUser(context: any, data: IEditData){
    //   const loading = ElLoading.service({
    //     lock: true,
    //     text: 'Loading',
    //     background: 'rgba(0, 0, 0, 0.7)',
    //   })
    //   const res = await deleteUser(data.data)
    //   loading.close()
    //   if(res){
    //     context.dispatch('getUsersData')
    //     ElMessage({
    //       message: res.data.message,
    //       type: 'success',
    //     })
    //   }
    // },
  },

  mutations:{
    // 更改tableData
    [SET_TABLEDATA](state: IArticleAbout, data: ITableData){
      state.tableData.total = data.total
      state.tableData.list = [...data.list]
    },
    
    // // dialog打开或者关闭
    // [DIALOG_TRIGGER](state: IUserAbout, data: boolean){
    //   state.dialogVisible = data
    // },
    
    // // 打开dialog编辑已有的项
    // [SET_EDITDATA](state: IUserAbout, data: IEditData){
    //   state.editData = {...data}
    // },
    
    // // 更新tableData.list的某一项，如果序号存在则提交编辑，如序号为-1则为添加新项
    // [UPDATE_TABLEDATA](state: IUserAbout, data: ITableRowData){
    //   if(state.editData.index === -1) {
    //     state.tableData.total += 1
    //     state.tableData.list.unshift({...data})
    //   }else{
    //     state.tableData.list[state.editData.index] = {...data}
    //   }
    // },
    
    // // 删除用户
    // [DELETE_USER](state: IUserAbout, index: number){
    //   const arr = [...state.tableData.list]
    //   arr.splice(index, 1)
    //   state.tableData.list = arr
    // },
    
    // 更新paginationData
    [SET_PAGEDATA](state: IArticleAbout, data: IPagination){
      state.paginationData = {...data}
    },
  }
}

export default articleModule