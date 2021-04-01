import { FormHelperText, LinearProgress } from '@material-ui/core';
import debug from 'debug';
import { Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';

import { Button } from '~/components2/Button';
import { Form } from '~/components2/Form';
import { media } from '~/styles/utils';

import SectionArea from './SectionArea';
import SectionBase from './SectionBase';
import SectionDescription from './SectionDescription';
import SectionEmail from './SectionEmail';
import SectionNotice from './SectionNotice';
import SectionParticipants from './SectionParticipants';
import SectionPrivacy from './SectionPrivacy';
import SectionTime from './SectionTime';
import { validate } from './validate';

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

export type FormData = {};

const initialValues: FormData = {};

const EventForm = ({ onSuccess }) => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={async (values, { setSubmitting, setStatus }) => {
      log('submitting', values);
    }}
  >
    {({ isValid, values, handleChange, isSubmitting, status }) => (
      <StyledForm>
        <h3>Bitte machen Sie Angaben zum Anstragsteller</h3>

        <SectionBase />
        {/* <SectionTime /> */}
        {/* <SectionParticipants /> */}
        {/* <SectionArea /> */}
        {/* <SectionDescription /> */}
        {/* <SectionNotice /> */}
        {/* <SectionEmail /> */}
        {/* <SectionPrivacy /> */}

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

export default EventForm;
