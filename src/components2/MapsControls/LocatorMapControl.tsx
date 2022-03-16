import React from 'react';
import { LocatorButton, LocatorButtonProps } from './LocatorButton';
import { MapcControlProps, MapControl } from './MapControl';

type Props = MapcControlProps & LocatorButtonProps;

export const LocatorMapControl: React.VFC<Props> = ({
  position = 'top-left',
  customPosition,
  className,
  onChange,
}) => {
  return (
    <MapControl
      position={position}
      customPosition={customPosition}
      className={className}
    >
      <LocatorButton onChange={onChange} />
    </MapControl>
  );
};
