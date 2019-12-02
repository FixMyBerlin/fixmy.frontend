import React, { PureComponent } from 'react';
import styled from 'styled-components';

import ConceptIcon from '~/images/planning-icons/konzept.svg';
import PlanningIcon from '~/images/planning-icons/planung.svg';
import ConstructionIcon from '~/images/planning-icons/bau.svg';
import DoneIcon from '~/images/planning-icons/fertig.svg';

const iconPaths = {
  'im Bau': ConstructionIcon,
  Fertig: DoneIcon,
  Konzept: ConceptIcon,
  Planung: PlanningIcon
};

const ChartWrapper = styled.div`
  position: relative;
`;

const ChartLine = styled.line`
  shape-rendering: crispEdges;
`;

const ChartLabel = styled.text`
  font-size: 10px;
  user-select: none;
  font-weight: ${(props) => (props.inProgress ? 700 : 400)};
`;

const iconSize = 50;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${iconSize}px;
  height: ${iconSize}px;
  left: ${(props) => `${props.left - iconSize / 2}px` || 0};
  top: ${(props) => `${props.top}px` || 0};
  position: absolute;

  g,
  svg,
  use,
  path {
    fill: white;
  }
`;

function getPhaseIcon(phase = {}) {
  if (!phase.label) {
    return false;
  }
  const Icon = iconPaths[phase.label];
  return (
    <IconWrapper top={0} left={phase.x}>
      <Icon />
    </IconWrapper>
  );
}

class ProjectStatusChart extends PureComponent {
  state = {
    width: 0
  };

  height = 80;

  padding = {
    top: 0,
    right: 30,
    bottom: 0,
    left: 30
  };

  componentDidMount() {
    this.updateWidth();
  }

  getChartData = (phase) => {
    let isFinished = true;

    return config.planningPhases.map((planningPhase, i) => {
      if (planningPhase.id === phase) {
        isFinished = false;
      }

      const inProgress = planningPhase.id === phase;
      const innerWidth =
        this.state.width - this.padding.left - this.padding.right;
      const step = innerWidth / (config.planningPhases.length - 1);
      const r = inProgress ? 25 : 12.5;
      const x = this.padding.left + step * i;
      const y = this.height / 3;
      const nextX = this.padding.left + step * (i + 1);
      const lineStroke = isFinished
        ? config.colors.change_4
        : config.colors.inactivegrey;
      const circleColor =
        inProgress || isFinished
          ? planningPhase.color
          : config.colors.inactivegrey;

      return {
        isFinished,
        inProgress,
        color: planningPhase.color,
        icon: planningPhase.icon,
        label: planningPhase.name,
        r,
        x,
        y,
        nextX,
        lineStroke,
        circleColor
      };
    });
  };

  updateWidth = () => {
    if (!this.chartWrapper) {
      return false;
    }

    const { width } = this.chartWrapper.getBoundingClientRect();
    return this.setState({ width });
  };

  renderChartItem = (props, i, data) => (
    <g key={`ChartItem__${props.label}`}>
      {i < data.length - 1 && (
        <ChartLine
          x1={props.x}
          x2={props.nextX}
          y1={props.y}
          y2={props.y}
          stroke={props.lineStroke}
          strokeWidth="3"
        />
      )}
      <circle r={props.r} cx={props.x} cy={props.y} fill={props.circleColor} />
      <ChartLabel
        inProgress={props.inProgress}
        x={props.x}
        y={this.height - 10}
        textAnchor="middle"
      >
        {props.label}
      </ChartLabel>
    </g>
  );

  render() {
    if (!this.props.phase) {
      return null;
    }

    const chartData = this.getChartData(this.props.phase);
    const progressPhase = chartData.find((d) => d.inProgress);
    const currentPhaseIcon = getPhaseIcon(progressPhase);

    return (
      <ChartWrapper
        ref={(ref) => {
          this.chartWrapper = ref;
        }}
      >
        <svg width={this.state.width} height={this.height}>
          {chartData.map(this.renderChartItem)}
        </svg>
        {progressPhase ? currentPhaseIcon : null}
      </ChartWrapper>
    );
  }
}

export default ProjectStatusChart;
