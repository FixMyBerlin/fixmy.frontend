import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import styled from 'styled-components';

const InvisiLabel = styled.label`
  display: none;
`;

const SectionShopfrontLength = () => (
  <section>
    <p>
      <strong>
        Wie breit ist die Häuserfront ihres Ladenlokals (falls vorhanden)?
      </strong>
    </p>
    <p>
      Auf Grundlage der Straßenfront-Breite kann das Bezirksamt entscheiden
      welcher Raum im Straßenland genutzt werden kann. Sofern sie kein
      Ladenlokal haben bitte 0 angeben.
    </p>
    <InvisiLabel htmlFor="shopfront_length">
      Angabe in Metern z.B. 4,8
    </InvisiLabel>
    <Field
      id="shopfront_length"
      name="shopfront_length"
      type="text"
      inputMode="numeric"
      pattern="[0-9]+(,[0-9]+)?"
      component={TextField}
      label="Angabe in Metern z.B. 4,8"
      fullWidth
    />
  </section>
);

export default SectionShopfrontLength;
