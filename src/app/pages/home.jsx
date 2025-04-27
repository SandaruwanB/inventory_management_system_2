import React, { useEffect, useState } from 'react'
import Loader from '../components/loader';
import HomeHeader from '../layouts/homeHeader';

function Home() {
    const [loadingState, setLoadingState] = useState(true);

    document.title = "New Invent Technolgies | Home";

    useEffect(()=>{        
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
                    <main className='w-full min-h-screen md:h-screen bg-gradient-to-br from-green-950 to-blue-950'>
                        <div className=' max-w-screen-2xl h-full mx-auto p-3'>
                            <div className='flex lg:flex-row flex-col lg:justify-center h-full'>
                                <div className='lg:order-2 order-1 lg:basis-5/12 basis-12'>
                                    <div className='flex items-center h-full justify-center lg:mt-0 mt-12'>
                                        <img src="assets/images/landingImg.png" alt="test" />
                                    </div>                                        
                                </div>
                                <div className='lg:order-1 order-2 lg:basis-7/12 basis-12 lg:mt-0 mt-12'>
                                    <div className='flex flex-col h-full justify-center'>
                                        <h1 className='text-gray-100 font-extrabold lg:leading-[62px] lg:text-left text-center tracking-wide text-[1.5rem] lg:text-[3.8rem] ft-lato'>Better Solution For Your Business</h1>
                                        <h3 className=' text-sky-200 font-normal lg:text-left text-center tracking-wide text-[.8rem lg:text-[1rem] mt-5'>Stockify streamlines sales and inventory management, ensuring efficiency and accuracy. Optimize your business with powerful tools to track, analyze, and grow your operations effortlessly.</h3>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </main>
                </>
        }
    </>
    
  )
}

export default Home