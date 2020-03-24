import React, { useState } from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
import DialogStepWrapper from '~/pages/Reports/pages/SubmitReport/components/DialogStepWrapper';
import Slider from '~/components/Slider';
import WeiterButton from '~/pages/Reports/pages/SubmitReport/components/WeiterButton';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';
import PlacementNotice from '~/pages/Reports/pages/SubmitReport/components/PlacementNotice';

import { breakpoints, media } from '~/styles/utils';

const Question = styled(Heading)`
  margin-top: 32px;
  margin-bottom: 8px;
  line-height: 1.37;
`;

const SliderWrapper = styled.div`
  width: 100%;
  max-width: ${breakpoints.s}px;
  padding: 0 40px;
  margin-bottom: 72px;
  margin-top: 64px;

  ${media.m`
    padding: 0;
  `}
`;

const StyledWeiterButton = styled(WeiterButton)`
  margin: 60px 0;
`;

const MAX_STANDS = config.reports.dialog.maxBikeStands || 12;

export default ({ onConfirm }) => {
  const [bikestandCount, setBikestandCount] = useState(1);

  return (
    <DialogStepWrapper>
      <Question>
        Wie viele Bügel werden aus deiner Sicht an diesem Ort benötigt?
      </Question>
      <Paragraph>
        An einen Bügel können zwei Fahrräder angeschlossen werden.
      </Paragraph>

      <SliderWrapper data-cy="reports-bikestands-slider-wrapper">
        <Slider
          min={1}
          max={MAX_STANDS}
          marks={{ 1: 1, [MAX_STANDS]: MAX_STANDS }}
          name="bikestandsNeeded"
          value={bikestandCount}
          tooltip={false}
          handleLabel={bikestandCount.toString()}
          onChange={(count) => setBikestandCount(count)}
        />
      </SliderWrapper>

      <StyledWeiterButton
        onClick={() => onConfirm(bikestandCount)}
        data-cy="reports-bikestands-continue"
      >
        Weiter
      </StyledWeiterButton>
      {config.reports.form.placementNotice && <PlacementNotice />}
    </DialogStepWrapper>
  );
};
