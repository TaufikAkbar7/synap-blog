// react
import React, { Suspense } from 'react'

// antd
import { ConfigProvider, Spin } from 'antd'

// tailwind
import '../assets/styles/globals.css'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            <Spin size="large" />
          </div>
        }
      >
        <main>{children}</main>
      </Suspense>
    </ConfigProvider>
  )
}
