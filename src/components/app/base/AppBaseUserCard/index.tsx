// react
import React, { memo, useMemo } from 'react'

// react icons
import { FiEdit, FiTrash } from 'react-icons/fi'

// interfaces
import { IAppBaseUserCardProps } from './interfaces'

const AppBaseUserCard = ({
  name,
  email,
  gender,
  status,
  onClickEdit,
  onClickDelete
}: IAppBaseUserCardProps) => {
  /**
   * @description handle render name user if length greater than 33 then truncate name
   */
  const renderName = useMemo(() => {
    if (name.length > 33) {
      return name.slice(0, 33) + '...'
    }
    return name
  }, [name])

  /**
   * @description handle render email user if length greater than 33 then truncate email
   */
  const renderEmail = useMemo(() => {
    if (email.length > 48) {
      return email.slice(0, 48) + '...'
    }
    return email
  }, [email])

  return (
    <div className="flex items-start justify-between gap-y-10 p-6 border border-black rounded-lg w-[28rem]">
      <div className="flex flex-col gap-y-5">
        <h3 className="text-xl font-semibold truncate">{renderName}</h3>
        <div className="flex flex-col gap-y-1">
          <h6 className="text-sm truncate">{renderEmail}</h6>
          <h6 className="text-sm">
            {gender} | {status}
          </h6>
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <FiEdit className="cursor-pointer" onClick={onClickEdit} />
        <FiTrash className="cursor-pointer" onClick={onClickDelete} />
      </div>
    </div>
  )
}

AppBaseUserCard.displayName = 'AppBaseUserCard'

export default memo(AppBaseUserCard)
