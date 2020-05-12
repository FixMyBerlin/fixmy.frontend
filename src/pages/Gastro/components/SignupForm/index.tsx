import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { TextField, CheckboxWithLabel, RadioGroup } from 'formik-material-ui';
import { FormControlLabel, Radio, FormHelperText } from '@material-ui/core';
import styled from 'styled-components';
import slugify from 'slugify';

import config from '~/config';
import Button from '~/components2/Button';
import { Form } from '~/components2/Form';
import Slider from '~/components/Slider';
import { media } from '~/styles/utils';
import logger from '~/utils/logger';
// import { SignupData } from '../../types';
// import api from '../../api';
// import logger from '~/utils/logger';
// import validate from './validate';

/* eslint-disable camelcase */
interface FormData {
  name?: string;
  email?: string;
  address?: string;
  area_requested?: number;
  time_requested?: string;
  agreed_agreement?: boolean;
  tos_accepted?: boolean;
}
/* eslint-enable camelcase */

const initialValues: FormData = {
  name: '',
  email: '',
  address: '',
  area_requested: 4,
  time_requested: '',
  agreed_agreement: '',
  tos_accepted: ''
};

const FormError = styled(FormHelperText)`
  && {
    font-size: 1em;
    line-height: normal;
    margin: 2em auto;
  }
`;

const StyledForm = styled(Form)`
  section {
    margin-bottom: 2em;
  }
`;

const SliderWrapper = styled.div`
  margin: 2em 1em;
`;

const SignupForm = ({ onSuccess, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting, setStatus }) => {
      logger(values);
      onSubmit();
      setTimeout(() => onSuccess(values), 1000);
    }}
  >
    {({ status, values, handleChange, isSubmitting }) => (
      <StyledForm>
        <section>
          <Field
            name="name"
            component={TextField}
            label="Name ihres Gastronomiebetriebs"
            fullWidth
          />
          <Field
            name="address"
            component={TextField}
            label="Adresse"
            fullWidth
          />
        </section>
        <section>
          <p>
            <strong>
              Wie viele Sitzplätze möchten Sie gerne im Straßenraum anbieten?
            </strong>
          </p>
          <p>
            Info: Zwischen den einzelnen Tischen sollten X Meter Platz gehalten
            werden. Das Aufstellen von Tischen für große Gruppen ist nicht
            erlaubt.
          </p>
          <SliderWrapper>
            <Slider
              min={4}
              max={100}
              step={4}
              marks={{ 4: 4, 100: 100 }}
              name="area_requested"
              value={values.area_requested}
              tooltip={false}
              handleLabel={values.area_requested.toString()}
              onChange={(value) =>
                handleChange({ target: { value, name: 'area_requested' } })
              }
            />
          </SliderWrapper>
        </section>

        <div>
          <h4>
            In welchem Zeitraum würden Sie die zusätzlichen Flächen gerne
            nutzen?
          </h4>

          <ErrorMessage
            name="captain"
            render={(msg) => <FormError error>{msg}</FormError>}
          />
          <Field component={RadioGroup} name="time_requested">
            <FormControlLabel
              value="weekend"
              control={<Radio disabled={isSubmitting} />}
              label="Nur am Wochenende (Freitags von 11 Uhr bis Sonntags 22 Uhr)"
              disabled={isSubmitting}
            />
            <FormControlLabel
              value="week"
              control={<Radio disabled={isSubmitting} />}
              label="Die ganze Woche (Mo-So jeweils von 11 bis 22 Uhr)"
              disabled={isSubmitting}
            />
          </Field>
        </div>

        <h4>
          Wären Sie bereit, bei Einrichtung einer Gastro-Straße folgende{' '}
          <a href="/" className="external">
            Kooperationsvereinbarung
          </a>{' '}
          zu unterschreiben?
        </h4>

        <ErrorMessage
          name="agreed_agreement"
          render={(msg) => <FormError error>{msg}</FormError>}
        />
        <Field component={RadioGroup} name="time_requested">
          <FormControlLabel
            value="1"
            control={<Radio disabled={isSubmitting} />}
            label="Ja"
            disabled={isSubmitting}
          />
          <FormControlLabel
            value="0"
            control={<Radio disabled={isSubmitting} />}
            label="Nein"
            disabled={isSubmitting}
          />
        </Field>
        <h4>Ihre E-Mail-Adresse</h4>
        <p>
          Das Bezirksamt kontaktiert Sie über diese Adresse nach Auswertung der
          Bedarfe zum weiteren Vorgehen.
        </p>
        <Field
          name="email"
          component={TextField}
          label="Ihre E-Mail-Adresse"
          fullWidth
        />
        <ErrorMessage
          name="tos_accepted"
          render={(msg) => <FormError error>{msg}</FormError>}
        />
        <div className="tosFieldGroup">
          <Field
            component={CheckboxWithLabel}
            name="tos_accepted"
            type="checkbox"
            Label={{
              label: (
                <span>
                  Ich habe die{' '}
                  <a
                    href="/datenschutz"
                    target="_blank"
                    rel="noreferrer nofollow"
                    className="internal"
                  >
                    Datenschutzvereinbarung
                  </a>{' '}
                  gelesen und willige in die Speicherung meiner Daten zur
                  Kommunikation im Zuge der Gastro-Sonderflächen ein.
                </span>
              )
            }}
          />
        </div>
        <Button flat type="submit">
          Interessensbekundung absenden
        </Button>
      </StyledForm>
    )}
  </Formik>
);

export default SignupForm;
