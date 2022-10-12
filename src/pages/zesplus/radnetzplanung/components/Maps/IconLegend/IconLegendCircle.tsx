import React from 'react';

type Props = {
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  size?: number;
};

export const IconLegendCircle = ({
  color = 'black',
  borderColor = 'gray',
  borderWidth = 0.5,
  size = 22,
}: Props) => {
  const radius = size / 2 - borderWidth;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        fill={color}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
    </svg>
  );
};
