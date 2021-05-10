import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import styled from 'styled-components';

const InvisiLabel = styled.label`
  display: none;
`;

const SectionUsage = () => (
  <section>
    <h4>Ihre E-Mail-Adresse</h4>
    <p className="subline">
      Ihre Daten werden für die Durchführung des Verfahrens gespeichert, die
      Beschreibung Ihrer Veranstaltung und die angegebenen Zeiten können im Zuge
      der Aktion <em>XHain-Terrassen</em> veröffentlicht werden.
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

export default SectionUsage;
