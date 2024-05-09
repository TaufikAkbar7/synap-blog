import { create } from 'zustand'
import { IAppSlice } from './interfaces/app.interface'
import createAppSlice from './slices/app.slice'

const useAppStore = create<IAppSlice>()((...a) => ({
  ...createAppSlice(...a)
}))

export default useAppStore
