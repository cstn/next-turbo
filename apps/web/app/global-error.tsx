'use client';

import Error from 'next/error';
import { useEffect } from 'react';

const GlobalError = ({ error, reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    console.error('Global error', error);
  }, [ error ]);

  return (
    <html>
    <body>
    <div className="container mx-auto my-4 p-2">
      <h1>Sorry</h1>
      <h2>Not available</h2>
      <p>This service is not available at the moment.</p>
      <div className="flex mt-4 gap-4">
        <button onClick={() => reset()}>Please try again later</button>
      </div>
    </div>
    </body>
    </html>
  );
};

export default GlobalError;
