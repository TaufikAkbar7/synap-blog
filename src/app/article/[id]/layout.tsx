// react
import React from 'react'

// components
import { AppLayoutDefault } from '@/components'

export default function ArticleDetailLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AppLayoutDefault containerClass="max-w-4xl flex items-center py-5">
      {children}
    </AppLayoutDefault>
  )
}
