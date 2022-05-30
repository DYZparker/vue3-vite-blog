import $http from './index'
import { IPagination } from '../types/common'
import { ITableRowData } from '../types/user'

export const getUsers = (data: IPagination) => {
  return $http({
    url: "/users/getUsers",
    method: "post",
    data
  })
}

export const register = (data: ITableRowData) => {
  return $http({
    url: "/users/register",
    method: "post",
    data
  })
}

export const setUser = (data: ITableRowData) => {
  return $http({
    url: `/users/update/${data._id}`,
    method: "patch",
    data
  })
}

export const deleteUser = (data: ITableRowData) => {
  return $http({
    url: `/users/remove/${data._id}`,
    method: "delete"
  })
}
