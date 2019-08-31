import React, { useState } from 'react';
import styled from 'styled-components';

import DialogStepWrapper from '~/pages/Reports/pages/SubmitReport/components/DialogStepWrapper';
import RangeSlider from '~/components/RangeSlider';
import WeiterButton from '~/pages/Reports/pages/SubmitReport/components/WeiterButton';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';

const Question = styled(Heading)`
  margin-top: 32px;
  margin-bottom: 8px;
  line-height: 1.37;
`;

const BikeStandsSlider = styled(RangeSlider)`
  margin-bottom: 90px !important;
`;

export default ({ onConfirm }) => {
  const [bikestandCount, setBikestandCount] = useState(1);

  return (
    <DialogStepWrapper>

      <Question>Wie viele Bügel werden benötigt?</Question>
      <BikeStandsSlider
        min={1}
        max={20}
        labels={{ 1: 1, 20: 20 }}
        name="bikestandsNeeded"
        value={bikestandCount}
        tooltip={false}
        handleLabel={bikestandCount.toString()}
        onChange={count => setBikestandCount(count)}
      />

      <WeiterButton onClick={() => onConfirm(bikestandCount)}>Weiter
      </WeiterButton>

    </DialogStepWrapper>
  );
};
