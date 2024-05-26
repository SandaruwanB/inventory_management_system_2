import React, { useEffect, useState } from 'react'
import Loader from '../components/loader';

function Home() {
    const [state, setState] = useState(true);

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setState(false);
        },2000);
    })

  return (
    <>
        {
            state ?
                <Loader/>
            :
                <div>Home Page</div>
        }
    </>
    
  )
}

export default Home