'use client'

import React, { memo } from 'react'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text
} from '@chakra-ui/react'

function AppLayoutAuth({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Box position={'relative'}>
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
            >
              Senior web designers{' '}
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                &
              </Text>{' '}
              Full-Stack Developers
            </Heading>
          </Stack>

          {children}
        </Container>
      </Box>
    </section>
  )
}

export default memo(AppLayoutAuth)
