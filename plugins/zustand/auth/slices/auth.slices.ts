import { StateCreator } from 'zustand'
import { IAuthSlice } from '../interfaces/auth.interfaces'

const createAuthSlice: StateCreator<IAuthSlice> = set => ({
  isAuthenticated: false,
  setIsAuthenticated(value: boolean) {
    set(() => ({ isAuthenticated: value }))
  },
  logout() {
    set(() => ({ isAuthenticated: false }))
    localStorage.removeItem('auth')
  }
})

export default createAuthSlice
