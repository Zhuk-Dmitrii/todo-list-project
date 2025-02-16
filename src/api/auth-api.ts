import { instance } from './client'
import { DataAuthLogin, DataAuthMe, dataLoginType, ResponseAuth } from './typesAPI/authTypes'

export const authAPI = {
  login(data: dataLoginType) {
    return instance.post<ResponseAuth<DataAuthLogin>>('/auth/login', data)
  },
  me() {
    return instance.get<ResponseAuth<DataAuthMe>>('/auth/me')
  },
  logout() {
    return instance.delete<ResponseAuth>('/auth/login')
  },
}
