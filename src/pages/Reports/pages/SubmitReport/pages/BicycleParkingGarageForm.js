import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import DialogStepWrapper from '~/pages/Reports/pages/SubmitReport/components/DialogStepWrapper';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import SubHeading from '~/pages/Reports/pages/SubmitReport/components/SubHeading';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';
import {
  RadioButton,
  RadioButtonLabel,
} from '~/pages/Reports/pages/SubmitReport/components/RadioButton';
import WeiterButton from '~/pages/Reports/pages/SubmitReport/components/WeiterButton';
import BrBoxImg from '~/images/reports/b_r_box.jpg';

const StyledHeading = styled(Heading)`
  margin-bottom: 29px;
`;

const StyledWeiterButton = styled(WeiterButton)`
  font-size: 16px;
  width: 240px;
`;

const ImageWrapper = styled.div`
  max-width: 486px;
  margin-bottom: 2em;
`;

const Image = styled.img`
  width: 100%;
`;

const ImageSource = styled.div`
  font-size: 10px;
  text-align: right;
`;

const StyledSubHeading = styled(SubHeading)`
  margin: 68px 0 0 0;
`;

const BicycleParkingGarageForm = ({ onConfirm }) => {
  const [wouldPay, setWouldPay] = useState(null);

  return (
    <DialogStepWrapper>
      <StyledHeading data-cy="reports-locker-heading">
        Würden Sie an diesem Ort auch ein kostenpflichtiges Fahrradparkhaus
        nutzen?
      </StyledHeading>

      <ImageWrapper>
        <Image
          src={BrBoxImg}
          alt="Bike-and-Ride-Box bzw. E-Ladestation"
          data-cy="reports-locker-figure"
        />
        <ImageSource>Foto: Kienzler Stadtmobiliar GmbH</ImageSource>
      </ImageWrapper>

      <RadioButtonLabel
        htmlFor="charged-bikepark-conceivable"
        style={{ alignSelf: 'flex-start' }}
      >
        <RadioButton
          type="radio"
          id="charged-bikepark-conceivable"
          name="charged-bikepark-conceivable"
          value="true"
          checked={wouldPay === true}
          onChange={() => setWouldPay(true)}
          data-cy="reports-locker-accept"
        />
        Ja, das wäre ein interessantes Angebot.
      </RadioButtonLabel>

      <RadioButtonLabel
        htmlFor="charged-bikepark-not-conceivable"
        style={{ marginTop: 18 }}
      >
        <RadioButton
          type="radio"
          id="charged-bikepark-not-conceivable"
          name="charged-bikepark-not-conceivable"
          value="false"
          checked={wouldPay === false}
          onChange={() => setWouldPay(false)}
          data-cy="reports-locker-deny"
        />
        Nein, so etwas brauche ich nicht.
      </RadioButtonLabel>

      <StyledWeiterButton
        onClick={() => onConfirm(wouldPay)}
        disabled={typeof wouldPay !== 'boolean'}
        data-cy="reports-locker-continue"
      >
        Meldung abschließen
      </StyledWeiterButton>

      <StyledSubHeading>Was sind Fahrradparkhäuser?</StyledSubHeading>
      <Paragraph>
        Fahrradparkhäuser sind abschließbare Stationen, in denen Fahrräder gegen
        Gebühr besonders sicher untergebracht werden können. Teilweise sind sie
        auch mit Ladestationen für E-Bikes ausgerüstet.
      </Paragraph>
    </DialogStepWrapper>
  );
};

BicycleParkingGarageForm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default BicycleParkingGarageForm;
