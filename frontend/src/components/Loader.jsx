import React from 'react';

const Loader = ({ label = 'Loading...' }) => (
  <div className="flex items-center justify-center py-20">
    <div className="w-10 h-10 border-4 border-ignitron-orange border-t-transparent rounded-full animate-spin" />
    <span className="ml-3 text-gray-500">{label}</span>
  </div>
);

export default Loader;
