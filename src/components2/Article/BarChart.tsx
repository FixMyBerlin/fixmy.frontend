import React from 'react';
import styled from 'styled-components';

import FeelSafe from './FeelSafe';

const Wrapper = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  position: relative;

  @media screen and (min-width: 800px) {
    align-items: center;
    flex-direction: row;
  }
`;

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 55px;

  @media screen and (min-width: 800px) {
    margin-bottom: 0;
    width: 150px;
  }
`;

const ChartOuter = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;

  @media screen and (min-width: 800px) {
    padding: 0 10px;
  }
`;

const Chart = styled.div`
  display: flex;
  height: 40px;
  width: 100%;
  font-size: 13px;

  @media screen and (min-width: 800px) {
    padding: 0 10px;
    width: 500px;
    font-size: 15px;
  }
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

const BarLabel = styled.div`
  font-weight: 700;
  color: white;
`;

interface BarChartProps {
  title: string;
  data: number[];
  feelsafe: number;
}

const colors = ['#c01d1d', '#f08141', '#abc759', '#45b834'];
const labels = ['unsicher', 'eher unsicher', 'seher sicher', 'sicher'];

export default ({ title, data, feelsafe }: BarChartProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <ChartOuter>
        <Chart>
          {data.map((d, i) => (
            <Bar
              key={`bar__${i}`}
              style={{ width: `${d}%`, backgroundColor: colors[i] }}
            >
              <BarLabel>{d}%</BarLabel>
              <Tooltip className="barchart__tooltip">{labels[i]}</Tooltip>
            </Bar>
          ))}
        </Chart>
      </ChartOuter>
      <FeelSafe value={feelsafe} />
    </Wrapper>
  );
};
