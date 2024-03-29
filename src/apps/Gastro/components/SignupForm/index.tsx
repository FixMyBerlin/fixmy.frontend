import {
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Radio,
  LinearProgress,
} from '@material-ui/core';
import debug from 'debug';
import { Formik, Field, ErrorMessage } from 'formik';
import {
  TextField,
  CheckboxWithLabel,
  Select,
  RadioGroup,
} from 'formik-material-ui';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import api from '~/apps/Gastro/api';
import { GastroSignup } from '~/apps/Gastro/types';
import { Button } from '~/components2/Button';
import { Form } from '~/components2/Form';
import { LocationPicker } from '~/components2/LocationPicker';

import parseLength from '../../parseLength';
import validate from './validate';

const logger = debug('fmc:Gastro:Signup');

/* eslint-disable camelcase */
export interface FormData {
  shop_name?: string;
  first_name?: string;
  last_name?: string;
  category?: string;
  email?: string;
  address?: string;
  location?: [number, number];
  shopfront_length?: string;
  opening_hours?: string;
  tos_accepted?: boolean | '';
}
/* eslint-enable camelcase */

const emptyForm: FormData = {
  shop_name: '',
  first_name: '',
  last_name: '',
  category: '',
  email: '',
  address: '',
  location: null,
  opening_hours: null,
  shopfront_length: '',
  tos_accepted: '',
};

const testValues: FormData = {
  shop_name: 'Test',
  first_name: 'Snackmaster',
  last_name: 'Chunk',
  category: '',
  email: 'fixmy-98@vincentahrend.com',
  address: 'Keithstraße, 12307 Berlin',
  location: [13.40994, 52.37997],
  opening_hours: 'whole_week',
  shopfront_length: '5',
  tos_accepted: true,
};

const initialValues =
  process.env.NODE_ENV === 'development' ? testValues : emptyForm;

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
  .dropdown {
    margin-bottom: 1em;
  }
`;

const SignupForm = ({ onSuccess, onSubmit, district }) => (
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
          coordinates: values.location,
        },
        shopfront_length: parseLength(values.shopfront_length),
        campaign: district.name,
        opening_hours: district.apps.gastro.model.opening_hours
          ? values.opening_hours
          : 'weekend',
        category: district.apps.gastro.model.category
          ? values.category
          : 'other',
      };
      try {
        const response = await api.signup(signupData, district);
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
    {({ status, handleChange, isSubmitting }) => (
      <StyledForm>
        <section>
          <h4>Bitte machen Sie Angaben zu Ihrem Betrieb:</h4>
          <Field
            name="shop_name"
            component={TextField}
            label="Name des Betriebs"
            fullWidth
          />

          <ErrorMessage
            name="category"
            render={(msg) => <FormError error>{msg}</FormError>}
          />
          {district.apps.gastro.model.category && (
            <div className="dropdown">
              <FormControl fullWidth>
                <InputLabel htmlFor="category">
                  Art des Betriebs wählen
                </InputLabel>
                <Field
                  component={Select}
                  name="category"
                  inputProps={{
                    id: 'category',
                  }}
                >
                  <MenuItem value="restaurant">Restaurant</MenuItem>
                  <MenuItem value="retail">Einzelhandel mit Auslage</MenuItem>
                  <MenuItem value="workshop">Werkstatt</MenuItem>
                  <MenuItem value="social">Soziales Projekt</MenuItem>
                  <MenuItem value="other">Sonstiger Bedarf</MenuItem>
                </Field>
              </FormControl>
            </div>
          )}
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
        </section>
        <section>
          <h4>Wo befindet sich das Ladenlokal?</h4>
          <p>Es können nur Adressen in {district.title} gemeldet werden.</p>
          <ErrorMessage
            name="address"
            render={(msg) => <FormError error>{msg}</FormError>}
          />
          <LocationPicker
            mapboxStyle={district.apps.gastro.maps.gastroSignup.mapboxStyle}
            bounds={district.bounds}
            onSelect={({ address, location }) => {
              handleChange({ target: { name: 'address', value: address } });
              handleChange({
                target: {
                  name: 'location',
                  value: [location.lng, location.lat],
                },
              });
            }}
          />
          {/* <MapLocator location={values.location} /> */}
        </section>
        <section>
          <p>
            <strong>
              Wie breit ist die Häuserfront ihres Ladenlokals (falls vorhanden)?
            </strong>
          </p>
          <p>
            {district.apps.gastro.signup.shopfrontLabel ||
              `Auf Grundlage der Straßenfront-Breite kann das Bezirksamt
            entscheiden welcher Raum im Straßenland genutzt werden kann. Sofern
            sie kein Ladenlokal haben bitte 0 angeben.`}
          </p>
          <Field
            name="shopfront_length"
            type="text"
            inputMode="numeric"
            pattern="[0-9]+(,[0-9]+)?"
            component={TextField}
            label="Angabe in Metern z.B. 4,8"
            fullWidth
          />
        </section>

        <section>
          <h4>In welchem Zeitraum würden Sie die Fläche gerne nutzen?</h4>
          <Field component={RadioGroup} name="opening_hours">
            <FormControlLabel
              value="weekend"
              control={<Radio disabled={isSubmitting} />}
              label="Am Wochenende (Freitags von 10 Uhr bis Sonntags 22 Uhr)"
              disabled={isSubmitting}
            />
            <FormControlLabel
              value="workdays"
              control={<Radio disabled={isSubmitting} />}
              label="Werktags (Montag bis Freitags, jeweils 10 bis 22 Uhr)"
              disabled={isSubmitting}
            />
            <FormControlLabel
              value="whole_week"
              control={<Radio disabled={isSubmitting} />}
              label="Die ganze Woche. (Mo bis Sonntags jeweils von 10 bis 22 Uhr)"
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

        <div className="checkboxFieldGroup">
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
                  Kommunikation im Zuge der Nutzung der Sonderflächen ein.
                </span>
              ),
            }}
          />
        </div>

        {isSubmitting && <LinearProgress />}

        {status && (
          <p>
            <strong>{status}</strong>
          </p>
        )}

        <Button flat type="submit">
          Interessensbekundung absenden
        </Button>
      </StyledForm>
    )}
  </Formik>
);

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(SignupForm);
