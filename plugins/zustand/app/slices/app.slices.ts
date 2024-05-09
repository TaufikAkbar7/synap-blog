import { StateCreator } from 'zustand'
import { IAppSlice } from '../interfaces/app.interfaces'

const createAppSlice: StateCreator<IAppSlice> = set => ({
  errorMessage: '',
  setErrorMessage(value: string) {
    set(() => ({ errorMessage: value }))
  }
})

export default createAppSlice
