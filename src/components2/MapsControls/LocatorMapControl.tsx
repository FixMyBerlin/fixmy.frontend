import React from 'react';
import { LocatorButton, LocatorButtonProps } from './LocatorButton';
import { MapcControlProps, MapControl } from './MapControl';

type Props = Pick<MapcControlProps, 'className' | 'style'> & LocatorButtonProps;

export const LocatorMapControl: React.FC<Props> = ({
  className,
  style,
  onChange,
}) => {
  return (
    <MapControl style={style} className={className}>
      <LocatorButton onChange={onChange} />
    </MapControl>
  );
};
