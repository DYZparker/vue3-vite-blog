import { Module } from 'vuex'
import { IPagination, IState } from '../../types/common'
import { IEditData, IArticleAbout, ITableData } from '../../types/article'
import {  getArticleList, addArticle, setArticle, deleteArticle } from '../../http/article'
import { SET_TABLEDATA, SET_PAGEDATA, } from '../mutation_types'

const articleModule: Module<IArticleAbout, IState> = {
  namespaced:true,
  state:() =>({
    tableData: {
      total: 0,
      list: []
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
      if(!data.index) {
        const res = await addArticle(data.data)
        loading.close()
        res && showMessage(res.data.message)
      }else{
        const res = await setArticle(data.data)
        loading.close()
        res && showMessage(res.data.message)
      }
    },
    
    // 删除文章
    async removeUser(context: any, data: IEditData){
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      const res = await deleteArticle(data.data)
      loading.close()
      if(res){
        context.dispatch('getArticleData')
        ElMessage({
          message: res.data.message,
          type: 'success',
        })
      }
    },
  },

  mutations:{
    // 更改tableData
    [SET_TABLEDATA](state: IArticleAbout, data: ITableData){
      state.tableData.total = data.total
      state.tableData.list = [...data.list]
    },
    
    // 更新paginationData
    [SET_PAGEDATA](state: IArticleAbout, data: IPagination){
      state.paginationData = {...data}
    },
  }
}

export default articleModule