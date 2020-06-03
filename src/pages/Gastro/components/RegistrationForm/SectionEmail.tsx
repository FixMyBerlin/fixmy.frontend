import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import styled from 'styled-components';

const InvisiLabel = styled.label`
  display: none;
`;

const SectionEmail = () => (
  <section>
    <h4>Ihre E-Mail-Adresse</h4>
    <p className="subline">
      Ihre Daten werden für die Durchführung des Verfahrens gespeichert, der
      Name Ihres Betriebes kann im Zuge der Aktion{' '}
      <em>Terrassen für Friedrichshain-Kreuzberg</em> veröffentlicht werden.
    </p>
    <InvisiLabel htmlFor="email">Ihre E-Mail-Adresse</InvisiLabel>
    <Field
      id="email"
      name="email"
      component={TextField}
      label="Ihre E-Mail-Adresse"
      fullWidth
    />
  </section>
);

export default SectionEmail;
