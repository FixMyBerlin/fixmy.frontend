import React from 'react';
import debug from 'debug';

import Label from '~/components2/Label';

import {
  BigLabel,
  CloseButton,
  Container,
  Header,
  StyledPinIcon,
} from './MapPopupComponents';

const logger = debug('fmc:components:MapPopup');

function formatAddressString(address: string) {
  return address
    .replace('Berlin', '')
    .replace(/\b\d{5}\b/g, '')
    .replace(',', '')
    .trim();
}

function renderName(data: MapPopupData): string {
  if (data.name) return data.name;
  if (data.address) return formatAddressString(data.address);
  if (data.street_name) return data.street_name;
  return 'Abschnitt';
}

type MapPopupData = {
  name?: string;
  address?: string;
  isIntersection?: string;
  borough: string;
  // eslint-disable-next-line
  street_name?: string;
};

type Props = {
  className?: string;
  x: number;
  y: number;
  onClose: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => any;
  onClick: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => any;
  showSubline?: boolean;
  data: MapPopupData;
  children: React.ReactNode;
  icon?: React.ReactNode;
};

/**
 * Map popup component with responsive variation
 */
const MapPopup = ({
  className,
  children,
  data,
  onClick = () => logger('unhandled MapPopup click event'),
  onClose = () => logger('unhandled MapPopup close event'),
  showSubline = true,
  x = 0,
  y = 0,
  icon,
}: Props) => (
  <Container x={x} y={y} data-cy="map-popup-wrapper" className={className}>
    <CloseButton onClick={onClose} data-cy="map-popup-close-button" />
    <Header onClick={onClick}>
      {icon || <StyledPinIcon />}
      <BigLabel uppercase data-cy="map-popup-address">
        {renderName(data)}
      </BigLabel>
      {showSubline && data?.borough && (
        <Label light data-cy="map-popup-borough">
          {data.borough}
        </Label>
      )}
    </Header>
    {children}
  </Container>
);

export default MapPopup;
