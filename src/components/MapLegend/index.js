import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HBILegend from './HBILegend';
import PlanningLegend from './PlanningLegend';

const MapLegendWrapper = styled.div`
  max-width: 300px;
  margin: 0 auto;
  height: 70px;
`;

class MapLegend extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['hbi', 'plannings'])
  }

  static defaultProps = {
    type: 'hbi'
  }

  getLegendComponent = () => {
    switch (this.props.type) {
      case 'hbi':
        return HBILegend;
      case 'plannings':
        return PlanningLegend;
      default:
        return null;
    }
  }

  render() {
    const LegendComponent = this.getLegendComponent();
    return (
      <MapLegendWrapper>
        <LegendComponent {...this.props} />
      </MapLegendWrapper>
    );
  }
}

export default MapLegend;
