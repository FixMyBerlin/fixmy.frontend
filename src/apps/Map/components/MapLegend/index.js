import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Brace from '~/apps/Map/components/Brace';
import { orientation } from '~/styles/utils';

import HBILegend from './HBILegend';
import PlanningLegend from './PlanningLegend';

const MapLegendWrapper = styled.div`
  max-width: 300px;
  margin: 0 auto;
  height: 70px;

  ${orientation.landscape`
    display: none;
    `}
`;

const BraceWrapper = styled.div`
  ${orientation.landscape`
    display: none;
  `}
`;

class MapLegend extends PureComponent {
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

MapLegend.propTypes = {
  type: PropTypes.oneOf(['hbi', 'plannings']),
  isEmbedMode: PropTypes.bool,
};

MapLegend.defaultProps = {
  type: 'hbi',
  isEmbedMode: false,
};

export default MapLegend;
