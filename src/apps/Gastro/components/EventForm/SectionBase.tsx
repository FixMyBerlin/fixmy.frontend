import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { Field, ErrorMessage } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { LocationPicker } from '~/components2/LocationPicker';
import { StaticMap } from '~/components2/StaticMap';

import FormError from '../FormError';

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
    <InvisiLabel htmlFor="address">Adresseingabe</InvisiLabel>
    <Field
      id="address"
      name="address"
      component={TextField}
      label="Adresseingabe"
      fullWidth
    />
  </section>
);

export default SectionBase;
