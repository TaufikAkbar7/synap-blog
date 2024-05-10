'use client'

// react
import React, { useCallback, useMemo, useState } from 'react'

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
  AppBaseSelect,
  AppBaseModalConfirmation
} from '@/components'

// services
import {
  useCreateUser,
  useDeleteUser,
  useEditUser,
  useGetAllUsers
} from '@/lib/api'

// interfaces
import { IResponseUser, TQuery } from '@/lib/interfaces'
import { TModalConfirmationType } from '@/components/app/base/AppBaseModalConfirmation/interfaces'

// lodash
import debounce from 'lodash.debounce'

// react hook form
import { useForm, SubmitHandler } from 'react-hook-form'

// yup
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaUser } from '@/plugins/yup'

interface IOpenModal {
  isOpen: boolean
  id?: number
  title?: string
}

interface IModalConfirmation extends IOpenModal {
  type: TModalConfirmationType
}

const Users = () => {
  // use state
  const [page, setPage] = useState<number>(1)
  const [openModal, setOpenModal] = useState<IOpenModal>({
    isOpen: false,
    id: undefined,
    title: 'Update user'
  })
  const [search, setSearch] = useState<Partial<TQuery>>()
  const [openModalConfirmation, setOpenModalConfirmation] =
    useState<IModalConfirmation>({
      isOpen: false,
      id: 0,
      type: 'warning',
      title: ''
    })

  // custom hook
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
  const { isLoading: isLoadingDeleteUser, trigger: deleteUser } =
    useDeleteUser()
  const { isLoading: isLoadingCreateUser, trigger: createUser } =
    useCreateUser()
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

  // constants value
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
        setSearch({ name: e.target.value })
      }, 500),
      [setSearch]
    )

  const onClickCloseModalEdit = useCallback(() => {
    setOpenModal({ isOpen: false })
    reset()
  }, [])

  /**
   * @description handle open modal edit and store data to react hook form using setValue
   * @param data
   */
  const onClickOpenModalEdit = useCallback((data: IResponseUser) => {
    setOpenModal({ isOpen: true, id: data.id, title: 'Update user' })
    setValue('name', data.name)
    setValue('email', data.email)
    setValue('gender', data.gender)
    setValue('status', data.status)
  }, [])

  const onClickOpenModalConfimation = useCallback((id: number) => {
    setOpenModalConfirmation({
      isOpen: true,
      id,
      type: 'warning',
      title: 'Are you sure want delete this user?'
    })
  }, [])

  const onCloseModalConfimation = useCallback(() => {
    setOpenModalConfirmation({
      isOpen: false,
      id: 0,
      type: 'warning',
      title: ''
    })
  }, [])

  /**
   * @description handle open modal edit and store data to react hook form using setValue
   * @param data
   */
  const onClickModalCreateUser = useCallback(() => {
    setOpenModal({ isOpen: true, title: 'Create user' })
  }, [])

  /**
   * @description handle submit edit user
   * @param data
   */
  const onSubmit: SubmitHandler<Omit<IResponseUser, 'id'>> = useCallback(
    async value => {
      try {
        if (openModal.id) {
          await editUser({ id: openModal.id, payload: value })
        } else {
          await createUser({ payload: value })
        }
        getUsers()
        onClickCloseModalEdit()
        setOpenModalConfirmation({
          isOpen: true,
          id: 0,
          type: 'success',
          title: openModal.id ? 'Successfully edit user!' : 'Successfully create user!'
        })
      } catch (error) {
        console.error(error)
      }
    },
    [openModal, getUsers, editUser, setOpenModalConfirmation, createUser]
  )

  /**
   * @description handle delete user by id
   */
  const onDeleteUser = useCallback(async () => {
    try {
      if (openModalConfirmation.id) {
        await deleteUser({ id: openModalConfirmation.id })
      }
      getUsers()
      setOpenModalConfirmation({
        isOpen: true,
        id: 0,
        type: 'success',
        title: 'Successfully delete user!'
      })
    } catch (error) {
      console.error(error)
    }
  }, [openModalConfirmation, getUsers, deleteUser, setOpenModalConfirmation])

  /**
   * @description dynamic is loading submit
   */
  const isLoadingSubmit = useMemo(() => {
    return isLoadingEditUser || isLoadingCreateUser
  }, [isLoadingEditUser, isLoadingCreateUser])

  return (
    <>
      <div className="flex flex-wrap gap-y-5 justify-between items-center pb-4 px-4">
        <AppBaseTitle title="Users" />
        <div className="flex flex-wrap gap-5 sm:flex-nowrap">
          <AppBaseTextInput
            name="search"
            id="search"
            type="text"
            label="Search"
            placeholder="search name..."
            onChange={onChangeSearch}
          />
          <AppBaseButton
            className="w-full sm:!w-44"
            disabled={isLoadingCreateUser}
            loading={isLoadingCreateUser}
            onClick={onClickModalCreateUser}
          >
            Create User
          </AppBaseButton>
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
                onClickDelete={() => onClickOpenModalConfimation(item.id)}
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
        title={openModal.title ?? ''}
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
            disabled={isLoadingSubmit}
            loading={isLoadingSubmit}
            type="submit"
          >
            Submit
          </AppBaseButton>
        </form>
      </AppBaseModal>
      <AppBaseModalConfirmation
        open={openModalConfirmation.isOpen}
        onClose={onCloseModalConfimation}
        title={openModalConfirmation.title ?? ''}
        onOk={onDeleteUser}
        isLoading={isLoadingDeleteUser}
        type={openModalConfirmation.type}
      />
    </>
  )
}

export default Users
