import React from 'react';
import styled from 'styled-components';

import FeelSafe from '~/pages/Research/components/FeelSafe';
import BarChartWrapper from './Wrapper';
import config from '~/config';
import { media } from '~/styles/utils';

const Wrapper = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  position: relative;

  & + & {
    margin-top: 1em;
  }

  ${media.m`
    align-items: center;
    flex-direction: row;
    `}
`;

type TitleProps = {
  hasFeelSafe?: boolean;
};

const Title = styled.div`
  font-weight: 700;
  margin-bottom: ${(props: TitleProps) => (props.hasFeelSafe ? '55px' : '1em')};

  ${media.m`
    margin-bottom: 0;
    width: 150px;
    `}
`;

const ChartOuter = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;

  ${media.m`
    padding: 0 10px;
  `}
`;

const Chart = styled.div`
  display: flex;
  height: 40px;
  width: 100%;
  font-size: 13px;

  ${media.m`
    padding: 0 10px;
   width: 500px;
    font-size: 15px;
    `}
`;

const Tooltip = styled.div`
  display: none;
  color: #999;
  position: absolute;
  bottom: -18px;
  font-size: 12px;
  width: 100px;
  left: 0;
`;

const Bar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:hover {
    ${Tooltip} {
      display: block;
    }
  }
`;

const BarLabelStyle = styled.div`
  font-weight: 700;
  color: white;
`;

const WeightBarLabelStyle = styled.div`
  position: absolute;
  right: -2.5em;
  font-weight: 700;
  color: ${config.colors.darkbg};
`;

interface ScaleChartProps {
  title: string;
  data: [number, number, number, number];
  feelsafe?: number;
}

interface WeightChartProps {
  title: string;
  data: [number];
}

type BarChartProps = WeightChartProps | ScaleChartProps;

const colorScale = ['#c01d1d', '#f08141', '#abc759', '#45b834'];
const colorWeight = ['#45b834'];
const labels = ['unsicher', 'eher unsicher', 'eher sicher', 'sicher'];

const BarLabel = ({ value, isWeightGraph }) =>
  isWeightGraph ? (
    <WeightBarLabelStyle>
      {(value / 100.0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
    </WeightBarLabelStyle>
  ) : (
    <BarLabelStyle>
      {value.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
    </BarLabelStyle>
  );

const BarChart = ({ title, data, ...props }: BarChartProps) => {
  let colors;
  let feelsafe;
  let isWeightGraph = false;

  if (data.length === 1) {
    isWeightGraph = true;
    colors = colorWeight;
  } else {
    colors = colorScale;
    feelsafe = (props as ScaleChartProps).feelsafe;
  }

  return (
    <Wrapper>
      <Title hasFeelSafe={!isWeightGraph}>{title}</Title>
      <ChartOuter>
        <Chart>
          {data.map((d, i) => (
            <Bar
              // eslint-disable-next-line react/no-array-index-key
              key={`bar__${labels[i]}`}
              style={{ width: `${d}%`, backgroundColor: colors[i] }}
            >
              <BarLabel value={d} isWeightGraph={isWeightGraph} />
              {isWeightGraph === false && (
                <Tooltip className="barchart__tooltip">{labels[i]}</Tooltip>
              )}
            </Bar>
          ))}
        </Chart>
      </ChartOuter>
      {!isWeightGraph && <FeelSafe value={feelsafe} />}
    </Wrapper>
  );
};

BarChart.Wrapper = BarChartWrapper;

export default BarChart;
