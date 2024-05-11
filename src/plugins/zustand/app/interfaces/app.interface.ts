import { TModalConfirmationType } from "@/components/app/base/AppBaseModalConfirmation/interfaces"

/* eslint-disable no-unused-vars */
export interface IAppSlice {
  errorMessage: string
  setErrorMessage: (value: string) => void
  setModalConfirmation: (value: IModalConfirmation) => void
  modalConfirmation: IModalConfirmation
  modal: IOpenModal
  setModal: (value: IOpenModal) => void
}

export interface IOpenModal {
  isOpen: boolean
  id?: number
  title?: string
}

export interface IModalConfirmation extends IOpenModal {
  type: TModalConfirmationType
}
