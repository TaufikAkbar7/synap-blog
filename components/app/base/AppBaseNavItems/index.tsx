'use client'

import React, { memo, ReactNode, useCallback } from 'react'
import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { useAuthStore } from '@/plugins/zustand'
import { useRouter } from 'next/navigation'

interface NavItemProps extends FlexProps {
  name: string
  icon: IconType
  path: string
  children: ReactNode
}

function AppBaseNavItems({
  icon,
  children,
  path,
  name,
  ...rest
}: NavItemProps) {
  const router = useRouter()
  const logout = useAuthStore(state => state.logout)

  const onClickLink = useCallback(
    (name: string, path: string) => {
      if (name === 'Logout') {
        logout()
      }
      router.push(path)
    },
    [logout, router]
  )

  return (
    <Link
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={() => onClickLink(name, path)}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

export default memo(AppBaseNavItems)
