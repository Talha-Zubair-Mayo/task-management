import React from 'react';
import Button from './Button';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center">
    <h1 className="text-3xl font-bold mb-4 text-red-600">Something went wrong.</h1>
    <p className="text-lg mb-6 text-gray-700">{error?.message || 'An unexpected error occurred.'}</p>
    {resetErrorBoundary && (
      <Button variant="primary" onClick={resetErrorBoundary}>
        Try Again
      </Button>
    )}
  </div>
);

export default ErrorFallback;
