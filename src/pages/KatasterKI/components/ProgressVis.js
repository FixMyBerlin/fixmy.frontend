import React from 'react';
import styled from 'styled-components';

import { numberFormat } from '~/utils/utils';

const ProgressWrapper = styled.div`
  position: relative;
  font-weight: normal;
`;

const ProgressBar = styled.div`
  border-radius: 20px;
  overflow: hidden;
  background: ${config.colors.lightgrey};
  height: 40px;
`;

const Progress = styled.div`
  background: rgb(5 124 156);
  height: 100%;
  width: ${(props) => props.progress || 0}%;
`;

const Label = styled.div`
  color: ${config.colors.midgrey};
  font-size: 14px;
  position: absolute;
`;

const ValueLabel = styled(Label)`
  left: ${(props) => props.progress}%;
  transform: translate(-50%, 0);
  bottom: -20px;
`;

const MaxLabel = styled(Label)`
  right: 0;
  bottom: -20px;
  font-weight: 700;
`;

export default ({ value = 0, max = 100, style = {}, className = null }) => {
  const progress = (value / max) * 100;
  const showMaxLabel = progress < 90;

  return (
    <ProgressWrapper
      style={style}
      className={className}
      data-cy="kat-progress-vis-wrapper"
    >
      <ValueLabel
        progress={progress}
        data-cy="kat-progress-vis-value-label"
      >{numberFormat(value)}</ValueLabel>
      <ProgressBar>
        <Progress progress={progress} />
      </ProgressBar>
      {showMaxLabel && <MaxLabel data-cy="kat-progress-vis-max-label">{numberFormat(max)}</MaxLabel>}
    </ProgressWrapper>
  );
};
