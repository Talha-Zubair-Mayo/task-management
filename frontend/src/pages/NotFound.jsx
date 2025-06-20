import React from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center">
    <h1 className="text-5xl font-bold mb-4 text-indigo-600">404</h1>
    <p className="text-xl mb-6 text-gray-700">Sorry, the page you are looking for does not exist.</p>
    <Link to="/">
      <Button variant="primary">Go Home</Button>
    </Link>
  </div>
);

export default NotFound;
