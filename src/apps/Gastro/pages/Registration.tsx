/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import styled from 'styled-components';

import config from '~/apps/Gastro/config';
import Header from '../components/Header';
import Thanks from '../components/ThanksRegistration';
import RegistrationForm from '../components/RegistrationForm';
import Logo from '~/apps/Gastro/components/Logo';
import api from '../api';
import regulations from '../regulations';
import { GastroSignup, GastroRegistration, GastroStatus } from '../types';
import { media } from '~/styles/utils';

const Section = styled.section`
  border-bottom: 2px dashed ${config.colors.lightgrey};
  margin-bottom: 2em;

  ${media.m`
    padding-bottom: 1em;
    margin-bottom: 2em;
  `};

  &:last-child {
    border-bottom: none;
  }

  h1 {
    overflow-wrap: break-word;

    ${media.m`
      margin: 2em 0 1em;
    `};
  }
`;

const process = (signupData) => ({
  ...signupData,
  shopfront_length: (0.01 * signupData.shopfront_length).toString()
});

// Return true if the application is locked because it has already been handled
const isLocked = ({ status }: { status: GastroStatus }) =>
  [
    'application_accepted',
    'application_rejected',
    'application_verification'
  ].includes(status);

const Registration = ({
  match: {
    params: { id, accessKey }
  },
  district
}) => {
  // Data from previous signup (Interessensbekundung)
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(null);
  const [signupData, setSignupData] = useState({} as GastroSignup);
  const [regulation, setRegulation] = useState({});

  // State for this registration
  const [submission, setSubmission] = useState<GastroRegistration>(null);

  useEffect(() => {
    const doLoad = async () => {
      let result: GastroRegistration;
      try {
        result = await api.get(id, accessKey, district);
        result = process(result);

        if (isLocked(result)) {
          setSubmission(result);
        }

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

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district
});

export default connect(mapStateToProps)(Registration);
