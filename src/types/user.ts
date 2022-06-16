import {ref} from 'vue'
import { IPagination, FormInstance } from './common'

/* Login组件start */
enum sex {
  '女',
  '男'
}
export interface registFormInt {
  username: string,
  nickname: string,
  password: string,
  passwordConfirm: string,
  phone: number | null,
  gender: sex
}

export interface LoginFormInt {
  username: string,
  password: string
}

export class InitLoginData {
  registForm: registFormInt = {
    username: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    phone: null,
    gender: 1
  }
  loginForm: LoginFormInt = {
    username: '',
    password: ''
  }
  registFormRef = ref<FormInstance>()
  loginFormRef = ref<FormInstance>()
}
/* Login组件end */

/* User组件start */
export interface ITableMenu {
  title: string;
  propName: string;
  isEdit: boolean;
  hasSlot: boolean;
  width: number;
}
export interface ITableRowData {
  _id: number;
  username: string;
  nickname: string;
  phone: number | null;
  gender: sex;
  isAdmin: boolean;
}

export interface ITableData {
  total: number;
  list: Array<ITableRowData>;
}

export interface IEditData {
  index: number;
  data: ITableRowData;
}

export interface IUserAbout {
  dialogVisible: boolean;
  tableData: ITableData;
  editData: IEditData;
  paginationData: IPagination;
}

export class InitUserData {
  dialogData: IEditData = {
    index: -1,
    data: {
      _id: 0,
      username: '',
      nickname: '',
      phone: null,
      gender: 1,
      isAdmin: false
    }
  }
}
/* User组件end */
