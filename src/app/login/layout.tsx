'use client'

// react
import React from 'react'

// components
import { AppLayoutAuth } from '@/components'

export default function LoginLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <AppLayoutAuth>{children}</AppLayoutAuth>
}
