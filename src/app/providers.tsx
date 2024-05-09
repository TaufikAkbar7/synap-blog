// react
import React, { Suspense } from 'react'

// components
import { AppBaseLoading } from '@/components'

// tailwind
import '../assets/styles/globals.css'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            <AppBaseLoading />
          </div>
        }
      >
        {children}
      </Suspense>
    </main>
  )
}
