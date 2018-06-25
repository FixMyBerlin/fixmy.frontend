import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import HBILegend from './HBILegend';
import PlanningLegend from './PlanningLegend';

const LegendWrapper = styled.div`
  display: flex;
  justify-content: center;
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
      <LegendWrapper>
        <LegendComponent />
      </LegendWrapper>
    );
  }
}

export default MapLegend;
