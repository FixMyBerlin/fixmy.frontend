import React from 'react';
import styled from 'styled-components';

const StyledMapControl = styled.div`
  position: absolute;
  z-index: 600;
`;

export type MapcControlProps = {
  position?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
  className?: string;
  style?: React.CSSProperties;
  visible?: boolean;
};

export const MapControl: React.FC<MapcControlProps> = ({
  position = 'top-left',
  className,
  style,
  visible = true,
  children,
}) => {
  const positionCss = (pos) => {
    switch (pos) {
      case 'top-left':
        return {
          top: '16px',
          left: '16px',
        };
      case 'top-right':
        return {
          top: '16px',
          right: '16px',
        };
      case 'bottom-right':
        return {
          right: '16px',
          bottom: '16px',
        };
      case 'bottom-left':
        return {
          bottom: '16px',
          left: '16px',
        };
      default:
        return {};
    }
  };

  if (!visible) return null;

  return (
    <StyledMapControl
      data-cy="map-map-control"
      className={className}
      style={style || positionCss(position)}
    >
      {children}
    </StyledMapControl>
  );
};
