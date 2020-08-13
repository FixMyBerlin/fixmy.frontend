import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import FeelSafe, { FeelsafeIcon } from '~/pages/Research/components/FeelSafe';
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
  margin-bottom: ${(props: TitleProps) => (props.hasFeelSafe ? '40px' : '1em')};

  ${media.m`
    margin-bottom: 0;
    width: 180px;
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
   width: 440px;
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
  feelsafeIcon?: FeelsafeIcon;
}

interface WeightChartProps {
  title: string;
  data: [number];
  feelsafe?: null;
  feelsafeIcon?: null;
}

type BarChartProps = WeightChartProps | ScaleChartProps;

const colorScale = ['#c01d1d', '#f08141', '#abc759', '#45b834'];
const colorWeight = ['#45b834'];
const labels = ['unsicher', 'eher unsicher', 'eher sicher', 'sicher'];

const getColor = (isWeightGraph, index) =>
  isWeightGraph ? colorWeight[index] : colorScale[index];

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

const BarChart = ({
  title,
  data,
  feelsafe = null,
  feelsafeIcon = 'bike' as FeelsafeIcon
}: BarChartProps) => {
  const [isWeightGraph, setWeightGraph] = useState(data.length === 1);
  useEffect(() => setWeightGraph(data.length === 1), [data.length]);

  return (
    <Wrapper>
      <Title hasFeelSafe={!isWeightGraph}>{title}</Title>
      <ChartOuter>
        <Chart>
          {data.map((d, i) => (
            <Bar
              // eslint-disable-next-line react/no-array-index-key
              key={`bar__${labels[i]}`}
              style={{
                width: `${d}%`,
                backgroundColor: getColor(isWeightGraph, i)
              }}
            >
              <BarLabel value={d} isWeightGraph={isWeightGraph} />
              {!isWeightGraph && (
                <Tooltip className="barchart__tooltip">{labels[i]}</Tooltip>
              )}
            </Bar>
          ))}
        </Chart>
      </ChartOuter>
      {!isWeightGraph && <FeelSafe value={feelsafe} icon={feelsafeIcon} />}
    </Wrapper>
  );
};

BarChart.Wrapper = BarChartWrapper;

export default BarChart;
