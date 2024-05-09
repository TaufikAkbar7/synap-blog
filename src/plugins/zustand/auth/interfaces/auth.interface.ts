/* eslint-disable no-unused-vars */
export interface IAuthSlice {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  logout: () => void
}
