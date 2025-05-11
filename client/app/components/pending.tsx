"use client";
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react'
import loadingAnimation from '../../public/assets/loader/Animation - 1746022897581.json'

function Pending() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const tokenExists = document.cookie.includes('token=');
    setHasToken(tokenExists);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {hasToken ? (
        <div className="w-auto h-1/2">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
        />
        <h2 className='text-center'>Welcome to gigwork. Approval pending</h2>
      </div>
      ) : (
        <div className="w-auto h-1/2">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            autoplay={true}
          />
        <h2 className='text-center'>Page not found</h2>
        </div>
      )}
    </div>
  );
}

export default Pending;