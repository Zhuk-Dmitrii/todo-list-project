export type dataLoginType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

export type ResponseAuth<D = object> = {
  resultCode: number
  messages: string[]
  data: D
}

export type DataAuthLogin = {
  userID?: number
}

export type DataAuthMe = {
  id: number
  email: string
  login: string
}
