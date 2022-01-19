import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Brace from '~/apps/Map/components/Brace';
import { orientation, media } from '~/styles/utils';

import HBILegend from './HBILegend';
import PlanningLegend from './PlanningLegend';

let embedModeActive;

function getEmbedStatus() {
  if (embedModeActive) {
    return '0';
  }

  return '0 auto';
}

const MapLegendWrapper = styled.div`
  max-width: 300px;
  height: 70px;
  margin: ${getEmbedStatus};

  ${media.s`
    order: 2;
    `}

  ${media.m`
    margin: auto 0;
    min-width: 300px;
  `}

  ${orientation.landscape`
    display: none;
    `};
`;

const BraceWrapper = styled.div`
  ${media.m`
    order: 1
  `}

  ${orientation.landscape`
    display: none;
  `}
`;

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
      <>
        <MapLegendWrapper>
          <LegendComponent {...this.props} />
        </MapLegendWrapper>
        {!this.props.isEmbedMode && (
          <BraceWrapper>
            <Brace type={this.props.type === 'hbi' ? 'zustand' : 'planung'} />
          </BraceWrapper>
        )}
      </>
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
