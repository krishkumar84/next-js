import { handleGithubLogin, handleGoogleLogin, login } from '@/lib/action';
import LoginForm from "@/components/loginForm/loginForm";

import React from 'react'
import styles from './login.module.css'

const LoginPage = () => {
  // const session = await auth();
  // console.log(session);
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <form action={handleGithubLogin}>
        <button className={styles.github}>Login with Github</button>
      </form>
      <form action={handleGoogleLogin}>
        <button className="p-4 ">Login with Google</button>
      </form>
      <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage
