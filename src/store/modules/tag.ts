import { Module } from 'vuex'
import { IPagination, IState } from '../../types/common'
import { IEditData, ITagAbout, ITableData } from '../../types/tag'
import {  getTags, createTag, setTag, deleteTag } from '../../http/tag'
import { DIALOG_TRIGGER, SET_EDITDATA, SET_TABLEDATA, SET_PAGEDATA } from '../mutation_types'

const tagModule: Module<ITagAbout, IState> = {
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
        tagName: '',
        color: ''
      }
    },
    paginationData: {
      page: 1,
      size: 10,
      search: {}
    }
  }),

  actions:{
    // 获取标签列表
    async getTagsData(context: any, data?: IPagination){
      const res = await getTags(data ? data : context.state.paginationData)
      data && context.commit('SET_PAGEDATA', data)
      context.commit('SET_TABLEDATA',res.data.result)
    },
    
    // 打开dialog并传递编辑信息
    editDialog(context: any, data: IEditData){
      context.commit('DIALOG_TRIGGER', true)
      context.commit('SET_EDITDATA', data)
    },
    
    // 提交dialog，先判断是新增还是编辑再发送到服务器
    async editTag(context: any, data: IEditData){
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      // 提交数据loading加载，成功后提示信息，更改数据，关闭dialog
      const showMessage = (msg: string) => {
        context.dispatch('getTagsData')
        context.commit('DIALOG_TRIGGER', false)
        ElMessage({
          message: msg,
          type: 'success',
        })
      }
      // 用dialog数据是否有序号来判断是新增还是编辑
      if(data.index === -1) {
        const res = await createTag(data.data)
        loading.close()
        res && showMessage(res.data.message)
      }else{
        const res = await setTag(data.data)
        loading.close()
        res && showMessage(res.data.message)
      }
    },
    
    // 删除标签
    async removeTag(context: any, data: IEditData){
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      const res = await deleteTag(data.data)
      loading.close()
      if(res){
        context.dispatch('getTagsData')
        ElMessage({
          message: res.data.message,
          type: 'success',
        })
      }
    },
  },

  mutations:{
    // 更改tableData
    [SET_TABLEDATA](state: ITagAbout, data: ITableData){
      state.tableData.total = data.total
      state.tableData.list = [...data.list]
    },
    
    // dialog打开或者关闭
    [DIALOG_TRIGGER](state: ITagAbout, data: boolean){
      state.dialogVisible = data
    },
    
    // 打开dialog编辑已有的项
    [SET_EDITDATA](state: ITagAbout, data: IEditData){
      state.editData = {...data}
    },
    
    // 更新paginationData
    [SET_PAGEDATA](state: ITagAbout, data: IPagination){
      state.paginationData = {...data}
    },
  }
}

export default tagModule