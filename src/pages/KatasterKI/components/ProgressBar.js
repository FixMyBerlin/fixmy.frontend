import React from 'react';
import styled from 'styled-components';

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const ProgressStep = styled.div`
  height: 2px;
  background: ${(props) =>
    props.done ? config.colors.interaction : config.colors.lightgrey};
  opacity: ${(props) => (props.current ? 0.5 : 1)};
`;

export default ({ steps, currentStep }) => {
  const width = `${85 / steps}%`;
  const stepRange = Array.from(Array(steps).keys());

  return (
    <ProgressWrapper>
      {stepRange.map((index) => (
        <ProgressStep
          css={{ width }}
          done={index <= currentStep}
          current={index === currentStep}
          key={`progress-step__${index}`}
        />
      ))}
    </ProgressWrapper>
  );
};
