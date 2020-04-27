import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField, CheckboxWithLabel, RadioGroup } from 'formik-material-ui';
import { FormControlLabel, Radio } from '@material-ui/core';
import styled from 'styled-components';

import config from '~/pages/Spielstrassen/config';
import Button from '~/components2/Button';
import { media } from '~/styles/utils';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  tosAccepted: false,
  captain: null,
  message: ''
};

const StyledForm = styled(Form)`

    > div {
        margin-bottom: 1em;
    }

  .tosFieldGroup {
    margin: 2em 0;

    .MuiTypography-body1 {
        font-size: 0.75em;
        line-height: normal;
        color: ${config.colors.darkgrey}
    }

    label {
      align-items: flex-start;
    }
  }

  .lastsectionheading {
      margin: 2em 0 0.5em 0;
  }

  .messageField {
    margin-bottom: 2em;
  }

  button {
      width: 100%;

      ${media.s`
        width: initial;
    `} 
`;

const SignupForm = ({ street }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting }) => (
      <StyledForm>
        <Field
          name="firstName"
          component={TextField}
          label="Vorname"
          fullWidth
        />
        <ErrorMessage name="firstName" component="div" />
        <Field
          name="lastName"
          component={TextField}
          label="Nachname"
          fullWidth
        />
        <ErrorMessage name="lastName" component="div" />
        <Field
          type="email"
          name="email"
          component={TextField}
          label="E-Mail-Adresse"
          placeholder="beispiel@domain.de"
          fullWidth
        />
        <ErrorMessage name="email" component="div" />
        <div className="tosFieldGroup">
          <Field
            component={CheckboxWithLabel}
            name="tosAccepted"
            type="checkbox"
            Label={{
              label:
                'Ich willige ein, dass meine Daten an das Bezirksamt zum Zwecke einer Terminabspache und der Vernetzung mit anderen Bürger:innen übermittelt werden.'
            }}
          />
        </div>
        <h4>Teamkapitän:in</h4>
        <p>
          Wären Sie auch bereit, die Hauptverantwortung für die Betreuung der
          Spielstraße zu übernehmen und dafür eine{' '}
          <a className="external" href="">
            Kooperationsvereinbarung (PDF)
          </a>{' '}
          mit dem Bezirksamt zu unterzeichnen?
        </p>
        <Field component={RadioGroup} name="captain">
          <FormControlLabel
            value="yes"
            control={<Radio disabled={isSubmitting} />}
            label="Ja, das mache ich gerne"
            disabled={isSubmitting}
          />
          <FormControlLabel
            value="no"
            control={<Radio disabled={isSubmitting} />}
            label="Nein, das ist mir zu viel Verantworung"
            disabled={isSubmitting}
          />
        </Field>
        <h4 className="lastsectionheading">
          Ihre Nachricht an das Bezirksamt (optional):
        </h4>
        <Field
          component={TextField}
          className="messageField"
          name="message"
          multiline
          rows={4}
          fullWidth
          InputProps={{ notched: true }}
        />
        <Button flat>Formular absenden</Button>
      </StyledForm>
    )}
  </Formik>
);

export default SignupForm;
