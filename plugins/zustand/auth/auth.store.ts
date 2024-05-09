import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { IAuthSlice } from './interfaces/auth.interfaces'
import createAuthSlice from './slices/auth.slices'

const useAppStore = create<IAuthSlice>()(
  persist(
    devtools((...a) => ({
      ...createAuthSlice(...a)
    })),
    {
      name: 'auth' // name of the item in the storage (must be unique)
    }
  )
)

export default useAppStore
