import React from 'react';

const SectionHeader = ({ title, description }) => (
  <div className="sm:flex-auto">
    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
    <p className="mt-2 text-sm text-gray-700">{description}</p>
  </div>
);

export default SectionHeader;
