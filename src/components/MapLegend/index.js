import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { media } from '~/style-utils';
import HBILegend from './HBILegend';
import PlanningLegend from './PlanningLegend';

const LegendWrapper = styled.div`
  display: none;

  ${media.m`
    display: flex;
    justify-content: center;
  `}
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
        <LegendComponent {...this.props} />
      </LegendWrapper>
    );
  }
}

export default MapLegend;
