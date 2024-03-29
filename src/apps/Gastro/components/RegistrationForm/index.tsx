import { FormHelperText, LinearProgress } from '@material-ui/core';
import debug from 'debug';
import { Formik, Field, ErrorMessage } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import api from '~/apps/Gastro/api';
import { GastroRegistration } from '~/apps/Gastro/types';
import { Button } from '~/components2/Button';
import { Form } from '~/components2/Form';
import { media } from '~/styles/utils';

import parseLength from '../../parseLength';
import SectionArea from './SectionArea';
import SectionBase from './SectionBase';
import SectionCertificate from './SectionCertificate';
import SectionEmail from './SectionEmail';
import SectionNotice from './SectionNotice';
import SectionUsage from './SectionUsage';
import { validate } from './validate';

const logger = debug('fmc:Gastro:Registration');

/* eslint-disable camelcase */
export interface FormData {
  shop_name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  category?: string;
  email?: string;
  address?: string;
  location?: [number, number];
  shopfront_length?: string;
  usage?: string;
  certificate?: string;
  certificateS3?: string;
  opening_hours?: string;
  agreement_accepted?: boolean | '';
  tos_accepted?: boolean | '';
  followup_accepted?: boolean | '';
  area?: any;
}
/* eslint-enable camelcase */

const initialValues: FormData = {
  shop_name: '',
  first_name: '',
  last_name: '',
  phone: '',
  category: '',
  email: '',
  address: '',
  location: null,
  shopfront_length: '',
  usage: '',
  certificate: null,
  agreement_accepted: '',
  tos_accepted: '',
  followup_accepted: '',
  area: null,
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

    ${media.m`
      margin-bottom: 4em;
    `}
  }

  .MuiTextField-root,
  .dropdown {
    margin-bottom: 1em;
  }
`;

const RegistrationForm = ({
  id,
  // eslint-disable-next-line camelcase
  access_key,
  onSuccess,
  signupData,
  regulation,
  district,
}) => (
  <Formik
    initialValues={{ ...initialValues, ...signupData }}
    validate={validate(regulation)}
    onSubmit={async (values, { setSubmitting, setStatus }) => {
      // @ts-ignore
      const registrationData: GastroRegistration = {
        ...signupData,
        ...values,
        id,
        // eslint-disable-next-line camelcase
        access_key,
        shopfront_length: parseLength(values.shopfront_length),
        opening_hours: 'weekend',
        campaign: district.apps.gastro.currentCampaign,
      };

      try {
        await api.uploadCertificate(registrationData, district);
      } catch (e) {
        logger(e);
        setStatus(
          'Das Hochladen Ihrer Gewerbeanmeldung / Ihres Vereinsregisters ist fehlgeschlagen. Bitte prüfen Sie Ihre Internetverbindung und versuchen es erneut.'
        );
      }

      try {
        const response = await api.register(registrationData, district);
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
    {({ isValid, values, handleChange, isSubmitting, status }) => (
      <StyledForm>
        <h3>Bitte vervollständigen Sie die Angaben zu Ihrem Betrieb:</h3>

        <SectionBase
          shopName={values.shop_name}
          signupData={signupData}
          handleChange={handleChange}
          values={values}
        />

        <h3>Bestimmung der Sondernutzungsfläche</h3>
        <SectionArea
          regulation={regulation}
          handleChange={handleChange}
          signupData={signupData}
          values={values}
        />

        <SectionUsage />
        <SectionCertificate
          isSubmitting={isSubmitting}
          values={values}
          handleChange={handleChange}
        />

        <SectionNotice />
        <SectionEmail />

        <div className="checkboxFieldGroup">
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
          <ErrorMessage
            name="tos_accepted"
            render={(msg) => <FormError error>{msg}</FormError>}
          />
        </div>

        {!isSubmitting && (
          <p>
            Klicken Sie auf &quot;Antrag absenden&quot; um Ihren Antrag formal
            beim Bezirksamt einzureichen.
          </p>
        )}

        {!isValid && (
          <p>
            <em>
              Sie haben noch nicht alle benötigten Felder korrekt ausgefüllt.
              Bitte beachten Sie die rot markierten Hinweise im Formular oben.
            </em>
          </p>
        )}

        {isSubmitting && <LinearProgress />}

        {status && (
          <p>
            <strong>{status}</strong>
          </p>
        )}

        <Button flat type="submit" disabled={isSubmitting}>
          Antrag absenden
        </Button>
      </StyledForm>
    )}
  </Formik>
);

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(RegistrationForm);
