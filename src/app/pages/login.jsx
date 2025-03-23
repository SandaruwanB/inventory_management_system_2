import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiConfig } from '../../apiConfig';


function Login() {
  const [isPassword, setIsPassword] = useState(true);
  const [email,setEmail] = useState("");
  const [password,setPasword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [emailErrMsg, setEmailErrorMsg] = useState("");
  const [passErrorMsg, setPassErrorMsg] = useState("");
  const navigate = useNavigate(); 

  document.title = "Stockify | Sign in";

  const forgetPassword = ()=>{
    console.log("forget password");
  }

  const handleLogin = ()=>{
    if(email === "" && password === ""){
      setEmailErrorMsg("This field is required");
      setPassErrorMsg("This field is required");
      setEmailError(true);
      setPassError(true);
    }
    else if (email === ""){
      setEmailErrorMsg("This field is required");
      setEmailError(true);
      setPassError(false);
    }
    else if (password === ""){
      setPassErrorMsg("This field is required");
      setEmailError(false);
      setPassError(true);
    }
    else{
      setEmailError(false);
      setPassError(false);
      axios.post(`${apiConfig.url}/auth/token`, {
        'username' : email,
        'password' : password
      }).then(result=>{
        sessionStorage.setItem('session', result.data);
        navigate('/user/dashboard');
      }).catch((err)=>{
        setPasword("");
        setEmailErrorMsg("Invalid credentials.");
        setEmailError(true);        
      })
    }   
  }

  return (
    <div className='p-3 h-screen w-full flex justify-center items-center bg-gradient-to-br from-green-950 to-blue-950'>
      <div className='p-5 border-2 bg-cyan-50 border-sky-200 rounded-xl'>
        <div className='text-center mt-10'>
          <a href="/" className='uppercase text-4xl font-bold text-sky-950 hover-animated-text'>Stockify</a>
        </div>
        <div className='text-center mt-10'>
          <h1 className='font-semibold text-sky-800 md:text-3xl text-xl'>Sign In</h1>
          <p className='text-sky-900 font-normal'>Hello welcome back. please login to use the system.</p>
        </div>
        <div className=' mt-14'>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Icon icon={'solar:user-bold'} width={24} height={24} className='text-cyan-950' />
            </div>
            <input type="text" className={`block w-full p-3 ps-10 text-sm text-cyan-950 border-2 ${emailError ? 'border-red-500' : 'border-cyan-950' } rounded-lg bg-transparent outline-none`} placeholder="Email Address" onChange={(e)=>{setEmail(e.target.value); setEmailError(false)}} />
            
          </div>
          {
              emailError ? 
              <p className='text-center text-red-500 text-sm'>{emailErrMsg}</p> : ""
          }
        </div>
        <div className='mt-7'>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Icon icon={'material-symbols:lock'} width={24} height={24} className='text-cyan-950' />
            </div>
            <input value={password} type={isPassword ? 'password' : 'text'} className={`block w-full p-3 ps-10 text-sm text-cyan-950 border-2 ${passError ? 'border-red-500' : 'border-cyan-950'} rounded-lg bg-transparent outline-none" placeholder="Password`}  onChange={(e)=>{setPasword(e.target.value); setPassError(false)}} placeholder='Password'/>
            {
              isPassword ?
              <div className="absolute inset-y-0 end-2 flex items-center ps-3 cursor-pointer">
                <Icon icon={'tabler:eye-filled'} width={24} height={24} className='text-cyan-950' onClick={()=>setIsPassword(!isPassword)} />
              </div>
              :
              <div className="absolute inset-y-0 end-2 flex items-center ps-3 cursor-pointer">
                <Icon icon={'eva:eye-off-fill'} width={24} height={24} className='text-cyan-950' onClick={()=>setIsPassword(!isPassword)} />
              </div>
            }
          </div>
          {
              passError ? 
              <p className='text-center text-red-500 text-sm'>{passErrorMsg}</p>
              : ""
          }
        </div>
        <div className='text-right mt-1'>
            <span className=' text-cyan-950 mr-3 hover:underline cursor-pointer' onClick={()=>forgetPassword()}>Forgot Password?</span>
        </div>
        <div className='mt-10 flex justify-center pb-10'>
            <button type='button' onClick={()=>handleLogin()} className='rounded-lg bg-cyan-950 text-white py-2 px-7 border-2 text-lg font-semibold border-cyan-950 hover:bg-transparent hover:text-cyan-900 transition delay-150'>
              Sign In
            </button>
        </div>
      </div>
    </div>
  )
}

export default Login