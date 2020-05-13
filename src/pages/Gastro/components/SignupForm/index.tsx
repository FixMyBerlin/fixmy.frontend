import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import {
  TextField,
  CheckboxWithLabel,
  RadioGroup,
  Select
} from 'formik-material-ui';
import {
  FormControlLabel,
  Radio,
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import styled from 'styled-components';

import Button from '~/components2/Button';
import { Form } from '~/components2/Form';
import logger from '~/utils/logger';
import config from '~/pages/Gastro/config';
import { GastroSignup } from '~/pages/Gastro/types';
import api from '~/pages/Gastro/api';
import validate from './validate';
// import MapLocator from '~/components2/MapLocator';
// import AutocompleteGeocoder from '~/components/AutocompleteGeocoder';

/* eslint-disable camelcase */
export interface FormData {
  shop_name?: string;
  first_name?: string;
  last_name?: string;
  category?: string;
  email?: string;
  address?: string;
  location?: [number, number];
  shopfront_length?: number | '';
  opening_hours?: string;
  tos_accepted?: boolean | '';
}
/* eslint-enable camelcase */

const initialValues: FormData = {
  shop_name: '',
  first_name: '',
  last_name: '',
  category: '',
  email: '',
  address: '',
  location: null,
  shopfront_length: '',
  opening_hours: '',
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

  .MuiTextField-root,
  MuiInputBase-formControl {
    margin-bottom: 1em;
  }
`;

const SignupForm = ({ onSuccess, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={async (values, { setSubmitting, setStatus }) => {
      onSubmit(true);
      // @ts-ignore
      const signupData: GastroSignup = {
        ...values,
        geometry: {
          type: 'Point',
          coordinates: [1, 0]
        },
        shopfront_length: Math.round((values.shopfront_length as number) * 100),
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
      onSubmit(false);
      setSubmitting(false);
    }}
  >
    {({ status, values, handleChange, isSubmitting }) => (
      <StyledForm>
        <section>
          <h4>Bitte machen Sie Angaben zu Ihrem Betrieb:</h4>
          <Field
            name="shop_name"
            component={TextField}
            label="Name des Betriebes"
            fullWidth
          />

          <ErrorMessage
            name="category"
            render={(msg) => <FormError error>{msg}</FormError>}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="category">Art des Betriebs</InputLabel>
            <Field
              component={Select}
              name="category"
              inputProps={{
                id: 'category'
              }}
            >
              <MenuItem value="restaurant">Restaurant / Imbiss</MenuItem>
              <MenuItem value="cafe">Café</MenuItem>
              <MenuItem value="shop">Einzelhandel</MenuItem>
              <MenuItem value="coiffeur">Frisör</MenuItem>
            </Field>
          </FormControl>
          <Field
            name="first_name"
            component={TextField}
            label="Vorname der Inhaber:in"
            fullWidth
          />
          <Field
            name="last_name"
            component={TextField}
            label="Nachname der Inhaber:in"
            fullWidth
          />
          <Field
            name="address"
            component={TextField}
            label="Straße, Hausnummer, PLZ"
            fullWidth
          />
          {/* <MapLocator location={values.location} /> */}
        </section>
        <section>
          <p>
            <strong>Wie breit ist die Straßenfront ihres Ladenlokals?</strong>
          </p>
          <p>
            Auf Grundlage der Straßenfront-Breite kann das Bezirksamt
            entscheiden welcher Raum genutzt werden kann und wie viele
            Sitzplätze dort eingerichtet werden können.
          </p>
          <Field
            name="shopfront_length"
            type="number"
            component={TextField}
            label="Angabe in Metern z.B. 4,8"
            fullWidth
          />
        </section>

        <section>
          <h4>
            In welchem Zeitraum würden Sie die zusätzlichen Flächen gerne
            nutzen?
          </h4>

          <ErrorMessage
            name="opening_hours"
            render={(msg) => <FormError error>{msg}</FormError>}
          />
          <Field component={RadioGroup} name="opening_hours">
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
        </section>

        <section>
          <h4>Ihre E-Mail-Adresse</h4>
          <p className="subline">
            Das Bezirksamt kontaktiert Sie über diese Adresse nach Auswertung
            der Bedarfe zum weiteren Vorgehen.
          </p>
          <Field
            name="email"
            component={TextField}
            label="Ihre E-Mail-Adresse"
            fullWidth
          />
        </section>

        <div className="tosFieldGroup">
          <ErrorMessage
            name="tos_accepted"
            render={(msg) => <FormError error>{msg}</FormError>}
          />
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
