import React from 'react';

const EmptyState = ({ message = 'No data available.' }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2m-6 4h6a2 2 0 002-2v-5a2 2 0 00-2-2H7a2 2 0 00-2 2v5a2 2 0 002 2z" />
    </svg>
    <p className="text-gray-500 text-lg">{message}</p>
  </div>
);

export default EmptyState;
