import { IPagination } from './common'

export interface ITableRowData {
  _id: number;
  linkName: string;
  describe: string;
  href: string;
  img: string;
}

export interface ITableData {
  total: number;
  list: Array<ITableRowData>;
}

export interface IEditData {
  index: number;
  data: ITableRowData;
}

export interface ILinkAbout {
  dialogVisible: boolean;
  tableData: ITableData;
  editData: IEditData;
  paginationData: IPagination;
}

export class InitLinkData {
  dialogData: IEditData = {
    index: -1,
    data: {
      _id: 0,
      linkName: '',
      describe: '',
      href: '',
      img: ''
    }
  }
}
