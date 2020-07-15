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
                Bitte füllen Sie dieses Formular aus, um eine
                Sondernutzungsfläche für Ihren Betrieb / Verein beim Bezirksamt
                Friedrichshain-Kreuzberg zu beantragen.
              </p>
              <p>
                Bitte beachten Sie, dass die Sondernutzungsflächen{' '}
                <strong>
                  nur an Nebenstraßen und bei vorhandenen Kfz-Parkplätzen
                </strong>{' '}
                genehmigt werden können.
              </p>
              <p>
                Entsprechend der Art Ihres Betriebs können die Sonderflächen in
                folgenden Zeiten genutzt werden:
              </p>
              <ul>
                <li>
                  <strong>Kategorie Restaurant:</strong> Die
                  Sondernutzungsfläche kann nach Einrichtung Freitags, Samstags
                  und Sonntags, jeweils von 11 bis 22 Uhr genutzt werden.
                </li>

                <li>
                  <strong>Alle anderen Kategorien:</strong> Die
                  Sondernutzungsfläche kann nach Einrichtung Montags bis
                  Freitags, jeweils von 10 bis 20 Uhr genutzt werden.
                </li>
              </ul>
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
