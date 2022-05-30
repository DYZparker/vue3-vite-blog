import { IPagination } from './common'

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

export interface IUserAbout {
  dialogVisible: boolean;
  tableData: ITableData;
  editData: IEditData;
  paginationData: IPagination;
}
