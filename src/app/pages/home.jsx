import React, { useState } from 'react'
import Loader from '../components/loader';

function Home() {
    const [state, setState] = useState(true);

  return (
    <>
        <Loader />
    </>
    
  )
}

export default Home