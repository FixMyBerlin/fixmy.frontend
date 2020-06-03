import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import { FormHelperText, LinearProgress } from '@material-ui/core';
import styled from 'styled-components';

import Button from '~/components2/Button';
import { Form } from '~/components2/Form';
import logger from '~/utils/logger';
import config from '~/pages/Gastro/config';
import { GastroRegistration } from '~/pages/Gastro/types';
import api from '~/pages/Gastro/api';
import validate from './validate';
import parseLength from '../../parseLength';

import SectionArea from './SectionArea';
import SectionCertificate from './SectionCertificate';
import SectionEmail from './SectionEmail';
import SectionNotice from './SectionNotice';
import SectionShopfrontLength from './SectionShopfrontLength';
import SectionUsage from './SectionUsage';
import SectionBase from './SectionBase';
import { media } from '~/styles/utils';

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
  opening_hours?: string;
  agreement_accepted?: boolean | '';
  tos_accepted?: boolean | '';
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
  regulation
}) => (
  <Formik
    initialValues={{ ...initialValues, ...signupData }}
    validate={validate}
    onSubmit={async (values, { setSubmitting, setStatus }) => {
      // @ts-ignore
      const registrationData: GastroRegistration = {
        ...signupData,
        ...values,
        id,
        access_key,
        shopfront_length: parseLength(values.shopfront_length),
        opening_hours: 'weekend',
        campaign: config.gastro.campaign
      };

      let uploadFailed = true;
      try {
        await api.uploadCertificate(registrationData);
        uploadFailed = false;
      } catch (e) {
        logger(e);
        setStatus(
          'Es gab leider einen Fehler beim Hochladen Ihrer Gewerbeanmeldung / Ihres Vereinsregisters. Bitte senden Sie dieses Dokument daher als Foto oder PDF per E-Mail an info@fixmyberlin.de'
        );
      }

      try {
        const response = await api.register(registrationData);
        // Additional field that is not part of the response
        //  this is to signal to the thanks page whether the upload
        // of the certificate file failed
        // @ts-ignore
        response.uploadFailed = uploadFailed;
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
    {({ isValid, values, handleChange, isSubmitting }) => (
      <StyledForm>
        <h3>Bitte vervollständigen Sie die Angaben zu Ihrem Betrieb:</h3>

        <SectionBase shopName={values.shop_name} signupData={signupData} />

        <h3>Bestimmung der Sondernutzungsfläche</h3>
        <SectionArea
          regulation={regulation}
          handleChange={handleChange}
          signupData={signupData}
          values={values}
        />

        <SectionShopfrontLength />
        <SectionUsage />
        <SectionCertificate isSubmitting={isSubmitting} values={values} />

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
              )
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

        <Button flat type="submit" disabled={isSubmitting}>
          Antrag absenden
        </Button>
      </StyledForm>
    )}
  </Formik>
);

export default RegistrationForm;
