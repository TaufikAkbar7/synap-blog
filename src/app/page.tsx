'use client'

// react
import React, { useCallback, useState } from 'react'

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
import { useGetAllPosts } from '@/lib/api'
import { TQuery } from '@/lib/interfaces'

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
      debounce(
        (e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch({ title: e.target.value }),
        500
      ),
      [setSearch]
    )

  return (
    <AppLayoutDefault>
      <div className="flex flex-col justify-between items-center pb-4 gap-y-5 px-4 sm:!flex-row">
        <AppBaseTitle title="Articles" />
        <div className="flex-none">
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
          <div className="flex justify-center flex-wrap gap-5">
            {data.map(item => (
              <AppBaseArticleCard
                key={item.id}
                title={item.title}
                description={item.body}
                navigatePath={`/article/${item.id}`}
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
