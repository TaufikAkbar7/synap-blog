// react
import React from 'react'

// next link
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col gap-y-5 justify-center items-center">
      <h2 className="text-4xl">404</h2>
      <div className="flex flex-col items-center">
        <p>Soory, we can&apos;t find the page you&apos;r looking for</p>
        <Link href="/" className="underline p-1">
          Return Home
        </Link>
      </div>
    </div>
  )
}
