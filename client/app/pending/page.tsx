"use client";
import React, { useEffect, useState } from 'react';

function Pending() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const tokenExists = document.cookie.includes('token=');
    setHasToken(tokenExists);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {hasToken ? (
        <h2>Welcome to gigwork. Approval pending</h2>
      ) : (
        <h2>Page not found</h2>
      )}
    </div>
  );
}

export default Pending;