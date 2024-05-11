'use client'

// react
import React, { memo, useCallback, useMemo } from 'react'

// components
import { AppBaseButton } from '@/components'

// interfaces
import { IAppBaseArticleCardProps } from './interfaces'

// next route
import { useRouter } from 'next/navigation'

const AppBaseArticleCard = ({
  title,
  description,
  navigatePath
}: IAppBaseArticleCardProps) => {
  const router = useRouter()

  /**
   * @description handle navigate route
   */
  const onNavigate = useCallback(
    () => router.push(navigatePath),
    [navigatePath]
  )

  /**
   * @description handle render article body
   */
  const renderArticleBody = useMemo(() => {
    if (description.length > 120) {
      return `${description.slice(0, 120)}...`
    }
    return description
  }, [description])

  return (
    <div className="flex flex-col justify-between gap-y-10 p-6 border border-black rounded-lg w-[19rem] sm:!w-[28rem]">
      <div className="flex flex-col gap-y-5">
        <h3 className="text-xl font-semibold">{title}</h3>
        <h5 className="text-sm">{renderArticleBody}</h5>
      </div>
      <AppBaseButton onClick={onNavigate}>Detail</AppBaseButton>
    </div>
  )
}

AppBaseArticleCard.displayName = 'AppBaseArticleCard'

export default memo(AppBaseArticleCard)
