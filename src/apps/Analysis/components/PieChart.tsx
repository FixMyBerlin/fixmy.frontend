import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { VictoryPie, VictoryLabel, Slice, VictoryLabelProps } from 'victory';

import config from '~/config';
import { setPhaseFilter } from '~/apps/Analysis/AnalysisState';

import { numberFormat, getRVALength } from '~/utils/utils';
import SvgIcon from '~/components/SvgIcon';
import DotLoader from '~/components/DotLoader';
import { PLANNING_PHASES } from '~/apps/Map/constants';

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
  font-family: '${config.titleFont}', serif;
  color: ${config.colors.darkbg};
  max-width: 100px;
  display: inline-block;
`;

const chartStyle = {
  labels: {
    fontSize: 14,
    fontWeight: 700,
    fontFamily: '"Open Sans", sans-serif',
  },
  data: {},
};

/**
 * Return the summed length of projects in an array, optionally filtered by phase
 *
 * @param {Array<Object>} projects Project objects with `length` field
 * @param {String} phase Name of the phase to filter for or `null` for all
 */
const lengthByPhase = (projects: any[], phase: string) => {
  let rvaLength;
  return projects.reduce((acc, cur) => {
    rvaLength = 0;
    if (phase == null || cur.phase === phase) {
      rvaLength = getRVALength(cur);
    }
    return acc + rvaLength;
  }, 0);
};

function getSvgOffsetY(orientation: string) {
  switch (orientation) {
    case 'top':
      return -40;
    case 'bottom':
      return -25;
    case 'left':
      return -35;
    case 'right':
      return -35;
    default:
      return 0;
  }
}

function getSvgOffsetX(textAnchor: string) {
  switch (textAnchor) {
    case 'start':
      return 10;
    case 'middle':
      return 0;
    case 'end':
      return -20;
    default:
      return 0;
  }
}

const Label = ({
  x,
  y,
  dy,
  ...props
}: VictoryLabelProps & { orientation?: string }) => {
  const phase = PLANNING_PHASES.find((p) => p.name === props.text);
  // Victory type definitions declare that `textAnchor` can be a function
  // @ts-ignore
  const offsetX = getSvgOffsetX(props.textAnchor);
  const offsetY = getSvgOffsetY(props.orientation);

  return (
    <g style={{ transform: `translate(${x}px,${y}px)` }}>
      <SvgIcon type={phase.icon.replace('.svg', '')} y={offsetY} x={offsetX} />
      <VictoryLabel {...props} x={0} y={0} dy={0} />
    </g>
  );
};

const NoData = () => (
  <ChartTitle>
    Keine Planungen <br />
    vorhanden.
  </ChartTitle>
);

const connector = connect(null, (dispatch) => ({
  setPhaseFilter: (filter: string) => dispatch(setPhaseFilter(filter)),
}));

interface Props {
  data: any[];
  isLoading: boolean;
}

class PieChart extends PureComponent<Props & ConnectedProps<typeof connector>> {
  handleClick = (_: any, data: { datum: { x: string } }) => {
    this.props.setPhaseFilter(data.datum.x);
  };

  renderChartLabel() {
    const { data } = this.props;
    const lengthSum = lengthByPhase(this.props.data, null) / 1000.0;
    const numProjects = data.length;

    return (
      <>
        <ChartTitle>{numProjects} Planungen</ChartTitle>
        <ChartSubtitle>
          gesamte Länge: {numberFormat(lengthSum, 0)} km
        </ChartSubtitle>
      </>
    );
  }

  render() {
    const { isLoading, data } = this.props;

    if (isLoading) {
      return (
        <PieChartWrapper>
          <DotLoader />
        </PieChartWrapper>
      );
    }

    const chartData = PLANNING_PHASES.map((planningPhase) => ({
      x: planningPhase.id,
      xName: planningPhase.name,
      y: lengthByPhase(data, planningPhase.id) / 1000.0,
      color: planningPhase.color,
    })).filter((d) => d.y > 0);

    const hasData = data.length > 0;
    const colorScale = chartData.map((d) => d.color);
    const eventHandler = [
      {
        target: 'data',
        eventHandlers: {
          onClick: this.handleClick,
        },
      },
    ];

    return (
      <PieChartWrapper>
        <VictoryPie
          innerRadius={100}
          radius={130}
          data={chartData}
          colorScale={colorScale}
          style={chartStyle}
          labelComponent={<Label />}
          // Victory type definitions miss the `active` prop
          // @ts-ignore
          dataComponent={<Slice active={Math.random() > 0.6} />}
          // Victory types only specify the event itself and nothing else
          // as a callback pro
          // @ts-ignore
          events={eventHandler}
        />
        <ChartInnerLabel>
          {hasData ? this.renderChartLabel() : <NoData />}
        </ChartInnerLabel>
      </PieChartWrapper>
    );
  }
}

export default connector(PieChart);
