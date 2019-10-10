import React, { useState } from 'react';
import styled from 'styled-components';

import DialogStepWrapper from '~/pages/Reports/pages/SubmitReport/components/DialogStepWrapper';
import RangeSlider from '~/components/RangeSlider';
import WeiterButton from '~/pages/Reports/pages/SubmitReport/components/WeiterButton';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';
import StreetBgImage from '~/images/reports/bikestand-placement-street.jpg';

const Question = styled(Heading)`
  margin-top: 32px;
  margin-bottom: 8px;
  line-height: 1.37;
`;

const StyledWeiterButton = styled(WeiterButton)`
  margin: 60px 0;
`;

const Image = styled.img`
  width: 100%;
  max-width: 486px;
  margin-top: 1em;
`;

const MAX_STANDS = config.reports.dialog.maxBikeStands || 12;

export default ({ onConfirm }) => {
  const [bikestandCount, setBikestandCount] = useState(1);

  return (
    <DialogStepWrapper>

      <Question>Wie viele Bügel werden aus deiner Sicht an diesem Ort benötigt?</Question>
      <Paragraph>An einen Bügel können zwei Fahrräder angeschlossen werden.</Paragraph>

      <RangeSlider
        min={1}
        max={MAX_STANDS}
        labels={{ 1: 1, [MAX_STANDS]: MAX_STANDS }}
        name="bikestandsNeeded"
        value={bikestandCount}
        tooltip={false}
        handleLabel={bikestandCount.toString()}
        onChange={count => setBikestandCount(count)}
      />

      <StyledWeiterButton onClick={() => onConfirm(bikestandCount)}>Weiter
      </StyledWeiterButton>

      <Paragraph>
        Hinweis: Neue Fahrradbügel werden in Friedrichshain-Kreuzberg in der Regel
        auf der Straße installiert,
        damit der Platz für Fußgänger:innen auf dem Gehweg nicht eingeschränkt wird.
      </Paragraph>

      <Image src={StreetBgImage} alt="Straßenseitige Fahrradständer" />


    </DialogStepWrapper>
  );
};
