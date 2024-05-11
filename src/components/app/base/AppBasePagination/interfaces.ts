export interface IAppBasePaginationProps {
  /* eslint-disable no-unused-vars */
  onPageChange: (page: number) => void
  currentPage: number
  totalCount: number
  siblingCount?: number
  pageSize: number
}
