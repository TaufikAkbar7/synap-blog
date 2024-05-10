'use client'

// react
import React, { useCallback, useEffect, useState } from 'react'

// components
import {
  AppBaseArticleCard,
  AppBaseLoading,
  AppBaseTitle,
  AppLayoutDefault,
  AppBasePagination,
  AppBaseTextInput
} from '@/components'

// services
import { TQuery, useGetAllPosts } from '@/lib/api'

// lodash
import debounce from 'lodash.debounce'

export default function Home() {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<Partial<TQuery>>()
  const { data, error, isLoading, paginationInfo } = useGetAllPosts({
    page: page,
    query: search
  })

  const onPageChange = useCallback(
    (value: number) => {
      setPage(value)
    },
    [setPage]
  )

  /**
   * @description handle search article by title and debouce 500ms
   */
  const onChangeSearch: React.ChangeEventHandler<HTMLInputElement> | undefined =
    useCallback(
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch({ title: e.target.value })
      }, 500),
      []
    )

  return (
    <AppLayoutDefault>
      <div className="flex justify-between items-center pb-4">
        <AppBaseTitle title="Articles" />
        <div className="flex-none pr-6">
          <AppBaseTextInput
            name="search"
            id="search"
            type="text"
            label="Search"
            placeholder="search title..."
            onChange={onChangeSearch}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <AppBaseLoading />
        </div>
      ) : data && data.length ? (
        <div className="flex flex-col gap-y-5">
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
          {paginationInfo && (
            <AppBasePagination
              onPageChange={onPageChange}
              currentPage={paginationInfo.currentPage}
              totalCount={paginationInfo.totalCount}
              pageSize={paginationInfo.limit}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96">{error}</div>
      )}
    </AppLayoutDefault>
  )
}
