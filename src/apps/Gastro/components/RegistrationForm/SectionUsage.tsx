import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import styled from 'styled-components';

const InvisiLabel = styled.label`
  display: none;
`;

const SectionUsage = () => (
  <section>
    <p>
      <strong>
        Bitte formulieren Sie kurze Angaben zum Nutzungszweck der beantragten
        Fläche:
      </strong>
    </p>
    <InvisiLabel htmlFor="usage">Nutzungszweck</InvisiLabel>
    <Field
      id="usage"
      name="usage"
      type="text"
      component={TextField}
      label="Nutzungszweck"
      placeholder="z.B. Schankvorgarten, Warenauslagen, Werkstatt, oder anderer Zweck"
      multiline
      rows={4}
      fullWidth
    />
  </section>
);

export default SectionUsage;
