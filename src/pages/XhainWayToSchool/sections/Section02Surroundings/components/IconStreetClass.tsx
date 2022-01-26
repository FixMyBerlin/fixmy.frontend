import React from 'react';

export const IconStreetClass: React.FC<{ fill: `#${any}` }> = ({ fill }) => (
  <svg
    width="24"
    height="5"
    viewBox="0 0 24 5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m24 .5v4h-24v-4z" fill={fill} fillOpacity=".5" />
  </svg>
);
