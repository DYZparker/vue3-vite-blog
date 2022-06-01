import { IPagination } from './common'

export interface ITableRowData {
  _id: number;
  title: string;
  tags: Array<string>;
  img?: string;
  summary: string;
  content: string;
}

export interface ITableData {
  total: number;
  list: Array<ITableRowData>;
}

export interface IEditData {
  index: number;
  data: ITableRowData;
}

export interface IArticleAbout {
  tableData: ITableData;
  // editData: IEditData;
  paginationData: IPagination;
}
