import { IError } from "@/types"
import Api from "@/utils/api"
import Auth from "@/utils/auth"
import handleApiError from "@/utils/handleApiError"

type loginData = { username: string; password: string }

const dummyUsers = [
  {
    username: "user@user.com",
    password: "user123",
    role: "SUPER_ADMIN",
    accessToken: "fake-super-admin-token",
    refreshToken: "fake-super-admin-refresh-token",
  },
  {
    username: "admin@admin.com",
    password: "admin123",
    role: "ADMIN",
    accessToken: "fake-admin-token",
    refreshToken: "fake-admin-refresh-token",
  },
]

const login = async (params: loginData) => {
  const user = dummyUsers.find(
    (user) =>
      user.username === params.username && user.password === params.password
  )
  if (user) {
    return user
  } else {
    throw new Error("Invalid credentials")
  }
}

const getRoles = async () => {
  try {
    const { data } = await Api.get(`/auth/roles/`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const refreshAccessToken = async () => {
  const user = dummyUsers.find(
    (user) =>
      user.accessToken === Auth.getToken() &&
      user.refreshToken === Auth.getRefreshToken()
  )
  if (user) {
    return user.accessToken
  } else {
    throw new Error("Invalid tokens")
  }
}

const initiatePasswordReset = async (params: { credential: string }) => {
  try {
    const { data } = await Api.post("auth/initiate-password-reset/", params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const authService = {
  login,
  refreshAccessToken,
  getRoles,
  initiatePasswordReset,
}

export default authService

// import Api from "@/utils/api"
// import { IError } from "@/types"
// import handleApiError from "@/utils/handleApiError"
// import Auth from "@/utils/auth"

// type loginData = { username: string; password: string }

// const login = async (params: loginData) => {
//   try {
//     const { data } = await Api.post("auth/login/", params) // Ensure this is the correct endpoint
//     return data
//   } catch (e) {
//     throw new Error(handleApiError(e as IError))
//   }
// }

// const getRoles = async () => {
//   try {
//     const { data } = await Api.get("/auth/roles/")
//     return data
//   } catch (e) {
//     throw new Error(handleApiError(e as IError))
//   }
// }

// const refreshAccessToken = async () => {
//   const params = {
//     accessToken: Auth.getToken(),
//     refreshToken: Auth.getRefreshToken(),
//   }
//   try {
//     const { data } = await Api.post("auth/refresh/", params)
//     Auth.setToken(data?.accessToken)
//     Auth.setRefreshToken(data?.refreshToken)
//     return data?.accessToken
//   } catch (e) {
//     throw new Error(handleApiError(e as IError))
//   }
// }

// const initiatePasswordReset = async (params: { credential: string }) => {
//   try {
//     const { data } = await Api.post("auth/initiate-password-reset/", params)
//     return data
//   } catch (e) {
//     throw new Error(handleApiError(e as IError))
//   }
// }

// const resetPassword = async (params: {
//   credential: string
//   newPassword: string
//   otp: string
// }) => {
//   try {
//     const { data } = await Api.post("auth/complete-password-reset/", params)
//     return data
//   } catch (e) {
//     throw new Error(handleApiError(e as IError))
//   }
// }

// const authService = {
//   login,
//   refreshAccessToken,
//   getRoles,
//   initiatePasswordReset,
//   resetPassword,
// }

// export default authService
