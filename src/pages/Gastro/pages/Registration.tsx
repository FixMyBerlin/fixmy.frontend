/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';

import config from '~/pages/Gastro/config';
import Header from '../components/Header';
import Thanks from '../components/ThanksRegistration';
import RegistrationForm from '../components/RegistrationForm';
import Logo from '~/pages/Gastro/components/Logo';
import api from '../api';
import logger from '~/utils/logger';
import regulations from '../regulations';
import { GastroSignup } from '../types';

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

const process = (signupData) => ({
  ...signupData,
  shopfront_length: (0.01 * signupData.shopfront_length).toString()
});

const Registration = ({
  match: {
    params: { id, accessKey }
  }
}) => {
  // Data from previous signup (Interessensbekundung)
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signupData, setSignupData] = useState({} as GastroSignup);
  const [regulation, setRegulation] = useState({});

  // State for this registration
  const [isSubmitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    const doLoad = async () => {
      let result;
      try {
        result = await api.get(id, accessKey);
        result = process(result);
        setRegulation(regulations[result.regulation]);
        setSignupData(result);
      } catch (e) {
        if (e.message === 'Unauthorized') {
          setError(
            'Ungültige Zugangsdaten. Bitte prüfen Sie, ob Sie den exakten Link aus unserer E-Mail aufgerufen haben.'
          );
        } else {
          setError(e.message);
        }
        setLoading(false);
        throw e;
      }
      setLoading(false);
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
              {isLoading && <p>Ihre Interessensbekundung wird geladen...</p>}
              {error && (
                <p>
                  <strong>Fehler: {error}</strong>
                </p>
              )}
              {!isLoading && !error && (
                <RegistrationForm
                  id={id}
                  access_key={accessKey}
                  signupData={signupData}
                  regulation={regulation}
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
