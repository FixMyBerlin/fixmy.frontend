import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import styled from 'styled-components';

import config from '~/config';

const Tooltip = styled.div`
  transition: opacity 0.3s;
  opacity: 0;
  color: #666;
  position: absolute;
  bottom: -18px;
  font-size: 12px;
  left: 0;
  white-space: nowrap;
`;

const Bar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:hover,
  &:focus {
    ${Tooltip} {
      opacity: 1;
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

const colorScale = ['#c01d1d', '#f08141', '#abc759', '#45b834'];
const colorWeight = ['#45b834'];
const labels = defineMessages({
  0: {
    id: 'research.components.barchart.labels.unsafe',
    defaultMessage: 'unsicher'
  },
  1: {
    id: 'research.components.barchart.labels.ratherUnsafe',
    defaultMessage: 'eher unsicher'
  },
  2: {
    id: 'research.components.barchart.labels.ratherSafe',
    defaultMessage: 'eher sicher'
  },
  3: {
    id: 'research.components.barchart.labels.safe',
    defaultMessage: 'sicher'
  }
});

const getColor = (isWeightGraph: boolean, index: number) =>
  isWeightGraph ? colorWeight[index] : colorScale[index];

const BarLabel = ({ value, isWeightGraph }) => {
  const intl = useIntl();
  return isWeightGraph ? (
    <WeightBarLabelStyle>
      {(value / 100.0).toLocaleString(intl.locale, {
        maximumFractionDigits: 2
      })}
    </WeightBarLabelStyle>
  ) : (
    <BarLabelStyle>
      {value < 15
        ? '*'
        : `${value.toLocaleString(intl.locale, { maximumFractionDigits: 0 })}%`}
    </BarLabelStyle>
  );
};

const BarElement = ({ title, value, index, isWeightGraph = false }) => {
  const intl = useIntl();
  const pctValue = value.toLocaleString(intl.locale, {
    maximumFractionDigits: 2
  });
  const tooltipId = `barchart-tooltip-${encodeURIComponent(
    title
  )}-${index}-${pctValue}`;
  return (
    <Bar
      // eslint-disable-next-line react/no-array-index-key
      key={`bar__${labels[index]}`}
      style={{
        width: `${value}%`,
        backgroundColor: getColor(isWeightGraph, index)
      }}
      tabIndex={isWeightGraph ? null : 0}
      aria-describedby={isWeightGraph ? null : tooltipId}
    >
      <BarLabel value={value} isWeightGraph={isWeightGraph} />
      {!isWeightGraph && (
        <Tooltip role="tooltip" className="barchart__tooltip" id={tooltipId}>
          {pctValue}% {intl.formatMessage(labels[index])}
        </Tooltip>
      )}
    </Bar>
  );
};

export default BarElement;
