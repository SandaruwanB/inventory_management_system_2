import React, { useEffect, useState } from 'react'
import Loader from '../components/loader';
import HomeHeader from '../layouts/homeHeader';
import { Icon } from '@iconify/react';

function Home() {
    const [loadingState, setLoadingState] = useState(true);
    const [isPasswordField, setIsPasswordField] = useState(true);

    useEffect(()=>{
        document.title = "Stockify | Home";
        setTimeout(()=>{
            setLoadingState(false);
        },2000);
    }, [loadingState])

  return (
    <>
        {
            loadingState ?
                <Loader color={"rgb(23,37,84)"}/>
            :
                <>
                    <HomeHeader />
                    <section className='p-4 min-h-screen bg-blue-950'>  
                        <h1>daskhjdhaj</h1>                
                    </section>
                </>
        }
    </>
    
  )
}

export default Home