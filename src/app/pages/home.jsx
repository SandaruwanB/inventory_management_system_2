import React, { useEffect, useState } from 'react'
import Loader from '../components/loader';
import HomeHeader from '../layouts/homeHeader';
import Input from '../components/input';

function Home() {
    const [loadingState, setLoadingState] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setLoadingState(false);
        },3000);
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
                        <div className='basis-7/12 h-full'>
                            <div className='h-full flex text-center justify-center items-center'>
                                <span>hello world</span>
                            </div>
                        </div>
                        <div className=' basis-5/12 h-full bg-cyan-700'>
                            
                        </div>
                    </div>
                </>
        }
    </>
    
  )
}

export default Home