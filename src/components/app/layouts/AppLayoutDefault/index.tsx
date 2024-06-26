'use client'

// react
import React, { memo } from 'react'

// react router
import { usePathname } from 'next/navigation'

// next link
import Link from 'next/link'

type TProps = {
  children: React.ReactNode
  containerClass?: string
}

function AppLayoutDefault({
  children,
  containerClass = 'py-10 px-14 w-screen'
}: TProps) {
  const pathname = usePathname()
  const menus = [
    {
      label: 'Articles',
      link: '/'
    },
    {
      label: 'Users',
      link: '/users'
    }
  ]

  return (
    <section>
      <div className="!min-h-screen">
        <nav className="!bg-black p-5 flex flex-row items-center justify-between w-full text-white">
          <Link
            href="/"
            prefetch={false}
            className="font-semibold text-xl text-center text-2xl"
          >
            Synapsis Blogger 🤙
          </Link>
          <ul className="flex items-center gap-10">
            {menus.map(menu => (
              <li key={menu.link}>
                <Link
                  href={menu.link}
                  prefetch={false}
                  className={pathname === menu.link ? 'font-bold' : ''}
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className={
            containerClass ? 'flex items-center justify-center w-full' : ''
          }
        >
          <section className={containerClass}>{children}</section>
        </div>
      </div>
    </section>
  )
}

export default memo(AppLayoutDefault)
