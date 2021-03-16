/* eslint-disable jsx-a11y/label-has-associated-control */
import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import config from '~/apps/Gastro/config';

import Header from '../components/Header';
import SignupForm from '../components/SignupForm';
import Thanks from '../components/Thanks';

const Section = styled.section`
  border-bottom: 2px dashed ${config.colors.lightgrey};
  margin-bottom: 2em;

  &:last-child {
    border-bottom: none;
  }

  h1 {
    overflow-wrap: break-word;
  }
`;

const Signup = ({ district }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState(null);

  return (
    <>
      <Header showInfoLink />
      <Container maxWidth="sm">
        {isSubmitting && <p>Wird geladen</p>}
        {submission == null && (
          <>
            <Section>
              <h1>Interessens&shy;bekundung</h1>
              <p>
                <strong>
                  Bitte füllen Sie dieses Formular aus, um dem Bezirksamt Ihren
                  Bedarf mitzuteilen
                </strong>
              </p>
              <p>
                {district.apps.gastro.signup?.intro ||
                  `Ihre Bedarfsmeldung bedeutet keinen Anspruch auf die
            Bereitstellung einer Fläche. das Bezirksamt wird Sie nach
            Prüfung aller Meldungen zum weiteren Vorgehen kontaktieren.`}
              </p>
            </Section>
            <Section>
              <SignupForm onSuccess={setSubmission} onSubmit={setSubmitting} />
            </Section>
          </>
        )}
        {submission != null && <Thanks submission={submission} />}
      </Container>
    </>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(Signup);
