import React from 'react';

const TableHeader = ({ columns }) => (
  <thead className="bg-gray-50">
    <tr>
      {columns.map((col) => (
        <th
          key={col.key || col}
          scope="col"
          className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
        >
          {col.label || col}
        </th>
      ))}
      <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
        <span className="sr-only">Actions</span>
      </th>
    </tr>
  </thead>
);

export default TableHeader;
