import React from 'react'
import { AppLayoutAuth } from '@/components'

export default function LoginLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <AppLayoutAuth>{children}</AppLayoutAuth>
}
