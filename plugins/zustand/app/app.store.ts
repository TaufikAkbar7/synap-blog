import { create } from 'zustand'
import { IAppSlice } from './interfaces/app.interfaces'
import createAppSlice from './slices/app.slices'

const useAppStore = create<IAppSlice>()((...a) => ({
  ...createAppSlice(...a)
}))

export default useAppStore
