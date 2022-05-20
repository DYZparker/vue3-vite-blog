export interface ITableMenu {
  title: string;
  propName: string;
  isEdit: boolean;
  hasSlot: boolean;
  width: number;
}

export interface ITableData {
  username: string;
  password: string;
  admin: boolean;
  date: string;
}

export interface IEditData {
  index: number;
  data: ITableData;
}

export interface IUserAbout {
  dialogVisible: boolean;
  tableMenu: Array<ITableMenu>;
  tableData: Array<ITableData>;
  editData: IEditData;
}