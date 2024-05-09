import { useMemo } from 'react'

interface IUsePaginationProps {
  totalCount: number
  pageSize: number
  siblingCount: number
  currentPage: number
}

export default function usePagination({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}: IUsePaginationProps) {
  const DOTS = '...'

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)

    const range = (start: number, end: number) => {
      let length = end - start + 1
      return Array.from({ length }, (_, idx) => idx + start)
    }

    const totalPageNumbers = siblingCount + 5

    /**
     * @description if the number of pages is less than the page numbers we want to show in pagination
     */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    /**
     * @description calculate left and right sibling index and make sure they are within range 1 and totalPageCount
     */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    )

    /**
     * @description we do not want to show dots if there is only one position left
     */
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    /**
     * @description show dots right but no left dots to show
     */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    /**
     * @description show dots left but no right dots to show
     */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )
      return [firstPageIndex, DOTS, ...rightRange]
    }

    /**
     * @description show dots left and right
     */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}
