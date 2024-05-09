// react
import React, { memo, useCallback, useMemo } from 'react'

// custom hooks
import { usePagination } from '@/hooks'

const AppBasePagination = ({
  onPageChange,
  currentPage,
  totalCount,
  siblingCount = 1,
  pageSize
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })
  let lastPage = paginationRange[paginationRange.length - 1]

  /**
   * @description if there are less than 2 times in pagination range then not render the component
   */
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = useCallback(() => {
    onPageChange(currentPage + 1)
  }, [currentPage, onPageChange])

  const onPrevious = useCallback(() => {
    onPageChange(currentPage - 1)
  }, [currentPage, onPageChange])

  const renderPaginationItemStyle = useMemo(() => {
    let classname = 'px-2 h-24 text-center flex items-center gap-x-5 rounded-xl text-sm min-w-8 box-border'
    if (currentPage !== 1) {
        classname += ' cursor-pointer'
    }
    if (!lastPage) {
        classname += ' cursor-pointer'
    }

    return classname
  }, [currentPage, lastPage])

  return (
    <ul className="flex list-none">
      <li className={renderPaginationItemStyle} onClick={currentPage !== 1 ? onPrevious : undefined}>
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber: number | string) => {
        if (pageNumber === '...') {
          return <li className="pagination-item dots">&#8230;</li>
        }

        return (
          <li className="" onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        )
      })}

      <li className={renderPaginationItemStyle} onClick={lastPage ? onNext : undefined}>
        <div className="arrow right" />
      </li>
    </ul>
  )
}

AppBasePagination.displayName = 'AppBasePagination'

export default memo(AppBasePagination)
