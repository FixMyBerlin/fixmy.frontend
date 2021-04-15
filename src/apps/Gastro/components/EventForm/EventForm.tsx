import DateFnsUtils from '@date-io/date-fns';
import { FormHelperText, LinearProgress } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import dateFnsLocaleDE from 'date-fns/locale/de';
import debug from 'debug';
import { Formik } from 'formik';
import React, { useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import { Button } from '~/components2/Button';
import { Form } from '~/components2/Form';
import { RootState } from '~/store';
import { media } from '~/styles/utils';
import api from '../../api';

import { EventApplication } from '../../types';
import SectionArea from './SectionArea';
import SectionBase from './SectionBase';
import SectionDescription from './SectionDescription';
import SectionEmail from './SectionEmail';
import SectionNotice from './SectionNotice';
import SectionParticipants from './SectionParticipants';
import SectionPrivacy from './SectionPrivacy';
import SectionTime from './SectionTime';
import { getMinDate } from './utils';
import { validate } from './validate';

const logger = debug('fmc:Gastro:EventForm');

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

const log = debug('fmc:gastro:EventForm');

/* eslint-disable camelcase */
export type FormData = {
  org_name: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  date: Date;
  setup_start: Date;
  event_start: Date;
  event_end: Date;
  teardown_end: Date;
  num_participants: number;
  area_category: 'park' | 'parking';
  area: any;
  setup_sketch: File;
  title: string;
  description: string;
  details: string;
  insurance: File;
  agreement: File;
  public_benefit: File | null;
  email: string;
  tos_accepted: boolean;
  agreement_accepted: boolean;
};
/* eslint-enable camelcase */

const initialValues: FormData = {
  org_name: '',
  first_name: '',
  last_name: '',
  phone: '',
  address: '',
  date: null,
  setup_start: null,
  event_start: null,
  event_end: null,
  teardown_end: null,
  num_participants: null,
  area_category: null,
  area: null,
  setup_sketch: null,
  title: '',
  description: '',
  details: '',
  insurance: null,
  agreement: null,
  public_benefit: null,
  email: '',
  tos_accepted: null,
  agreement_accepted: null,
};

const connector = connect(({ AppState }: RootState) => ({
  district: AppState.district,
}));

type Props = ConnectedProps<typeof connector> & {
  onSuccess: (registrationData: EventApplication) => any;
};

const EventForm: React.FC<Props> = ({ district, onSuccess }) => {
  const minDate = useMemo<Date>(getMinDate, []);
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        const applicationData: EventApplication = {
          ...values,
          campaign: district.apps.gastro.currentCampaign,
        };

        delete applicationData.agreement;
        delete applicationData.setup_sketch;
        delete applicationData.insurance;
        delete applicationData.public_benefit;

        let response;
        try {
          response = await api.postEventApplication(applicationData, district);
          onSuccess(response);
        } catch (e) {
          logger(e);
          let errMsg: string;
          try {
            const data = await e.response?.json();
            // Data from api is always in camelcase
            // eslint-disable-next-line camelcase
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
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateFnsLocaleDE}>
          <StyledForm>
            <h3>Bitte machen Sie Angaben zum Anstragsteller</h3>

            <SectionBase />
            <SectionTime
              values={values}
              handleChange={handleChange}
              minDate={minDate}
            />
            <SectionParticipants isSubmitting={isSubmitting} />
            <SectionArea
              values={values}
              handleChange={handleChange}
              isSubmitting={isSubmitting}
            />
            <SectionDescription
              values={values}
              isSubmitting={isSubmitting}
              handleChange={handleChange}
            />
            <SectionNotice />
            <SectionEmail />
            <SectionPrivacy />

            {!isSubmitting && (
              <p>
                Klicken Sie auf &quot;Antrag absenden&quot; um Ihren Antrag
                formal beim Bezirksamt einzureichen.
              </p>
            )}

            {!isValid && (
              <p>
                <em>
                  Sie haben noch nicht alle benötigten Felder korrekt
                  ausgefüllt. Bitte beachten Sie die rot markierten Hinweise im
                  Formular oben.
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
        </MuiPickersUtilsProvider>
      )}
    </Formik>
  );
};

export default connector(EventForm);
