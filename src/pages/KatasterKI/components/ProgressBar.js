import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

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

const ProgressBar = ({ total, current }) => {
  const width = `${85 / total}%`;
  const stepRange = Array.from(Array(total).keys());

  return (
    <ProgressWrapper>
      {stepRange.map((index) => (
        <ProgressStep
          css={{ width }}
          done={index <= current}
          current={index === current}
          key={`progress-step__${index}`}
        />
      ))}
    </ProgressWrapper>
  );
};

const mapStateToProps = (state) => ({
  current: state.KatasterKIState.progressBar.current,
  total: state.KatasterKIState.progressBar.total
});

export default connect(mapStateToProps)(ProgressBar);
