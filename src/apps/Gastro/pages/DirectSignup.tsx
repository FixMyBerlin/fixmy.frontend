/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import styled from 'styled-components';

import config from '~/apps/Gastro/config';
import Header from '../components/Header';
import Thanks from '../components/ThanksRegistration';
import DirectForm from '../components/RegistrationForm/Direct';
import Logo from '~/apps/Gastro/components/Logo';
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

const Registration = () => {
  // State for this registration
  const [submission, setSubmission] = useState(null);

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
            </Section>
            <Section>
              <DirectForm onSuccess={setSubmission} />
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
