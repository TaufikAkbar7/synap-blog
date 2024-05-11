import { StateCreator } from 'zustand'
import { IAppSlice, IModalConfirmation, IOpenModal } from '../interfaces/app.interface'

const createAppSlice: StateCreator<IAppSlice> = set => ({
  errorMessage: '',
  setErrorMessage(value: string) {
    set(() => ({ errorMessage: value }))
  },
  modalConfirmation: {
    isOpen: false,
    type: 'warning',
    id: undefined,
    title: ''
  },
  setModalConfirmation(value: IModalConfirmation) {
    set(() => ({ modalConfirmation: { ...value } }))
  },
  modal: {
    isOpen: false,
    id: undefined,
    title: ''
  },
  setModal(value: IOpenModal) {
    set(() => ({ modal: { ...value } }))
  },
})

export default createAppSlice
