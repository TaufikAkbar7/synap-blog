'use client'

// react
import React, { useCallback, useState } from 'react'

// services
import { useCreateComment, useGetPost, useGetPostComments } from '@/lib/api'

// components
import {
  AppBaseLoading,
  AppBaseTextInput,
  AppBaseModalConfirmation,
  AppBaseButton,
  AppBaseModal,
  AppBaseFormControl
} from '@/components'

// interfaces
import { TModalConfirmationType } from '@/components/app/base/AppBaseModalConfirmation/interfaces'
import { IPayloadComment } from '@/lib/interfaces'

// react hook form
import { useForm } from 'react-hook-form'

// yup
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaComment } from '@/plugins/yup'

interface IOpenModal {
  isOpen: boolean
  title?: string
}

interface IModalConfirmation extends IOpenModal {
  type: TModalConfirmationType
}

export default function ArticleDetail({ params }: { params: { id: string } }) {
  // state local
  const [openModalConfirmation, setOpenModalConfirmation] =
    useState<IModalConfirmation>({
      isOpen: false,
      type: 'success',
      title: ''
    })
  const [openModal, setOpenModal] = useState<IOpenModal>({
    isOpen: false,
    title: 'Post comment'
  })

  // custom hook
  const { data, isLoading, error } = useGetPost({ id: params.id })
  const { isLoading: isLoadingCreateComment, trigger: createComment } =
    useCreateComment()
  const {
    data: listComments,
    isLoading: isLoadingComments,
    mutate: getComments
  } = useGetPostComments({ id: params.id })

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      body: ''
    },
    resolver: yupResolver(schemaComment)
  })

  const onCloseModalConfimation = useCallback(() => {
    setOpenModalConfirmation({
      isOpen: false,
      type: 'success',
      title: ''
    })
  }, [])

  const onClickOpenCloseModalComment = useCallback(() => {
    setOpenModal(prev => ({ isOpen: !prev.isOpen, title: prev.title }))
    reset()
  }, [setOpenModal])

  const onSubmit = useCallback(
    async (value: IPayloadComment) => {
      try {
        await createComment({ id: params.id, payload: value })
        onClickOpenCloseModalComment()
        setOpenModalConfirmation({
          isOpen: true,
          type: 'success',
          title: 'Successfully post a comment!'
        })
        getComments()
      } catch (error) {
        console.error(error)
      }
    },
    [
      createComment,
      onClickOpenCloseModalComment,
      getComments,
      setOpenModalConfirmation
    ]
  )

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <AppBaseLoading />
        </div>
      ) : data ? (
        <div className="flex flex-col gap-y-5 px-5 lg:px-0">
          <img
            className="rounded-lg w-full object-cover h-[18rem] md:!h-[24rem]"
            src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s"
          />
          <h3 className="text-2xl font-semibold break-words overflow-hidden md:text-4xl">
            {data.title}
          </h3>
          <p className="text-sm break-words overflow-hidden">{data.body}</p>
          <div className="flex flex-wrap justify-between w-full items-center">
            <h5 className="text-lg font-medium">Comments:</h5>
            <AppBaseButton
              disabled={isLoadingCreateComment}
              loading={isLoadingCreateComment}
              onClick={onClickOpenCloseModalComment}
            >
              Post Comment
            </AppBaseButton>
          </div>
          {isLoadingComments ? (
            <div className="flex justify-center items-center w-full">
              <AppBaseLoading />
            </div>
          ) : listComments && listComments.length > 0 ? (
            <div className="flex flex-col gap-y-5 mt-4">
              {listComments.map(comment => (
                <div key={comment.id} className="flex gap-x-5">
                  <img
                    src="https://picsum.photos/200"
                    className="w-14 h-14 object-contain rounded-full"
                  />
                  <div className="flex flex-col gap-y-1">
                    <h6 className="text-base font-medium md:text-xl">
                      {comment.name}
                    </h6>
                    <p className="text-sm">{comment.body}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-center py-5">
              No one comment in this post, be the one who comment
            </p>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96">{error}</div>
      )}
      <AppBaseModal
        open={openModal.isOpen}
        title={openModal.title ?? ''}
        onClose={onClickOpenCloseModalComment}
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
          <AppBaseFormControl errorMessage={errors.body?.message ?? ''}>
            <AppBaseTextInput
              type="text"
              id="body"
              label="Body"
              register={register('body')}
            />
          </AppBaseFormControl>
          <AppBaseButton
            disabled={isLoadingCreateComment}
            loading={isLoadingCreateComment}
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
        isLoading={false}
        onOk={() => {}}
        type={openModalConfirmation.type}
      />
    </>
  )
}
