import { IArticleAbout } from './article'
import { IUserAbout } from './user'

export interface ITableMenu {
  title: string;
  propName: string;
  isEdit: boolean;
  hasSlot: boolean;
  width: number;
}

export interface IPagination {
  page: number;
  size: number;
  search: object;
}

export interface IState {
  userAbout: IUserAbout
  articleAbout: IArticleAbout
}