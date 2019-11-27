import React from 'react';
import styled from 'styled-components';

import PedelecIcon from '~/images/strassencheck/icons/icon-transportation-1.svg';
import BikeIcon from '~/images/strassencheck/icons/icon-transportation-2.svg';
import PublicIcon from '~/images/strassencheck/icons/icon-transportation-3.svg';
import CarIcon from '~/images/strassencheck/icons/icon-transportation-4.svg';

const IconBar = styled.div`
  display: flex;
  color: white;
`;

const IconItem = styled.div`
  width: 40px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  path,
  rect,
  circle {
    stroke: white;
  }
`;

const IconLabel = styled.div`
  font-size: 14px;
`;

const icons = [
  {
    icon: PedelecIcon,
    label: 'Fuß'
  },
  {
    icon: BikeIcon,
    label: 'Fahrrad'
  },
  {
    icon: CarIcon,
    label: 'Auto'
  },
  {
    icon: PublicIcon,
    label: 'Öffis'
  }
];

export default () => (
  <IconBar>
    {icons.map((icon) => {
      const IconComponent = icon.icon;
      return (
        <IconItem key={icon.label}>
          <IconComponent />
          <IconLabel>{icon.label}</IconLabel>
        </IconItem>
      );
    })}
  </IconBar>
);
