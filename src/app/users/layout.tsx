// react
import React from 'react'

// components
import { AppLayoutDefault } from '@/components'

export default function UserssLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <AppLayoutDefault>{children}</AppLayoutDefault>
}
