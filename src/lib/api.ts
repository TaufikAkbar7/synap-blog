import axiosInstance from '@/plugins/axios'
import useSWR from 'swr'

interface IGetAllPostsProps {
  page?: number
  items_page?: number
  query?: string
}

interface IResponseType<T> {
  data: T
  isLoading: boolean
  error: any
}

interface IResponsePosts {
  id: number
  user_id: number
  title: string
  body: string
}

export const useGetAllPosts = ({
  page = 1,
  items_page = 12,
  query
}: IGetAllPostsProps) => {
  const { data, error, isLoading } = useSWR(`get-all-posts-${page}`, () =>
    axiosInstance.get(`/posts?page=${page}&per_page=${items_page}`)
  )
  return {
    data: data?.data,
    error: error,
    isLoading: isLoading
  } as IResponseType<IResponsePosts[]>
}
