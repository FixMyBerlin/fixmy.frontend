import React, { PureComponent, Fragment } from 'react';
import idx from 'idx';
import styled from 'styled-components';
import { VictoryPie, VictoryLabel } from 'victory';

import SvgIcon from '~/components/SvgIcon';
import Text from '~/components/Text';

const StyledLabel = styled(Text)`
  text-align: center;
`;

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
  margin-top: -25px;
`;

const ChartTitle = styled.div`
  margin-bottom: 4px;
`;

const ChartSubtitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  font-family: 'Roboto Slab', serif;
  color: ${config.colors.darkbg};
  max-width: 100px;
  display: inline-block;
`;

const chartStyle = {
  labels: {
    fontSize: 14,
    fontWeight: 700,
    fontFamily: '"Open Sans", sans-serif'
  },
  data: {}
};

function sumLengths(planningPhaseName = null) {
  return (res, item) => {
    if (planningPhaseName === null || item.phase === planningPhaseName) {
      let length0 = idx(item, _ => _.planning_sections[0].details[0].length);
      let length1 = idx(item, _ => _.planning_sections[0].details[1].length);

      length0 = length0 ? +length0 : 0;
      length1 = length1 ? +length1 : 0;

      return res + length0 + length1;
    }

    return res;
  };
}

function renderNoData() {
  return (
    <ChartTitle>Keine Planungen vorhanden.</ChartTitle>
  );
}

function getSvgOffsetY(orientation) {
  switch (orientation) {
    case 'top': return -40;
    case 'bottom': return -25;
    case 'left': return -35;
    case 'right': return -35;
    default: return 0;
  }
}

function getSvgOffsetX(textAnchor) {
  switch (textAnchor) {
    case 'start': return 10;
    case 'middle': return 0;
    case 'end': return -20;
    default: return 0;
  }
}

const Label = ({ x, y, dy, ...props }) => {
  const phase = config.planningPhases.find(p => p.name === props.text);
  const offsetX = getSvgOffsetX(props.textAnchor);
  const offsetY = getSvgOffsetY(props.orientation);

  return (
    <g style={{ transform: `translate(${x}px,${y}px)` }}>
      <SvgIcon type={phase.icon.replace('.svg', '')} y={offsetY} x={offsetX} />
      <VictoryLabel {...props} x={0} y={0} dy={0} />
    </g>
  );
};

class PieChart extends PureComponent {
  renderChartLabel() {
    const lengthSum = this.props.data.reduce(sumLengths(), 0);
    return (
      <Fragment>
        <ChartTitle>{this.props.data.length} Planungen</ChartTitle>
        <ChartSubtitle>gesamte Länge: {(lengthSum / 1000).toFixed(0)} km</ChartSubtitle>
      </Fragment>
    );
  }

  render() {
    if (this.props.isLoading) {
      return (
        <PieChartWrapper>
          <StyledLabel bold>Lade Daten ...</StyledLabel>
        </PieChartWrapper>
      );
    }

    const chartData = config.planningPhases.map(planningPhase => ({
      x: planningPhase.name,
      y: this.props.data.reduce(sumLengths(planningPhase.id), 0),
      color: planningPhase.color
    })).filter(d => d.y > 0);

    const hasData = this.props.data.length > 0;
    const colorScale = chartData.map(d => d.color);

    return (
      <PieChartWrapper>
        <VictoryPie
          innerRadius={100}
          radius={130}
          data={chartData}
          colorScale={colorScale}
          style={chartStyle}
          labelComponent={<Label />}
        />
        <ChartInnerLabel>
          {hasData ? this.renderChartLabel() : renderNoData()}
        </ChartInnerLabel>
      </PieChartWrapper>
    );
  }
}



export default PieChart;
