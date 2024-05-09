'use client'

import { AppLayoutDefault } from '@/components'
import AppBaseTable from '@/components/app/base/AppBaseTable'
import { Card, CardBody, Center, Link, Text } from '@chakra-ui/react'
import { createColumnHelper, Row } from '@tanstack/react-table'

type Person = {
  id: number
  username: string
  age: number
}

export default function Home() {
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

  const columnHelper = createColumnHelper<Person>()

  const columns = [
    columnHelper.accessor('id', {
      cell: info => info.getValue()
    }),
    columnHelper.accessor<'username', string>('username', {
      cell: info => info.getValue()
    }),
    columnHelper.accessor<'age', number>('age', {
      header: () => 'Age',
      cell: info => info.renderValue()
    }),
    {
      id: 'actions',
      header: () => 'Actions',
      cell: ({ row }: { row: Row<Person> }) => (
        <Link href={`/profile/${row.getValue('id')}`} color="teal">
          Visit
        </Link>
      )
    }
  ]
  return (
    <AppLayoutDefault>
      <Card>
        <CardBody>
          <Text marginBottom={5}>
            View a summary of all your customers over the last month.
          </Text>
          <AppBaseTable data={defaultData} columns={columns} />
        </CardBody>
      </Card>
    </AppLayoutDefault>
  )
}
