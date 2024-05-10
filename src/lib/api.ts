import axiosInstance from '@/plugins/axios'
import useSWR from 'swr'
import useSWRMutation, { TriggerWithoutArgs } from 'swr/mutation'

export type TQuery = {
  title: string
  body: string
  name: string
  email: string
}

interface IGetAllPostsProps {
  page?: number
  items_page?: number
  query?: Partial<TQuery>
}

interface IPaginationInfo {
  limit: number
  currentPage: number
  totalCount: number
}

export interface IResponseType<T> {
  data: T
  isLoading: boolean
  error: any
  paginationInfo?: IPaginationInfo
  mutate: any
}

export interface IResponseTypeMutation<T> {
  data: T
  isLoading: boolean
  error: any
  trigger: TriggerWithoutArgs
}

interface IResponsePosts {
  id: number
  user_id: number
  title: string
  body: string
}

export interface IResponseUser {
  id: number
  name: string
  email: string
  gender: string
  status: string
}

const queryParams = (obj: any) => {
  if (!obj) return null

  return Object.keys(obj)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join('&')
}

export const useGetAllPosts = ({
  page = 1,
  items_page = 12,
  query
}: IGetAllPostsProps) => {
  const resultQuery = queryParams(query)

  const { data, error, isLoading } = useSWR(`get-all-posts-${page}`, () =>
    axiosInstance.get(
      `/posts?page=${page}&per_page=${items_page}&${resultQuery}`
    )
  )
  const getPaginationInfo = {
    limit: parseInt(data?.headers['x-pagination-limit']) ?? 10,
    currentPage: parseInt(data?.headers['x-pagination-page']) ?? 1,
    totalCount: parseInt(data?.headers['x-pagination-total']) ?? 0
  }

  return {
    data: data?.data,
    error: error,
    isLoading: isLoading,
    paginationInfo: getPaginationInfo
  } as IResponseType<IResponsePosts[]>
}

export const useGetPost = (id: number) => {
  const { data, error, isLoading } = useSWR(`get-detail-post`, () =>
    axiosInstance.get(`/posts/${id}`)
  )

  return {
    data: data?.data,
    error: error,
    isLoading: isLoading
  } as IResponseType<IResponsePosts>
}

export const useGetAllUsers = ({
  page = 1,
  items_page = 12,
  query
}: IGetAllPostsProps) => {
  const resultQuery = queryParams(query)

  const { data, error, isLoading, mutate } = useSWR(
    `get-all-users-${page}`,
    () =>
      axiosInstance.get(
        `/users?page=${page}&per_page=${items_page}&${resultQuery}`
      )
  )
  const getPaginationInfo = {
    limit: parseInt(data?.headers['x-pagination-limit']) ?? 10,
    currentPage: parseInt(data?.headers['x-pagination-page']) ?? 1,
    totalCount: parseInt(data?.headers['x-pagination-total']) ?? 0
  }

  return {
    data: data?.data,
    error: error,
    isLoading: isLoading,
    paginationInfo: getPaginationInfo,
    mutate
  } as IResponseType<IResponseUser[]>
}

export const useGetUser = (id: number) => {
  const { data, error, isLoading } = useSWR(`get-detail-user`, () =>
    axiosInstance.get(`/user/${id}`)
  )

  return {
    data: data?.data,
    error: error,
    isLoading: isLoading
  } as IResponseType<IResponseUser>
}

export const useEditUser = () => {
  const { data, error, isMutating, trigger } = useSWRMutation(
    `get-update-user`,
    (_, { arg }: { arg: { id: number; payload: Omit<IResponseUser, 'id'> } }) =>
      axiosInstance.put(`/users/${arg.id}`, arg.payload)
  )

  return {
    data: data?.data,
    error: error,
    isLoading: isMutating,
    trigger: trigger
  } as IResponseTypeMutation<IResponseUser>
}

export const useDeleteUser = () => {
  const { data, error, isMutating, trigger } = useSWRMutation(
    `get-delete-user`,
    (_, { arg }: { arg: { id: number } }) =>
      axiosInstance.delete(`/users/${arg.id}`)
  )

  return {
    data: data?.data,
    error: error,
    isLoading: isMutating,
    trigger: trigger
  } as IResponseTypeMutation<IResponseUser>
}
