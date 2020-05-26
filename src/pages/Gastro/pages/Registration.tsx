/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';

import config from '~/pages/Gastro/config';
import Header from '../components/Header';
import Thanks from '../components/Thanks';
import RegistrationForm from '../components/RegistrationForm';
import Logo from '~/pages/Gastro/components/Logo';

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

const Registration = () => {
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
              <h1>Antrag auf Einrichtung einer Sondernutzungsfläche</h1>
              <p>
                <strong>
                  Bitte füllen Sie dieses Formular aus um eine
                  Sondernutzungsfläche für Ihren Betrieb / Verein beim
                  Bezirksamt Firedrichshai-Kreuzberg zu beantragen.
                </strong>
              </p>
              <p>
                Ein Antrag kann nur gestellt werden, wenn Sie zuvor eine
                Bedarfsmeldung über diese Webseite gemacht macht. Eine spätere
                Öffnung für weitere Betriebe ist geplant.
              </p>
            </Section>
            <Section>
              <RegistrationForm
                onSuccess={setSubmission}
                onSubmit={setSubmitting}
              />
            </Section>
          </>
        )}
        {submission != null && <Thanks submission={submission} />}
        <Logo />
      </Container>
    </>
  );
};

export default Registration;
