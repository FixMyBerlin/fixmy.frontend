import DateFnsUtils from '@date-io/date-fns';
import { FormHelperText, LinearProgress } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { format } from 'date-fns';
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
  num_participants: string;
  area_category: 'park' | 'parking';
  area: any;
  setup_sketch: File;
  setup_sketchS3?: string;
  title: string;
  description: string;
  details: string;
  insurance: File;
  insuranceS3?: string;
  agreement: File;
  agreementS3?: string;
  public_benefit: File | null;
  public_benefitS3?: string;
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

const testValues: FormData = {
  org_name: '',
  first_name: 'Marty',
  last_name: 'Party',
  phone: '030 123 45 67',
  address: 'Mondstraße 30, 12345 Berlin',
  date: new Date('2021-08-14T22:00:00.000Z'),
  setup_start: new Date('2021-08-15T08:00:00.000Z'),
  event_start: new Date('2021-08-15T10:00:00.000Z'),
  event_end: new Date('2021-08-15T16:00:00.000Z'),
  teardown_end: new Date('2021-08-15T18:00:00.000Z'),
  num_participants: '1',
  area_category: 'park',
  area: {
    coordinates: [
      [
        [13.410535484940738, 52.49072668774559],
        [13.410577657647309, 52.490692449689845],
        [13.41022621842427, 52.490529818559736],
        [13.41018638864611, 52.49056548333263],
        [13.410535484940738, 52.49072668774559],
      ],
    ],
    type: 'Polygon',
  },
  title: 'Mondscheinparty (aber tagsüber)',
  description: 'Gesänge und anbeeten des Mondes',
  details: 'Das hier ist das Veranstaltungskonzept.\n\nHier ist ein Absatz.',
  email: 'test-076@vincentahrend.com',
  tos_accepted: true,
  agreement_accepted: true,
  insurance: null,
  insuranceS3: 'xhain2021/events/insurance/2021-04-15_16-03-37/test.pdf',
  agreement: null,
  agreementS3: 'xhain2021/events/agreement/2021-04-15_16-03-58/test.pdf',
  public_benefit: null,
  public_benefitS3:
    'xhain2021/events/public_benefit/2021-04-15_16-04-09/test.pdf',
  setup_sketch: null,
  setup_sketchS3: null,
};

const connector = connect(({ AppState }: RootState) => ({
  district: AppState.district,
}));

type Props = ConnectedProps<typeof connector> & {
  onSuccess: (registrationData: EventApplication) => any;
};

const isProduction = process.env.NODE_ENV === 'production';

const EventForm: React.FC<Props> = ({ district, onSuccess }) => {
  const minDate = useMemo<Date>(getMinDate, []);
  return (
    <Formik
      initialValues={isProduction ? initialValues : testValues}
      validate={validate}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        const applicationData: EventApplication = {
          ...values,
          campaign: district.apps.gastro.currentCampaign,
          date: format(values.date, 'yyyy-MM-dd'),
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
              errMsg = data.non_field_errors.pop();
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
            <SectionTime minDate={minDate} />
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
