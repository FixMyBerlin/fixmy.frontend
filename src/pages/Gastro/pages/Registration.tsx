/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';

import config from '~/pages/Gastro/config';
import Header from '../components/Header';
import Thanks from '../components/Thanks';
import RegistrationForm from '../components/RegistrationForm';
import Logo from '~/pages/Gastro/components/Logo';
import api from '../api';
import logger from '~/utils/logger';

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

// 1
// 7770139d-a8b1-40ca-85db-a76a8dfed633

const Registration = ({
  match: {
    params: { id, accessKey }
  }
}) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signupData, setSignupData] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    const doLoad = async () => {
      let result;
      try {
        result = await api.get(id, accessKey);
        setSignupData(result);
      } catch (e) {
        setError(e.message);
        setLoading(false);
        throw e;
      }
    };
    doLoad();
  }, [id, accessKey]);

  return (
    <>
      <Header showInfoLink />
      <Container maxWidth="sm">
        {submission == null && (
          <>
            <Section>
              <h1>Antrag auf Einrichtung einer Sondernutzungs&shy;fläche</h1>
              <p>
                <strong>
                  Bitte füllen Sie dieses Formular aus, um eine
                  Sondernutzungsfläche für Ihren Betrieb / Verein beim
                  Bezirksamt Friedrichshain-Kreuzberg zu beantragen.
                </strong>
              </p>
              <p>
                Ein Antrag kann nur gestellt werden, wenn Sie zuvor eine
                Bedarfsmeldung über diese Webseite gemacht macht. Eine spätere
                Öffnung für weitere Betriebe ist geplant.
              </p>
            </Section>
            <Section>
              {isLoading && <p>Wird geladen...</p>}
              {error && <p>Fehler: {error}</p>}
              {!isLoading && !error && (
                <RegistrationForm
                  signupData={signupData}
                  onSuccess={setSubmission}
                  onSubmit={setSubmitting}
                />
              )}
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
