'use client'

// react
import React, { useCallback } from 'react'

// store
import { useAuthStore } from '@/plugins/zustand'

// antd
import { Form, Input } from 'antd'

// components
import { AppBaseButton } from '@/components'

// next router
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)

  const onSave = useCallback(
    async (values: any) => {
      console.log(values)
      setIsAuthenticated(true)
      router.push('/')
    },
    [router, setIsAuthenticated]
  )

  return (
    <div className="flex flex-col">
      <div className="">
        <h1 className="font-bold text-3xl">Join our team</h1>
        <span className="text-base">
          We’re looking for amazing engineers just like you! Become a part of
          our rockstar engineering team and skyrocket your career!
        </span>
      </div>
      <Form
        layout="vertical"
        name="form_login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 26 }}
        onFinish={onSave}
        autoComplete="off"
        requiredMark={false}
        className="!mt-5"
      >
        <Form.Item
          label="Email"
          name="email"
          className="font-semibold"
          rules={[
            { required: true, message: 'Silahkan masukan email!' },
            { type: 'email' }
          ]}
        >
          <Input size="large" placeholder="Email" className="!font-normal" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          className="font-semibold"
          rules={[{ required: true, message: 'Silahkan masukan password!' }]}
        >
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>
        <AppBaseButton block className="bg-black !text-white" htmlType="submit">
          LOGIN
        </AppBaseButton>
      </Form>
    </div>
  )
}

export default Login
