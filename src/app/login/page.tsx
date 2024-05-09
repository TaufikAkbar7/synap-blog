'use client'

// react
import React, { useCallback } from 'react'

// store
import { useAuthStore } from '@/plugins/zustand'

// components
import { AppBaseButton } from '@/components'

// next router
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)

  const onSave = useCallback(
    async (values: any) => {
      console.log(values)
      setIsAuthenticated(true)
      router.push('/')
    },
    [router, setIsAuthenticated]
  )

  return (
    <div className="flex flex-col">
      <div className="">
        <h1 className="font-bold text-3xl">Join our team</h1>
        <span className="text-base">
          We’re looking for amazing engineers just like you! Become a part of
          our rockstar engineering team and skyrocket your career!
        </span>
      </div>
    </div>
  )
}

export default Login
