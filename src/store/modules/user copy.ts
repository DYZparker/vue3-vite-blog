import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Module } from 'vuex';
interface IUserAbout {
  dialogVisible: boolean;
  tableMenu: {
      title: string;
      propName: string;
      isEdit: boolean;
      width: number;
  }[];
  tableData: {
      username: string;
      password: string;
      admin: boolean;
      date: string;
  }[];
}
// interface IUserAbout {
//   state: {
//       dialogVisible: boolean;
//       tableMenu: {
//           title: string;
//           propName: string;
//           isEdit: boolean;
//           width: number;
//       }[];
//       tableData: {
//           username: string;
//           password: string;
//           admin: boolean;
//           date: string;
//       }[];
//   };
//   actions: {};
//   mutations: {};
// }
export default createStore<IUserAbout>({
  // const a: Store<IUserAbout> = {
  // namespaced:true,
  state:() =>({
    dialogVisible: false,
    tableMenu: [
      { 
        title: '账号',
        propName: 'username',
        isEdit: true,
        width: 180
      },
      { 
        title: '密码',
        propName: 'password',
        isEdit: true,
        width: 180
      },
      { 
        title: '权限',
        propName: 'admin',
        isEdit: true,
        width: 180
      },
      { 
        title: '注册时间',
        propName: 'date',
        isEdit: false,
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
    ]
  }),
  actions:{
    jiaOdd({state, commit}){
      console.log('actions中的jiaOdd被调用了')
      // if(state.sum % 2){
      //   commit('EDIT')
      // }
    },
    // jiaWait(context,value){
    //   console.log('actions中的jiaWait被调用了')
    //   setTimeout(()=>{
    //     context.commit('JIA',value)
    //   },500)
    // }
  },
  mutations:{
    EDIT(state){
      console.log('mutations中的EDIT被调用了')
      state.dialogVisible = !state.dialogVisible
    },
    // JIAN(state,value){
    //   console.log('mutations中的JIAN被调用了')
    //   state.sum -= value
    // },
  },
  // getters:{
  //   bigSum(state){
  //     return state.sum*10
  //   }
  // },
})
