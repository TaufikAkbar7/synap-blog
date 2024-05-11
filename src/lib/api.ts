import axiosInstance from '@/plugins/axios'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import {
  IGetAllPostsProps,
  IResponseType,
  IResponseTypeMutation,
  IResponsePosts,
  IResponseUser,
  TTriggerArgsUpdateUser,
  TTriggerArgsDeleteUser,
  TTriggerArgsPostUser,
  IResponseComment,
  TTriggerArgsCreateComment,
  IPayloadComment
} from './interfaces'

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
  let url = resultQuery
    ? `/posts?page=${page}&per_page=${items_page}&${resultQuery}`
    : `/posts?page=${page}&per_page=${items_page}`

  const { data, error, isLoading } = useSWR(
    [`get-all-posts-${page}`, resultQuery],
    () => axiosInstance.get(url)
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

export const useGetPost = ({ id = '1' }: { id: string }) => {
  const { data, error, isLoading } = useSWR(`get-post`, () =>
    axiosInstance.get(`/posts/${id}`)
  )

  return {
    data: data?.data,
    error: error,
    isLoading: isLoading
  } as IResponseType<IResponsePosts>
}

export const useGetPostComments = ({ id = '1' }: { id: string }) => {
  const { data, error, isLoading, mutate } = useSWR(
    [`get-post-comments-${id}`],
    () => axiosInstance.get(`/posts/${id}/comments`)
  )

  return {
    data: data?.data,
    error: error,
    isLoading: isLoading,
    mutate: mutate
  } as IResponseType<IResponseComment[]>
}

export const useCreateComment = () => {
  const { data, error, isMutating, trigger } = useSWRMutation(
    `user-create-comment`,
    (_, { arg }: { arg: { id: string; payload: IPayloadComment } }) =>
      axiosInstance.post(`/posts/${arg.id}/comments`, arg.payload)
  )

  return {
    data: data?.data,
    error: error,
    isLoading: isMutating,
    trigger: trigger
  } as IResponseTypeMutation<IResponseComment, TTriggerArgsCreateComment>
}

export const useCreateUser = () => {
  const { data, error, isMutating, trigger } = useSWRMutation(
    `create-user`,
    (_, { arg }: { arg: { payload: Omit<IResponseUser, 'id'> } }) =>
      axiosInstance.post(`/users`, arg.payload)
  )

  return {
    data: data?.data,
    error: error,
    isLoading: isMutating,
    trigger: trigger
  } as IResponseTypeMutation<IResponseUser, TTriggerArgsPostUser>
}

export const useGetAllUsers = ({
  page = 1,
  items_page = 12,
  query
}: IGetAllPostsProps) => {
  const resultQuery = queryParams(query)
  let url = resultQuery
    ? `/users?page=${page}&per_page=${items_page}&${resultQuery}`
    : `/users?page=${page}&per_page=${items_page}`

  const { data, error, isLoading, mutate } = useSWR(
    [`get-all-users-${page}`, resultQuery],
    () => axiosInstance.get(url)
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
    `update-user`,
    (_, { arg }: { arg: { id: number; payload: Omit<IResponseUser, 'id'> } }) =>
      axiosInstance.put(`/users/${arg.id}`, arg.payload)
  )

  return {
    data: data?.data,
    error: error,
    isLoading: isMutating,
    trigger: trigger
  } as IResponseTypeMutation<IResponseUser, TTriggerArgsUpdateUser>
}

export const useDeleteUser = () => {
  const { data, error, isMutating, trigger } = useSWRMutation(
    `delete-user`,
    (_, { arg }: { arg: { id: number } }) =>
      axiosInstance.delete(`/users/${arg.id}`)
  )

  return {
    data: data?.data,
    error: error,
    isLoading: isMutating,
    trigger: trigger
  } as IResponseTypeMutation<IResponseUser, TTriggerArgsDeleteUser>
}
