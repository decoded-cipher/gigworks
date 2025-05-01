'use client'

import Lottie from 'lottie-react'
import loadingAnimation from '../../public/assets/loader/Animation - 1746022897581.json'
// Alternatively if in public folder:
// import { useMemo } from 'react'

export default function Loading() {
  // If loading from public folder instead of importing:
  // const loadingAnimation = useMemo(() => {
  //   return { animationData: '/animations/loading-animation.json' }
  // }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            autoplay={true}
          />
        </div>
        <p className="mt-4 text-gray-600">Loading business profile...</p>
      </div>
    </div>
  );
}