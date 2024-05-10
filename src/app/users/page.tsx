'use client'

// react
import React, { useCallback, useState } from 'react'

// components
import {
  AppBaseUserCard,
  AppBaseLoading,
  AppBaseTitle,
  AppBasePagination,
  AppBaseTextInput,
  AppBaseModal,
  AppBaseButton,
  AppBaseFormControl,
  AppBaseSelect
} from '@/components'

// services
import { IResponseUser, TQuery, useEditUser, useGetAllUsers } from '@/lib/api'

// lodash
import debounce from 'lodash.debounce'

// react hook form
import { useForm, SubmitHandler } from 'react-hook-form'

// yup
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaUser } from '@/plugins/yup'

interface IOpenModal {
  isOpen: boolean
  id: number
}

const Users = () => {
  const [page, setPage] = useState<number>(1)
  const [openModal, setOpenModal] = useState<IOpenModal>({
    isOpen: false,
    id: 0
  })
  const [search, setSearch] = useState<Partial<TQuery>>()

  const {
    data,
    error,
    isLoading,
    paginationInfo,
    mutate: getUsers
  } = useGetAllUsers({
    page: page,
    query: search
  })
  const { isLoading: isLoadingEditUser, trigger: editUser } = useEditUser()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      gender: 'male',
      status: 'inactive'
    },
    resolver: yupResolver(schemaUser)
  })
  const optionsGender = [
    {
      label: 'Male',
      value: 'male'
    },
    {
      label: 'Female',
      value: 'female'
    }
  ]
  const optionsStatus = [
    {
      label: 'Active',
      value: 'active'
    },
    {
      label: 'Inactive',
      value: 'inactive'
    }
  ]

  const onPageChange = useCallback(
    (value: number) => {
      setPage(value)
    },
    [setPage]
  )

  /**
   * @description handle search article by title and email and debouce 500ms
   */
  const onChangeSearch: React.ChangeEventHandler<HTMLInputElement> | undefined =
    useCallback(
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch({ name: e.target.value, email: e.target.value })
      }, 500),
      []
    )

  const onClickCloseModalEdit = useCallback(() => {
    setOpenModal({ isOpen: false, id: 0 })
    reset()
  }, [])

  const onClickOpenModalEdit = useCallback((data: IResponseUser) => {
    setOpenModal({ isOpen: true, id: data.id })
    setValue('name', data.name)
    setValue('email', data.email)
    setValue('gender', data.gender)
    setValue('status', data.status)
  }, [])

  const onClickOpenModalConfimation = useCallback(() => {}, [])

  const onSubmit: SubmitHandler<Omit<IResponseUser, 'id'>> = useCallback(
    async value => {
      try {
        await editUser({ id: openModal.id, payload: value })
        getUsers()
        onClickCloseModalEdit()
      } catch (error) {
        console.error(error)
      }
    },
    [openModal, getUsers, editUser]
  )

  return (
    <>
      <div className="flex justify-between items-center pb-4">
        <AppBaseTitle title="Users" />
        <div className="flex-none pr-6">
          <AppBaseTextInput
            name="search"
            id="search"
            type="text"
            label="Search"
            placeholder="search title or email..."
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
              <AppBaseUserCard
                key={item.id}
                name={item.name}
                email={item.email}
                gender={item.gender}
                status={item.status}
                onClickEdit={() => onClickOpenModalEdit(item)}
                onClickDelete={onClickOpenModalConfimation}
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
      <AppBaseModal
        open={openModal.isOpen}
        title="Update user"
        onClose={onClickCloseModalEdit}
      >
        <form
          className="w-full flex flex-col gap-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <AppBaseFormControl errorMessage={errors.name?.message ?? ''}>
            <AppBaseTextInput
              type="text"
              id="name"
              label="Name"
              register={register('name')}
            />
          </AppBaseFormControl>
          <AppBaseFormControl errorMessage={errors.email?.message ?? ''}>
            <AppBaseTextInput
              type="email"
              id="email"
              label="Email"
              register={register('email')}
            />
          </AppBaseFormControl>
          <AppBaseFormControl errorMessage={errors.gender?.message ?? ''}>
            <AppBaseSelect
              id="gender"
              label="Gender"
              register={register('gender')}
              options={optionsGender}
            />
          </AppBaseFormControl>
          <AppBaseFormControl errorMessage={errors.status?.message ?? ''}>
            <AppBaseSelect
              id="status"
              label="Status"
              register={register('status')}
              options={optionsStatus}
            />
          </AppBaseFormControl>
          <AppBaseButton
            disabled={isLoadingEditUser}
            loading={isLoadingEditUser}
            type="submit"
          >
            Submit
          </AppBaseButton>
        </form>
      </AppBaseModal>
    </>
  )
}

export default Users
