import React from 'react'
import Link from 'next/link'
import Links from './links/Links'

function Navbar() {
  return (
    <div className='h-20 flex items-center justify-between'>
      <Link href="/" className="font-bold text-2xl">Logo</Link>
      <div className="">
        <Links/>
      </div>
    </div>
  )
}

export default Navbar
