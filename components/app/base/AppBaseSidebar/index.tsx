'use client'

import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import React, { memo } from 'react'
import { IconType } from 'react-icons'
import AppNavItems from '../AppBaseNavItems'

interface SidebarProps extends BoxProps {
  onClose: () => void
  navItems: Array<{ name: string; path: string; icon: IconType }>
}

function AppBaseSidebar({ onClose, navItems, ...rest }: SidebarProps) {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
          Boilerplate Next Chakra UI
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {navItems.map(nav => (
        <AppNavItems
          key={nav.name}
          path={nav.path}
          icon={nav.icon}
          name={nav.name}
        >
          {nav.name}
        </AppNavItems>
      ))}
    </Box>
  )
}

export default memo(AppBaseSidebar)
