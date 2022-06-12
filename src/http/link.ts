import $http from './index'
import { IPagination } from '../types/common'
import { ITableRowData } from '../types/link'

export const getLinks = (data: IPagination) => {
  return $http({
    url: "/links",
    method: "post",
    data
  })
}

export const createLink = (data: ITableRowData) => {
  return $http({
    url: "/links/create",
    method: "post",
    data
  })
}

export const setLink = (data: ITableRowData) => {
  return $http({
    url: `/links/update/${data._id}`,
    method: "patch",
    data
  })
}

export const deleteLink = (data: ITableRowData) => {
  return $http({
    url: `/links/remove/${data._id}`,
    method: "delete"
  })
}
