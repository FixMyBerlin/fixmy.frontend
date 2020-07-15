import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import { FormHelperText, LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from '~/components2/Button';
import { Form } from '~/components2/Form';
import logger from '~/utils/logger';
import config from '~/apps/Gastro/config';
import { GastroRegistration } from '~/apps/Gastro/types';
import api from '~/apps/Gastro/api';
import { validateDirect } from './validate';
import parseLength from '../../parseLength';
import { FormData } from '.';

import SectionArea from './SectionArea';
import SectionCertificate from './SectionCertificate';
import SectionEmail from './SectionEmail';
import SectionNotice from './SectionNotice';
import SectionShopfrontLength from './SectionShopfrontLength';
import SectionUsage from './SectionUsage';
import SectionBase from './SectionBase';
import { media } from '~/styles/utils';
import regulations from '../../regulations';

const testValues: FormData = {
  address: 'Köpenicker Straße 5, 10997 Berlin',
  agreement_accepted: true,
  area: {
    coordinates: [
      [
        [13.440466533730415, 52.50187566721448],
        [13.440556387732016, 52.501931997251006],
        [13.440387408564675, 52.50201690035837],
        [13.440302918980336, 52.50195893767781],
        [13.440466533730415, 52.50187566721448]
      ]
    ],
    type: 'Polygon'
  },
  certificateS3: 'unit_test_data/test.txt',
  category: 'retail',
  email: 'fixmy056@vincentahrend.com',
  first_name: 'Snackmaster',
  last_name: 'Chunk',
  location: [13.440547, 52.501977],
  phone: '42343',
  shop_name: 'Test Shoppe',
  shopfront_length: '4,8',
  tos_accepted: true,
  usage: 'Normal'
};

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
  area: null
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

const DirectRegistrationForm = ({
  // eslint-disable-next-line camelcase
  onSuccess,
  district
}) => (
  <Formik
    initialValues={
      process.env.NODE_ENV === 'production' ? initialValues : testValues
    }
    validate={validateDirect}
    onSubmit={async (values, { setSubmitting, setStatus }) => {
      // @ts-ignore
      const registrationData: GastroRegistration = {
        ...values,
        campaign: district.name,
        geometry: {
          type: 'Point',
          coordinates: values.location
        },
        shopfront_length: parseLength(values.shopfront_length),
        opening_hours: district.apps.gastro.model.opening_hours
          ? values.opening_hours
          : 'weekend',
        category: district.apps.gastro.model.category
          ? values.category
          : 'other'
      };

      delete registrationData.certificate;

      let response;
      try {
        response = await api.registerDirect(registrationData, district);
        // Additional field that is not part of the response
        //  this is to signal to the thanks page whether the upload
        // of the certificate file failed
        // @ts-ignore
        response.uploadFailed = false;
        onSuccess(response);
      } catch (e) {
        logger(e);
        let errMsg: string;
        try {
          const data = await e.response?.json();
          if (data?.non_field_errors) {
            errMsg = data.non_field_errors.next();
          }
        } catch (e1) {
          logger(e1);
        }
        if (!errMsg)
          errMsg = `Es gab leider einen Fehler bei Ihrer Anmeldung. Bitte versuchen 
            Sie es später noch einmal.`;
        setStatus(errMsg);
      }
      setSubmitting(false);
    }}
  >
    {({ isValid, values, handleChange, isSubmitting, status }) => (
      <StyledForm>
        <h3>Bitte machen Sie Angaben zu Ihrem Betrieb / Verein:</h3>

        <SectionBase handleChange={handleChange} values={values} />

        <h3>Bestimmung der Sondernutzungsfläche</h3>
        <SectionArea
          regulation={regulations[0]}
          handleChange={handleChange}
          values={values}
        />

        <SectionShopfrontLength />
        <SectionUsage />
        <SectionCertificate
          isSubmitting={isSubmitting}
          values={values}
          handleChange={handleChange}
        />

        <SectionNotice values={values} />
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
  district: AppState.district
});

export default connect(mapStateToProps)(DirectRegistrationForm);
