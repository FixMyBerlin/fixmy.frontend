import React from 'react';

export const IconKmh: React.FC<{ fill: `#${any}` }> = ({ fill }) => (
  <svg viewBox="0 0 24 3" xmlns="http://www.w3.org/2000/svg">
    <g fill={fill}>
      <path d="m0 0h4v3h-4z" />
      <path d="m20 0h4v3h-4z" />
      <path d="m6.67 0h4v3h-4z" />
      <path d="m13.33 0h4v3h-4z" />
    </g>
  </svg>
);
