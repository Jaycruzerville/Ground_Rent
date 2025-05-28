import jwt_decode from "jwt-decode"

const setToken = (token: string) => {
  localStorage.setItem("token", token)
}

const setRefreshToken = (token: string) => {
  localStorage.setItem("refreshToken", token)
}

const getToken = () => {
  return localStorage.getItem("token")
}

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken")
}

const getDecodedJwt = () => {
  try {
    const token = getToken()
    return jwt_decode(token!)
  } catch (e) {
    return {}
  }
}

const setUserRole = (role: string) => {
  localStorage.setItem("role", role)
}

const getUserRole = () => {
  return localStorage.getItem("role")
}

const removeTokens = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("role")
}

const logOut = () => {
  removeTokens()
  window.location.replace("/auth")
}

const isAuthenticated = () => {
  try {
    const decodedToken = getDecodedJwt()
    const { exp } = decodedToken as { exp: number }
    const currentTime = Date.now() / 1000

    return exp > currentTime
  } catch (e) {
    return false
  }
}

const Auth = {
  isAuthenticated,
  getDecodedJwt,
  setToken,
  getToken,
  setRefreshToken,
  getRefreshToken,
  setUserRole,
  getUserRole,
  removeTokens,
  logOut,
}

export default Auth
