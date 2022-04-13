import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Brace from '~/apps/Map/components/Brace';
import { orientation, media } from '~/styles/utils';

import HBILegend from './HBILegend';
import PlanningLegend from './PlanningLegend';

const MapLegendWrapper = styled.div`
  max-width: 300px;
  height: 70px;
  margin: ${(props) => (props.embedMode ? 'auto' : '0 auto')};

  ${media.s`
    order: 2;
  `}

  ${media.m`
  margin: ${(props) => (props.embedMode ? 'auto' : 'auto 0')};
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
    const LegendComponent = this.getLegendComponent();
    return (
      <>
        <MapLegendWrapper embedMode={this.props.isEmbedMode}>
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
