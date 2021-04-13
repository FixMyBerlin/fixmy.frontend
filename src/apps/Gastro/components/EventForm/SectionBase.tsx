import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import styled from 'styled-components';

const InvisiLabel = styled.label`
  display: none;
`;

const SectionBase = () => (
  <section>
    <Field
      name="org_name"
      component={TextField}
      label="Name des Vereins, der Organisation (optional)"
      fullWidth
    />

    <InvisiLabel htmlFor="first_name">
      Vorname der Antragssteller*in
    </InvisiLabel>
    <Field
      id="first_name"
      name="first_name"
      component={TextField}
      label="Vorname der Antragssteller*in"
      fullWidth
    />
    <InvisiLabel htmlFor="last_name">
      Nachname der Antragssteller*in
    </InvisiLabel>
    <Field
      id="last_name"
      name="last_name"
      component={TextField}
      label="Nachname der Antragssteller*in"
      fullWidth
    />
    <InvisiLabel htmlFor="phone">
      Telefonnummer unter der Sie tagsüber gut erreichbar sind
    </InvisiLabel>
    <Field
      id="phone"
      name="phone"
      component={TextField}
      label="Telefonnummer (tagsüber erreichbar)"
      fullWidth
    />
    <InvisiLabel htmlFor="address">
      Meldeadresse der Antragsteller*in
    </InvisiLabel>
    <Field
      id="address"
      name="address"
      component={TextField}
      label="Meldeadresse der Antragsteller*in"
      fullWidth
    />
  </section>
);

export default SectionBase;
