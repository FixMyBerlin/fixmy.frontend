import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { isSmallScreen, media } from '~/styles/utils';

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  ${media.m`
    margin-bottom: 25px;
  `}
`;

const ProgressStep = styled.div`
  height: 2px;
  background: ${(props) =>
    props.done ? config.colors.interaction : config.colors.lightgrey};
  opacity: ${(props) => (props.current ? 0.5 : 1)};
`;

const ProgressBarLabel = styled.div`
  color: ${config.colors.midgrey};
  margin-bottom: 8px;
  font-size: 14px;
  font-family: 'Franklin Gothic FS', 'Open Sans', sans-serif;
  font-weight: 500;
`;

const ProgressBar = ({ total, current }) => {
  const width = `${85 / total}%`;
  const stepRange = Array.from(Array(total).keys());

  return (
    <>
      {!isSmallScreen() && (
        <ProgressBarLabel>Fortschritt der Umfrage</ProgressBarLabel>
      )}
      <ProgressWrapper data-cy="kat-progress-bar">
        {stepRange.map((index) => (
          <ProgressStep
            css={{ width }}
            done={index <= current}
            current={index === current}
            key={`progress-step__${index}`}
          />
        ))}
      </ProgressWrapper>
    </>
  );
};

const mapStateToProps = (state) => ({
  current: state.KatasterKIState.progressBar.current,
  total: state.KatasterKIState.progressBar.total
});

export default connect(mapStateToProps)(ProgressBar);
