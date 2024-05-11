import { AxiosResponse } from 'axios'
import { TriggerWithArgs } from 'swr/mutation'

export type TQuery = {
  title: string
  body: string
  name: string
  email: string
}

export interface IGetAllPostsProps {
  page?: number
  items_page?: number
  query?: Partial<TQuery>
}

export interface IPaginationInfo {
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

export interface IResponseTypeMutation<T, K>
  extends Omit<IResponseType<T>, 'mutate'> {
  trigger: K
}

export interface IResponsePosts {
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

export type TTriggerArgsUpdateUser = TriggerWithArgs<
  AxiosResponse<any, any>,
  any,
  'update-user',
  { id: number; payload: Omit<IResponseUser, 'id'> }
>

export type TTriggerArgsDeleteUser = TriggerWithArgs<
  AxiosResponse<any, any>,
  any,
  'delete-user',
  { id: number }
>

export type TTriggerArgsPostUser = TriggerWithArgs<
  AxiosResponse<any, any>,
  any,
  'create-user',
  { payload: Omit<IResponseUser, 'id'> }
>

export interface IResponseComment extends Omit<TQuery, 'user_id' | 'title'> {
  id: number
  post_id: number
}

export interface IPayloadComment extends Omit<TQuery, 'user_id' | 'title'> {}

export type TTriggerArgsCreateComment = TriggerWithArgs<
  AxiosResponse<any, any>,
  any,
  'user-create-comment',
  { id: string; payload: IPayloadComment }
>
