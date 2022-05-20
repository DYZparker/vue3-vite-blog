import { ITableData, IEditData, IUserAbout } from '../../types/user'
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
        title: '权限',
        propName: 'admin',
        isEdit: true,
        hasSlot: true,
        width: 180
      },
      { 
        title: '注册时间',
        propName: 'date',
        isEdit: false,
        hasSlot: false,
        width: 180
      }
    ],
    tableData: [
      {
        username: 'zhangsan',
        password: '123',
        admin: true,
        date: '2016-05-02'
      },
      {
        username: 'lisi',
        password: '456',
        admin: false,
        date: '2016-02-01'
      },
      {
        username: 'wangwu',
        password: '789',
        admin: false,
        date: '2017-06-06'
      }
    ],
    editData: {
      index: -1,
      data: {
        username: 'test',
        password: 'test',
        admin: false,
        date: '0-0-0'
      }
    }
  }),
  actions:{
    jiaOdd(context: any){
      console.log('actions中的jiaOdd被调用了')
    },
  },
  mutations:{
    SHOWDIALOG(state: IUserAbout){
      console.log('mutations中的SHOWDIALOG被调用了')
      state.dialogVisible = true
      state.editData = {
        index: -1,
        data: {
          username: '',
          password: '',
          admin: false,
          date: ''
        }
      }
    },
    SHOW(state: IUserAbout, data: IEditData){
      console.log('mutations中的SHOW被调用了', data)
      state.dialogVisible = true
      state.editData = {...data}
    },
    CLOSE(state: IUserAbout){
      console.log('mutations中的CLOSE被调用了')
      state.dialogVisible = false
    },
    EDIT(state: IUserAbout, data: ITableData){
      console.log('mutations中的EDIT被调用了')
      state.dialogVisible = false
      if(state.editData.index === -1) {
        state.tableData.unshift(data)
      }else{
        state.tableData[state.editData.index] = {...data}
      }
    },
    DELETE(state: IUserAbout, index: number){
      console.log('mutations中的DELETE被调用了',index)
      const arr = [...state.tableData]
      arr.splice(index, 1)
      state.tableData = arr
    },
  },
  // getters:{
  //   bigSum(state){
  //     return state.sum*10
  //   }
  // },
}
