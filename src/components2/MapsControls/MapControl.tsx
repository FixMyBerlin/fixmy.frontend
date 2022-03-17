import React from 'react';
import styled from 'styled-components';

const StyledMapControl = styled.div`
  position: absolute;
  z-index: 600;
`;

export type MapcControlProps = {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
  className?: string;
  style?: React.CSSProperties;
  visible?: boolean;
};

export const MapControl: React.FC<MapcControlProps> = ({
  top = false,
  right = false,
  bottom = false,
  left = false,
  className,
  style,
  visible = true,
  children,
}) => {
  const position: React.CSSProperties = {
    top: top && '16px',
    right: right && '16px',
    bottom: bottom && '16px',
    left: left && '16px',
  };

  if (!visible) return null;

  return (
    <StyledMapControl
      data-cy="map-map-control"
      className={className}
      style={style || position}
    >
      {children}
    </StyledMapControl>
  );
};
