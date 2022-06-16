import { Module } from 'vuex'
import { IPagination, IState } from '../../types/common'
import { IEditData, IArticleAbout, ITableData } from '../../types/article'
import {  getArticleList, addArticle, setArticle, deleteArticle } from '../../http/article'
import { SET_TABLEDATA, SET_PAGEDATA, } from '../mutation_types'
import { showMessage } from '../../utils/common'

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
      // 包装showMessage函数
      const middleFn = async (fn: Function, data: any) => {
        const res = await showMessage(fn, data)
        if(res) {
          context.dispatch('getArticleData')
        }
      }
      // 用dialog数据是否有序号来判断是新增还是编辑
      if(data.index) {
        middleFn(setArticle, data.data)
      }else{
        middleFn(addArticle, data.data)
      }
    },
    
    // 删除文章
    async removeUser(context: any, data: IEditData){
      const res = await showMessage(deleteArticle, data.data)
      if(res) {
        context.dispatch('getArticleData')
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