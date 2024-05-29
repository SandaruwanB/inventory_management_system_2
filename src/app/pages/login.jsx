import React, { useEffect } from 'react'

function Login() {

  useEffect(()=>{
    document.title = "Stockify | Sign in";
  });

  return (
    <div className=' h-screen w-full flex justify-center items-center '>
      <div className='text-center'>
        <h1>Sign In</h1>
      </div>
    </div>
  )
}

export default Login