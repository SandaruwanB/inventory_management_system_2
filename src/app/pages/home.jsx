import React, { useEffect, useState } from 'react'
import Loader from '../components/loader';
import HomeHeader from '../layouts/homeHeader';

function Home() {
    const [loadingState, setLoadingState] = useState(true);

    useEffect(()=>{
        document.title = "Stockify | Home";
        setTimeout(()=>{
            setLoadingState(false);
        },2000);
    })

  return (
    <>
        {
            loadingState ?
                <Loader color={"rgb(23,37,84)"}/>
            :
                <>
                    <HomeHeader />
                    <div className='flex md:flex-row flex-col h-screen'>
                        <div className='md:basis-7/12 h-full'>
                            <div className='h-full flex text-center justify-center items-center'>
                                <span>hello world</span>
                            </div>
                        </div>
                        <div className='md:basis-5/12 h-full bg-cyan-700'>
                            <div className='h-full flex md:justify-start justify-center items-center p-4'>
                                <div className='w-auto md:w-4/5 flex flex-col'>
                                    <h2 className='text-center text-white text-3xl font-bold'>Sign In</h2>
                                    <input type="text" placeholder='Email' className='mt-12 w-full' />
                                </div>                                
                            </div>
                        </div>
                    </div>
                </>
        }
    </>
    
  )
}

export default Home