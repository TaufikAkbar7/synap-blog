import React, { memo } from 'react'

type TProps = {
  children: React.ReactNode
}

function AppLayoutAuth({ children }: TProps) {
  return (
    <section className="min-h-screen">
      <div className="flex flex-row min-h-screen align-center gap-x-20">
        <div className="flex flex-col items-center justify-center px-10 bg-black">
          <span className="text-[60px] font-bold text-white">
            Senior web designers <span className="text-primary">&</span>{' '}
            Full-Stack Developers
          </span>
        </div>
        <div className="flex items-center justify-center px-12">
          <div className="shadow-xl rounded-lg py-5 px-8">{children}</div>
        </div>
      </div>
    </section>
  )
}

export default memo(AppLayoutAuth)
