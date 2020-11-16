import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import FeelSafe, { FeelsafeIcon } from '~/pages/Research/components/FeelSafe';
import BarChartWrapper from './Wrapper';
import { media } from '~/styles/utils';
import BarElement from './BarElement';

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
  margin: ${(props: TitleProps) =>
    props.hasFeelSafe ? '30px 80px 30px 0' : '0 0 1em 0'};

  ${media.m`
    margin: 0;
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

const BarChart = ({
  title,
  data,
  feelsafe = null,
  feelsafeIcon = 'bike'
}: BarChartProps) => {
  const [isWeightGraph, setWeightGraph] = useState(data.length === 1);
  useEffect(() => setWeightGraph(data.length === 1), [data.length]);

  return (
    <Wrapper>
      <Title hasFeelSafe={!isWeightGraph}>{title}</Title>
      <ChartOuter>
        <Chart>
          {data.map((d, i) => (
            <BarElement
              title={title}
              value={d}
              index={i}
              isWeightGraph={isWeightGraph}
              // this index is stable
              // eslint-disable-next-line react/no-array-index-key
              key={i}
            />
          ))}
        </Chart>
      </ChartOuter>
      {!isWeightGraph && <FeelSafe value={feelsafe} icon={feelsafeIcon} />}
    </Wrapper>
  );
};

BarChart.Wrapper = BarChartWrapper;

export default BarChart;
