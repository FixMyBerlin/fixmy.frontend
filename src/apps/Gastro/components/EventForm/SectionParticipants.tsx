import { FormControlLabel, Radio } from '@material-ui/core';
import { Field } from 'formik';
import { RadioGroup } from 'formik-material-ui';
import React from 'react';

const SectionUsage = ({ isSubmitting }) => (
  <section>
    <h3>Anzahl maximal Teilnehmende</h3>
    <p>Wieviele Personen werden die Veranstaltung höchstens besuchen?</p>
    <Field component={RadioGroup} name="num_participants">
      <FormControlLabel
        value={0}
        control={<Radio disabled={isSubmitting} />}
        label="unter 50"
        disabled={isSubmitting}
      />
      <FormControlLabel
        value={1}
        control={<Radio disabled={isSubmitting} />}
        label="50 - 200"
        disabled={isSubmitting}
      />
      <FormControlLabel
        value={2}
        control={<Radio disabled={isSubmitting} />}
        label="200 - 500"
        disabled={isSubmitting}
      />
    </Field>
  </section>
);

export default SectionUsage;
