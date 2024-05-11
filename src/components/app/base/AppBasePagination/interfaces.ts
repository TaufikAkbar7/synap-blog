export interface IAppBasePaginationProps {
  onPageChange: (page: number) => void
  currentPage: number
  totalCount: number
  siblingCount?: number
  pageSize: number
}
