import type { ElForm } from 'element-plus'
import { IArticleAbout } from './article'
import { IUserAbout } from './user'
import { ITagAbout } from './tag'
import { ILinkAbout } from './link'

export type FormInstance = InstanceType<typeof ElForm>
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
  tagAbout: ITagAbout
  linkAbout: ILinkAbout
  userAbout: IUserAbout
  articleAbout: IArticleAbout
}