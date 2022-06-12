import $http from './index'
import { IPagination } from '../types/common'
import { ITableRowData } from '../types/tag'

export const getTags = (data: IPagination) => {
  return $http({
    url: "/tags",
    method: "post",
    data
  })
}

export const createTag = (data: ITableRowData) => {
  return $http({
    url: "/tags/create",
    method: "post",
    data
  })
}

export const setTag = (data: ITableRowData) => {
  return $http({
    url: `/tags/update/${data._id}`,
    method: "patch",
    data
  })
}

export const deleteTag = (data: ITableRowData) => {
  return $http({
    url: `/tags/remove/${data._id}`,
    method: "delete"
  })
}
