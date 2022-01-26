import React from 'react';
import {
  IconWrapper,
  LegendHeader,
  LegendItem,
  LegendItems,
} from '~/components2/Article/Map/MapLegendStyledComponents';

type Props = { onClick?: () => void };

export const LegendItemsNetworkSchoolways: React.FC<Props> = ({ onClick }) => {
  return (
    <>
      <LegendHeader onClick={onClick} style={onClick && { cursor: 'pointer' }}>
        Schulwege-Häufigkeit
      </LegendHeader>
      <LegendItems>
        <LegendItem>
          <IconWrapper>{/* <IconQ1 /> */}</IconWrapper> mehr als 300 Schulwege
        </LegendItem>
        <LegendItem>
          <IconWrapper>{/* <IconQ2 /> */}</IconWrapper> mehr als 200 Schulwege
        </LegendItem>
        <LegendItem>
          <IconWrapper>{/* <IconQ3 /> */}</IconWrapper> mehr als 100 Schulwege
        </LegendItem>
      </LegendItems>
    </>
  );
};
