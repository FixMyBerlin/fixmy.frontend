import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { orientation } from '~/styles/utils';
import Brace from '~/pages/Map/components/Brace';

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
  static propTypes = {
    type: PropTypes.oneOf(['hbi', 'plannings'])
  };

  static defaultProps = {
    type: 'hbi'
  };

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

export default MapLegend;
