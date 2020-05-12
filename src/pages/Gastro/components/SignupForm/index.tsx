import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { TextField, CheckboxWithLabel, RadioGroup } from 'formik-material-ui';
import { FormControlLabel, Radio, FormHelperText } from '@material-ui/core';
import styled from 'styled-components';
import slugify from 'slugify';

import Button from '~/components2/Button';
import MapLocator from '~/components2/MapLocator';
import { Form } from '~/components2/Form';
import Slider from '~/components/Slider';
import logger from '~/utils/logger';
import config from '~/pages/Gastro/config';
import { GastroSignup } from '~/pages/Gastro/types';
import api from '~/pages/Gastro/api';
import validate from './validate';
import AutocompleteGeocoder from '~/components/AutocompleteGeocoder';

/* eslint-disable camelcase */
export interface FormData {
  name?: string;
  email?: string;
  address?: string;
  location?: [number, number];
  seats_requested?: number;
  time_requested?: string;
  accepts_agreement?: boolean | '';
  tos_accepted?: boolean | '';
}
/* eslint-enable camelcase */

const initialValues: FormData = {
  name: '',
  email: '',
  address: '',
  location: null,
  seats_requested: 4,
  time_requested: '',
  accepts_agreement: '',
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
    validate={validate}
    onSubmit={async (values, { setSubmitting, setStatus }) => {
      // @ts-ignore
      const signupData: GastroSignup = {
        ...values,
        geometry: {
          type: 'Point',
          coordinates: values.location
        },
        campaign: config.gastro.campaign
      };
      try {
        const response = await api.signup(signupData);
        onSuccess(response);
      } catch (e) {
        logger(e);
        setStatus(
          'Es gab leider einen Fehler bei Ihrer Anmeldung. Bitte versuchen Sie es später noch einmal.'
        );
      }
      setSubmitting(false);
    }}
  >
    {({ status, values, handleChange, isSubmitting }) => (
      <StyledForm>
        <section>
          <h4>Name ihres Gastronomiebetriebs</h4>
          <Field name="name" component={TextField} label="Name" fullWidth />
          <h4>Adresse Ihres Betriebes</h4>
          <AutocompleteGeocoder
            onInputFocus={() => logger('focus')}
            onInputBlur={() => logger('focus off')}
            onLocationPick={({ address, coords: { lng, lat } }) => {
              handleChange({ target: { value: address, name: 'address' } });
              handleChange({ target: { value: [lng, lat], name: 'geometry' } });
            }}
            onSearchStart={logger}
            searchStringMinLength={3}
            debounceTime={300}
            onError={logger}
            label="Adresse hier suchen..."
          />
          <MapLocator location={values.location} />
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
              name="seats_requested"
              value={values.seats_requested}
              tooltip={false}
              handleLabel={values.seats_requested.toString()}
              onChange={(value) =>
                handleChange({ target: { value, name: 'seats_requested' } })
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
            name="time_requested"
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
          name="accepts_agreement"
          render={(msg) => <FormError error>{msg}</FormError>}
        />
        <Field component={RadioGroup} name="accepts_agreement">
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
