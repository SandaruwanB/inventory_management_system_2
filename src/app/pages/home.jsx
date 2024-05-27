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
                    <div className=' grid grid-cols-3 container mx-40'>
                        <div className=' text-blue-950'>Home Page</div>
                        <Input type={'password'} placeholder={"hello"}/>
                    </div>
                </>
        }
    </>
    
  )
}

export default Home