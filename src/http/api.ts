import $http from './index'

interface loginData {
  username: string,
  password: string
}

export const login = (data: loginData) => {
  return $http({
    url: "/users/login",
    method: "post",
    data
  })
}
