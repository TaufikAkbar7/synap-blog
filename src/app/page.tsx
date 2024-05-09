// react
import React from 'react'

// components
import { AppLayoutDefault } from '@/components'

type Person = {
  id: number
  username: string
  age: number
}

export default function Home() {
  return (
    <AppLayoutDefault>
      <div className="shadow-lg rounded-lg bg-white p-5">
        <span>View a summary of all your customers over the last month.</span>
        {/* <Table className="mt-5" dataSource={defaultData} columns={columns} /> */}
      </div>
    </AppLayoutDefault>
  )
}
