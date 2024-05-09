'use client'

import React, { memo } from 'react'
import {
  Drawer,
  DrawerContent,
  useDisclosure,
  Box,
  useColorModeValue,
  IconButton,
  Flex,
  Text
} from '@chakra-ui/react'
import { FiHome, FiLogOut, FiMenu } from 'react-icons/fi'
import { AppBaseSidebar } from '@/components'

function AppLayoutDefault({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navItems = [
    { name: 'Home', path: '/', icon: FiHome },
    { name: 'Logout', path: '', icon: FiLogOut }
  ]
  return (
    <section>
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        <AppBaseSidebar
          navItems={navItems}
          onClose={onClose}
          display={{ base: 'none', md: 'block' }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <AppBaseSidebar onClose={onClose} navItems={navItems} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <Flex
          ml={{ base: 0, md: 60 }}
          px={{ base: 4, md: 24 }}
          height="20"
          alignItems="center"
          bg={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="1px"
          borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
          justifyContent="flex-start"
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            variant="outline"
            onClick={onOpen}
            aria-label="open menu"
            icon={<FiMenu />}
          />

          <Text fontSize="xl" ml="8" fontFamily="monospace" fontWeight="bold">
            Boilerplate Next Chakra UI
          </Text>
        </Flex>
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
      </Box>
    </section>
  )
}

export default memo(AppLayoutDefault)
