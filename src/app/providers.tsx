// react
import React, { Suspense } from 'react'

// tailwind
import '../assets/styles/globals.css'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            loading...
          </div>
        }
      >
        <main>{children}</main>
      </Suspense>
    </div>
  )
}
