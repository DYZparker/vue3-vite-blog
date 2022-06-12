import { IPagination } from './common'

export interface ITableRowData {
  _id: number;
  tagName: string;
  color: string;
}

export interface ITableData {
  total: number;
  list: Array<ITableRowData>;
}

export interface IEditData {
  index: number;
  data: ITableRowData;
}

export interface ITagAbout {
  dialogVisible: boolean;
  tableData: ITableData;
  editData: IEditData;
  paginationData: IPagination;
}
