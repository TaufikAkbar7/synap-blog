// react
import React from 'react'

// antd
import { Table } from 'antd'

// components
import { AppLayoutDefault } from '@/components'

type Person = {
  id: number
  username: string
  age: number
}

const defaultData: Person[] = [
  {
    id: 1,
    username: 'tanner',
    age: 24
  },
  {
    id: 2,
    username: 'tandy',
    age: 40
  },
  {
    id: 3,
    username: 'joe',
    age: 45
  }
]

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 1
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 2
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 3
  }
]

export default function Home() {
  return (
    <AppLayoutDefault>
      <div className="shadow-lg rounded-lg bg-white p-5">
        <span>View a summary of all your customers over the last month.</span>
        <Table className="mt-5" dataSource={defaultData} columns={columns} />
      </div>
    </AppLayoutDefault>
  )
}
