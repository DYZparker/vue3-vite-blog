import $http from './index'
import { IPagination } from '../types/common'
import { ITableRowData } from '../types/user'

export const login = ({username, password}: {username: string, password: string}) => {
  return $http({
    url: "/users/login",
    method: "post",
    data: {
      username,
      password
    }
  })
}

export const checkToken = ({username}: {username: string}) => {
  return $http({
    url: "/users/checkToken",
    method: "post",
    data: {
      username
    }
  })
}

export const checkRegister = ({username, nickname, phone}: {username?: string, nickname?: string, phone?: number}) => {
  return $http({
    url: "/users/checkRegister",
    method: "post",
    data: {
      username,
      nickname,
      phone
    }
  })
}

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
