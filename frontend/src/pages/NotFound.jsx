import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="section text-center">
    <h1 className="heading-lg mb-4">404</h1>
    <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn-primary inline-flex">Back to Home</Link>
  </div>
);

export default NotFound;
