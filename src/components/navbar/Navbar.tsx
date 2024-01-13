import React from 'react'
import Link from 'next/link'
import Links from './links/Links'
import { auth } from '@/lib/auth';

const Navbar = async () =>  {
  const session = await auth();
  console.log(session);

  return (
    <div className='h-20 flex items-center justify-between'>
      <Link href="/" className="font-bold text-2xl">Logo</Link>
      <div className="">
        <Links session={session} />
      </div>
    </div>
  )
}

export default Navbar
