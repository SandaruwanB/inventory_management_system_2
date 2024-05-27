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
                <Loader/>
            :
                <>
                    <HomeHeader />
                    <div>Home Page</div>
                    <Input type={'password'} placeholder={"hello"}/>
                </>
        }
    </>
    
  )
}

export default Home