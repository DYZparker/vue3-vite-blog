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
  password: string;
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

export interface IPagination {
  page: number;
  size: number;
  search: string;
}

export interface IUserAbout {
  dialogVisible: boolean;
  tableMenu: Array<ITableMenu>;
  tableData: ITableData;
  editData: IEditData;
  paginationData: IPagination;
}