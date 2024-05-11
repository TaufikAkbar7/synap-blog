// react
import React, { memo, useCallback, useMemo } from 'react'

// custom hooks
import { usePagination } from '@/hooks'

// interfaces
import { IAppBasePaginationProps } from './interfaces'

// react icons
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

const AppBasePagination = ({
  onPageChange,
  currentPage,
  totalCount,
  siblingCount = 1,
  pageSize
}: IAppBasePaginationProps) => {
  const paginationItemArrowClass =
    'px-3.5 py-2.5 cursor-pointer border border-transparent hover:border-black rounded-lg'

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })
  let lastPage = useMemo(() => {
    if (paginationRange) {
      return paginationRange[paginationRange.length - 1]
    }
  }, [paginationRange])

  /**
   * @description if there are less than 2 times in pagination range then not render the component
   */
  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null
  }

  const onNext = useCallback(() => {
    onPageChange(currentPage + 1)
  }, [currentPage, onPageChange])

  const onPrevious = useCallback(() => {
    onPageChange(currentPage - 1)
  }, [currentPage, onPageChange])

  return (
    <ul className="flex list-none px-2 h-24 text-center justify-center items-center gap-x-5 rounded-xl text-sm min-w-8 box-border">
      <li
        className={`${paginationItemArrowClass} ${
          currentPage !== 1 ? 'cursor-pointer' : 'cursor-not-allowed'
        }`}
        onClick={currentPage !== 1 ? onPrevious : undefined}
      >
        <IoIosArrowBack />
      </li>
      {paginationRange &&
        paginationRange.map((pageNumber: number | string, pageNumberIndex) => {
          if (pageNumber === '...') {
            return <li key={pageNumberIndex}>&#8230;</li>
          }

          return (
            <li
              key={pageNumberIndex}
              className={
                currentPage === pageNumber
                  ? `px-3.5 py-2 font-semibold border border-black rounded-lg cursor-pointer`
                  : 'px-3.5 py-2 cursor-pointer border border-transparent hover:border-black rounded-lg'
              }
              onClick={() =>
                onPageChange(
                  typeof pageNumber === 'string'
                    ? parseInt(pageNumber)
                    : pageNumber
                )
              }
            >
              {pageNumber}
            </li>
          )
        })}

      <li
        className={`${paginationItemArrowClass} ${
          lastPage && lastPage >= currentPage
            ? 'cursor-pointer'
            : 'cursor-not-allowed'
        }`}
        onClick={lastPage ? onNext : undefined}
      >
        <IoIosArrowForward />
      </li>
    </ul>
  )
}

AppBasePagination.displayName = 'AppBasePagination'

export default memo(AppBasePagination)
