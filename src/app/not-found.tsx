import Link from 'next/link'
import React from 'react'

function notFound() {
  return (
    <div>
      <h1>not found</h1>
      <p>something wrong happen</p>
      <Link href='/'>Return home</Link>
    </div>
  )
}

export default notFound
