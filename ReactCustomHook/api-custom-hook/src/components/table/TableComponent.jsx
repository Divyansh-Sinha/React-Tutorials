// TableComponent.js

import React from 'react';

const TableComponent = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const flattenObject = (obj) => {
    return Object.keys(obj).map((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        return flattenObject(obj[key]).map((nestedKey) => `${key}.${nestedKey}`);
      }
      return key;
    }).flat();
  };

  const columns = flattenObject(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>
                {/* Handle nested objects by recursively accessing properties */}
                {String(column.split('.').reduce((obj, key) => obj && obj[key], row))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
