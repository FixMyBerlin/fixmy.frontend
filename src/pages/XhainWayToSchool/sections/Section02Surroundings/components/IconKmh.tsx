import React from 'react';

export const IconKmh: React.FC<{ fill: `#${any}` }> = ({ fill }) => (
  <svg
    height="4"
    viewBox="0 0 24 4"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      d="m24 0v0h-24v"
      stroke={fill}
      strokeDasharray="4 2"
      strokeWidth="5"
    />
  </svg>
);
