import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { orientation, media } from '~/styles/utils';

import HBILegend from './HBILegend';
import PlanningLegend from './PlanningLegend';
// import Brace from '~/apps/Map/components/Brace';

let embedModeActive;

function getEmbedStatus() {
  if (embedModeActive) {
    return 'red 5px solid';
  }

  return 'blue 5px solid';
}

const MapLegendWrapper = styled.div`
  max-width: 300px;
  height: 70px;
  margin: 0 auto;
  border: ${getEmbedStatus};

  ${media.s`
    order: 1;
  `}

  ${media.m`
    min-width: 300px;
  `}

  ${orientation.landscape`
    display: none;
    `};
`;

/* const BraceWrapper = styled.div`
  ${orientation.landscape`
    display: none;
  `}
`; */

class MapSelectorBar extends PureComponent {
  getLegendComponent = () => {
    switch (this.props.type) {
      case 'hbi':
        return HBILegend;
      case 'plannings':
        return PlanningLegend;
      default:
        return null;
    }
  };

  render() {
    embedModeActive = this.props.isEmbedMode;
    const LegendComponent = this.getLegendComponent();
    return (
      <MapLegendWrapper>
        <LegendComponent {...this.props} />
      </MapLegendWrapper>
    );
  }
}

MapSelectorBar.propTypes = {
  type: PropTypes.oneOf(['hbi', 'plannings']),
  isEmbedMode: PropTypes.bool,
};

MapSelectorBar.defaultProps = {
  type: 'hbi',
  isEmbedMode: false,
};

export default MapSelectorBar;
