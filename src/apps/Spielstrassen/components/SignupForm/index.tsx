import { FormHelperText } from '@material-ui/core';
import { Formik, Field, ErrorMessage } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { generatePath, useHistory } from 'react-router-dom';
import slugify from 'slugify';
import styled from 'styled-components';

import { Button } from '~/components2/Button';
import { Form } from '~/components2/Form';
import config from '~/config';
import { RootState } from '~/store';
import { DistrictConfig } from '~/types';
import logger from '~/utils/logger';

import api from '../../api';
import { SignupData } from '../../types';
import validate from './validate';

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  tos_accepted: false,
  captain: 'no',
  message: '',
};

const FormError = styled(FormHelperText)`
  && {
    font-size: 1em;
    line-height: normal;
    margin: 2em auto;
  }
`;

const StyledForm = styled(Form)`
  .lastsectionheading {
    margin: 2em 0 0.5em 0;
  }

  .messageField {
    margin-bottom: 2em;
  }
`;

const connector = connect(({ AppState }: RootState) => ({
  district: AppState.district,
}));

type Props = ConnectedProps<typeof connector> & {
  street: string;
  district: DistrictConfig;
};

const SignupForm = ({ street, district }: Props) => {
  const history = useHistory();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    const signupData: SignupData = {
      ...values,
      captain: false,
      campaign: district.name,
      street,
    };
    logger(JSON.stringify(signupData, null, 2));
    try {
      await api.signup(signupData, district);
      history.push(
        generatePath(config.routes.spielstrassen.thanks, {
          slug: slugify(street, { lower: true }),
        })
      );
    } catch (e) {
      logger(e);
      setStatus(
        'Es gab leider einen Fehler bei deiner Anmeldung. Bitte versuche es später noch einmal.'
      );
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ status, isSubmitting }) => (
        <StyledForm>
          <Field
            name="first_name"
            component={TextField}
            label="Vorname"
            fullWidth
          />
          <Field
            name="last_name"
            component={TextField}
            label="Nachname"
            fullWidth
          />
          <Field
            type="email"
            name="email"
            component={TextField}
            label="E-Mail-Adresse"
            placeholder="beispiel@domain.de"
            fullWidth
          />

          <ErrorMessage
            name="tos_accepted"
            render={(msg) => <FormError error>{msg}</FormError>}
          />
          <div className="checkboxFieldGroup">
            <Field
              component={CheckboxWithLabel}
              name="tos_accepted"
              type="checkbox"
              Label={{
                label:
                  'Ich willige ein, dass meine Daten an das Bezirksamt zum Zwecke einer Terminabspache und der Vernetzung mit anderen Bürger:innen übermittelt werden.',
              }}
            />
          </div>
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
          {status && <FormError error>{status}</FormError>}
          <Button flat type="submit">
            Formular absenden
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default connector(SignupForm);
