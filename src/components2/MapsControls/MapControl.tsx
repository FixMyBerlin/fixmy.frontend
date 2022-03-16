import React from 'react';
import styled from 'styled-components';

export type MapControlPositionProp =
  | 'top-left'
  | 'top-right'
  | 'bottom-right'
  | 'bottom-left';

const StyledMapControl = styled.div`
  position: absolute;
  z-index: 600;
  top: ${(props: CustonPosition) => props?.top};
  right: ${(props: CustonPosition) => props?.right};
  bottom: ${(props: CustonPosition) => props?.bottom};
  left: ${(props: CustonPosition) => props?.left};
`;

type CustonPosition = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export type MapcControlProps = {
  position?: MapControlPositionProp;
  className?: string;
  customPosition?: CustonPosition;
};

export const MapControl: React.FC<MapcControlProps> = ({
  position = 'top-left',
  className,
  customPosition,
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

  return (
    <StyledMapControl
      data-cy="map-map-control"
      className={className}
      {...(customPosition || positionCss(position))}
    >
      {children}
    </StyledMapControl>
  );
};
