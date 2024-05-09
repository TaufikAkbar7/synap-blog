import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { IAuthSlice } from './interfaces/auth.interface'
import createAuthSlice from './slices/auth.slice'

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
