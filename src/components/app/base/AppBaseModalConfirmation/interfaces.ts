export type TModalConfirmationType = 'success' | 'warning'

export interface IAppBaseModalConfirmationProps {
  onClose: () => void
  open: boolean
  title: string
  onOk: () => void
  isLoading: boolean
  type?: TModalConfirmationType
}
