import React, { PureComponent } from 'react';
import Styled from 'styled-components';

const ChartLine = Styled.line`
  shape-rendering: crispEdges;
`;

const ChartLabel = Styled.text`
  font-size: 10px;
  user-select: none;
  font-weight: ${props => (props.inProgress ? 700 : 400)};
`;

function getChartData(phase) {
  const planningPhaseName = config.planningPhasesMapping[phase];
  let isFinished = true;

  return config.planningPhasesOrder.map((planningPhase) => {
    if (planningPhase === planningPhaseName) {
      isFinished = false;
    }

    const planningPhaseConfig = config.planningPhases[planningPhase];

    return {
      isFinished,
      inProgress: planningPhase === planningPhaseName,
      color: planningPhaseConfig.color,
      icon: planningPhaseConfig.icon,
      label: planningPhase
    };
  });
}

class PlanningStatusChart extends PureComponent {
  state = {
    width: 0
  }

  componentDidMount() {
    this.updateWidth();
  }

  height = 80
  padding = { top: 0, right: 30, bottom: 0, left: 30 }

  updateWidth = () => {
    if (!this.chartWrapper) {
      return false;
    }

    const { width } = this.chartWrapper.getBoundingClientRect();
    return this.setState({ width });
  }

  renderChartItem = (props, i, data) => {
    const innerWidth = this.state.width - this.padding.left - this.padding.right;
    const step = innerWidth / (config.planningPhasesOrder.length - 1);
    const x = this.padding.left + (step * i);
    const nextX = this.padding.left + (step * (i + 1));
    const r = props.inProgress ? 25 : 12.5;
    const y = this.height / 3;
    const lineStroke = props.isFinished ? config.colors.change_4 : config.colors.inactivegrey;
    const circleColor = props.inProgress || props.isFinished ? props.color : config.colors.inactivegrey;
    console.log(props);

    return (
      <g key={`ChartItem__${props.label}`}>
        {i < data.length - 1 && <ChartLine x1={x} x2={nextX} y1={y} y2={y} stroke={lineStroke} strokeWidth="3" />}
        <circle r={r} cx={x} cy={y} fill={circleColor} />
        <ChartLabel inProgress={props.inProgress} x={x} y={this.height - 10} textAnchor="middle">{props.label}</ChartLabel>
      </g>
    );
  }

  render() {
    if (!this.props.phase) {
      return null;
    }

    const chartData = getChartData(this.props.phase);

    return (
      <div ref={(ref) => { this.chartWrapper = ref; }}>
        <svg width={this.state.width} height={this.height}>
          {chartData.map(this.renderChartItem)}
        </svg>
      </div>
    );
  }
}

export default PlanningStatusChart;
