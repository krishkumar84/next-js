import { handleGithubLogin, handleGoogleLogin } from '@/lib/action';

import React from 'react'

const LoginPage = async () => {
  // const session = await auth();
  // console.log(session);
  
  return (
    <div>
      <form action={handleGithubLogin}>
      <button className='p-4 '>Login with Github</button>
      </form>
      <form action={handleGoogleLogin}>
      <button className='p-4 '>Login with Google</button>
      </form>
    </div>
  )
}

export default LoginPage
