// react
import React from 'react'

// next
import { Metadata } from 'next'
import { Inter } from 'next/font/google'

// components
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'React antd 5',
  description: 'Boilerplate Next.js antd 5'
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
