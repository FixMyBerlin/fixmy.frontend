import React from 'react';

type Props = {
  color?: string;
  width?: number;
  size?: number;
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray#example
  strokeDasharray?: string;
};

export const IconLegendLine = ({
  color = 'black',
  width = 1,
  size = 24,
  strokeDasharray,
}: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${size} ${size}`}>
      <line
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        stroke={color}
        strokeWidth={width}
        strokeDasharray={strokeDasharray}
      />
    </svg>
  );
};
