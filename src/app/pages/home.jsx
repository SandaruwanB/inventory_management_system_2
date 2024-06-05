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
    }, [loadingState])



  return (
    <>
        {
            loadingState ?
                <Loader color={"rgb(23,37,84)"}/>
            :
                <>
                    <main className='w-full h-screen bg-blue-950'>
                        <div className='max-w-screen-xl mx-auto p-3'>
                            <HomeHeader />
                            <div className='h-full w-full flex-col xl:flex-col'>
                                <div className='basis-1 xl:basis-7/12 xl:order-1 order-2 h-full'>
                                    sdfads
                                </div>
                                <div className='basis-1 xl:basis-5/12 xl:order-2 order-1'>
                                    skjldkj
                                </div>
                            </div>
                        </div>
                    </main>
                    

                    {/*<section className='w-full bg-blue-950'>  
                    <HomeHeader />
                        <div className='min-h-[800px] max-w-screen-xl mx-auto p-3'>
                            <div className='h-full flex xl:flex-row flex-col'>
                                <div className='basis-1 xl:basis-7/12 xl:order-1 order-2 h-full'>
                                    <div className='h-full flex flex-col justify-center'>
                                        <h1 className='text-gray-100 font-extrabold tracking-wide text-[1.5rem] lg:text-[3.5rem] ft-lato'>Better Solution For Your Business</h1>
                                        <h3>Stockify gives you to manage your sales and inventory efficiently</h3>
                                    </div>
                                </div>
                                <div className='basis-1 xl:basis-5/12 xl:order-2 order-1'>
                                        <img src="assets/background.jpg" alt="test" />
                                </div>
                            </div>
                        </div>             
                    </section>*/}
                </>
        }
    </>
    
  )
}

export default Home