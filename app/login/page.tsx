'use client'

import React, { useCallback, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { LoginSchema } from '@/plugins/yup'
import { GrFormViewHide, GrFormView } from 'react-icons/gr'
import { useAuthStore } from '@/plugins/zustand'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [show, setShow] = useState(false)
  const handleClick = useCallback(() => setShow(!show), [setShow, show])
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)
  const router = useRouter()

  const onSubmit = useCallback(() => {
    setIsAuthenticated(true)
    router.push('/')
  }, [setIsAuthenticated, router])

  return (
    <Stack
      bg={'gray.200'}
      rounded={'xl'}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: 'lg' }}
    >
      <Stack spacing={4}>
        <Heading
          color={'gray.800'}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          Join our team
          <Text
            as={'span'}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
          >
            !
          </Text>
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          We’re looking for amazing engineers just like you! Become a part of
          our rockstar engineering team and skyrocket your career!
        </Text>
      </Stack>
      <Box mt={10}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={onSubmit}
          validationSchema={LoginSchema}
        >
          {() => (
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input
                      {...field}
                      placeholder="your_email"
                      bg={'gray.100'}
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                    mt={5}
                  >
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        {...field}
                        placeholder="passoword"
                        bg={'gray.100'}
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                      />
                      <InputRightElement width="4.5rem">
                        <Icon
                          as={show ? GrFormView : GrFormViewHide}
                          w={6}
                          h={6}
                          cursor="pointer"
                          onClick={handleClick}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.400,pink.400)',
                  boxShadow: 'xl'
                }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Stack>
  )
}
