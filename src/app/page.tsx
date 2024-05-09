'use client'

// react
import React, { useState } from 'react'

// components
import {
  AppBaseArticleCard,
  AppBaseLoading,
  AppBaseTitle,
  AppLayoutDefault
} from '@/components'
import { useGetAllPosts } from '@/lib/api'
import { usePagination } from '@/hooks'

type Person = {
  id: number
  username: string
  age: number
}

export default function Home() {
  const { data, error, isLoading } = useGetAllPosts({ page: 1 })
  const paginationRage = usePagination({
    currentPage: 1,
    pageSize: 10,
    siblingCount: 1,
    totalCount: 100
  })
  console.log(paginationRage)
  return (
    <AppLayoutDefault>
      <AppBaseTitle title="Articles" />
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <AppBaseLoading />
        </div>
      ) : data && data.length ? (
        <div className="flex flex-wrap gap-5">
          {data.map(item => (
            <AppBaseArticleCard
              key={item.id}
              title={item.title}
              description={item.body}
              navigatePath="ww"
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96">{error}</div>
      )}
    </AppLayoutDefault>
  )
}
