import $http from './index'
import { IPagination } from '../types/common'
import { ITableRowData } from '../types/article'

export const getArticleList = (data: IPagination) => {
  return $http({
    url: "/article/list",
    method: "post",
    data
  })
}

export const addArticle = (data: ITableRowData) => {
  return $http({
    url: "/article/create",
    method: "post",
    data
  })
}

export const getArticle = (data: ITableRowData) => {
  return $http({
    url: `/article/${data._id}`,
    method: "patch",
    data
  })
}

export const setArticle = (data: ITableRowData) => {
  return $http({
    url: `/article/update/${data._id}`,
    method: "patch",
    data
  })
}

export const deleteArticle = (data: ITableRowData) => {
  return $http({
    url: `/article/remove/${data._id}`,
    method: "delete"
  })
}
