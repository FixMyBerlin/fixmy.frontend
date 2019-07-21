import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import DialogStepWrapper from '~/pages/Reports/pages/SubmitReport/components/DialogStepWrapper';
import RangeSlider from '~/components/RangeSlider';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import { RadioButton, RadioButtonLabel } from '~/pages/Reports/pages/SubmitReport/components/RadioButton';
import WeiterButton from '~/pages/Reports/pages/SubmitReport/components/WeiterButton';

const StyledHeading = styled(Heading)`
  margin-bottom: 75px;
`;

const CostSlider = styled(RangeSlider)`
  &&  .rangeslider__fill {
     background-color: ${config.colors.lightgrey};
   }
`;

const BicycleParkingGarageForm = ({ onConfirm }) => {
  const [wouldPay, setWouldPay] = useState(null);
  const [dailyRent, setDailyRent] = useState(0);

  return (
    <DialogStepWrapper>

      <StyledHeading>Würdest du hier auch ein kostenpflichtiges Fahrradparkhaus nutzen?</StyledHeading>

      <RadioButtonLabel htmlFor="charged-bikepark-conceivable" style={{ alignSelf: 'flex-start' }}>
        <RadioButton
          type="radio"
          id="charged-bikepark-conceivable"
          name="charged-bikepark-conceivable"
          value="true"
          checked={wouldPay === true}
          onChange={() => setWouldPay(true)}
        />
        {wouldPay ?
          `Ja klar, und ich würde dafür ${dailyRent}€ am Tag zahlen.` :
          'Ja klar!'
        }
      </RadioButtonLabel>

      {wouldPay && (
        <CostSlider
          min={0}
          max={5}
          name="paymentReservesBikePark"
          labels={{ 0: '0 €', 5: '5 €' }}
          value={dailyRent}
          tooltip={false}
          handleLabel={`${dailyRent} €`}
          onChange={(...args) => setDailyRent(args[0])}
        />
      )}

      <RadioButtonLabel htmlFor="charged-bikepark-not-conceivable" style={{ marginTop: 18 }}>
        <RadioButton
          type="radio"
          id="charged-bikepark-not-conceivable"
          name="charged-bikepark-not-conceivable"
          value="false"
          checked={wouldPay === false}
          onChange={() => setWouldPay(false)}
        />
        Nein, so etwas brauche ich nicht.
      </RadioButtonLabel>

      <WeiterButton
        onClick={() => onConfirm(wouldPay ? dailyRent : 0)}
        disabled={!wouldPay}
      >Weiter
      </WeiterButton>

    </DialogStepWrapper>
  );
};

BicycleParkingGarageForm.propTypes = {
  onConfirm: PropTypes.func.isRequired
};

export default BicycleParkingGarageForm;
