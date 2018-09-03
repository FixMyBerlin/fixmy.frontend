import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { VictoryPie } from 'victory';

import Label from '~/components/Label';

const PieChartWrapper = styled.div`
  width: 300px;
  margin: 0 auto;
  position: relative;
`;

const ChartInnerLabel = styled.div`
  position: absolute;
  pointer-events: none;
  top: 50%;
  left: 0%;
  width: 100%;
  text-align: center;
  line-height: 1;
  margin-top: -10px;
`;

const chartStyle = {
  labels: {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: '"Open Sans", sans-serif'
  }
};

class PieChart extends PureComponent {
  render() {
    if (this.props.isLoading) {
      return <Label>Lade Daten ...</Label>;
    }

    const chartData = config.planningPhases.map(planningPhase => ({
      x: planningPhase.name,
      y: this.props.data.filter(d => d.phase === planningPhase.id).length,
      color: planningPhase.color
    })).filter(d => d.y > 0);

    const colorScale = chartData.map(d => d.color);

    return (
      <PieChartWrapper>
        <VictoryPie
          innerRadius={80}
          radius={120}
          data={chartData}
          colorScale={colorScale}
          style={chartStyle}
        />
        <ChartInnerLabel>{this.props.data.length} Planungen</ChartInnerLabel>
      </PieChartWrapper>
    );
  }
}

export default PieChart;
