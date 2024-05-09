'use client'

import React, { Suspense } from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import ChakraTheme from '@/plugins/chakra-ui'
import { useAuthStore } from '@/plugins/zustand'
import { useRouter } from 'next/navigation'

export function Providers({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const router = useRouter()
  if (!isAuthenticated) {
    router.replace('/login')
  }
  return (
    <CacheProvider>
      <ChakraProvider theme={{ ...ChakraTheme }}>
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </ChakraProvider>
    </CacheProvider>
  )
}
