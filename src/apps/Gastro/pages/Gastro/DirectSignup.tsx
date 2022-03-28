/* eslint-disable jsx-a11y/label-has-associated-control */
import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';

import Logo from '~/apps/Gastro/components/Logo';
import config from '~/apps/Gastro/config';
import { media } from '~/styles/utils';

import Header from '../../components/Header';
import HotlineNotice from '../../components/HotlineNotice';
import DirectForm from '../../components/RegistrationForm/Direct';
import Thanks from '../../components/ThanksRegistration';

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
`;

const Heading = styled.h2`
  && {
    font-family: Roboto Slab;
    font-size: 2em;
    line-height: 1.25;
    overflow-wrap: break-word;

    ${media.m`
      margin: 2em 0 1em;
    `};
  }
`;

const Registration = () => {
  // State for this registration
  const [submission, setSubmission] = useState(null);

  const permitEnd =
    config.districts.xhain.apps.gastro.timeline.permitEnd.toLocaleDateString(
      'DE-DE'
    );

  return (
    <>
      <Header showInfoLink />
      <Container maxWidth="sm">
        {submission == null && (
          <>
            <Section>
              <Heading>
                Antrag auf Einrichtung einer Sondernutzungs&shy;fläche
              </Heading>
              <p>
                Bitte füllen Sie dieses Formular aus, um eine
                Sondernutzungsfläche für Ihren Betrieb / Verein beim Bezirksamt
                Friedrichshain-Kreuzberg zu beantragen. Für das Einreichen des
                Antrags benötigen Sie ein Foto / Scan der ersten Seite Ihrer
                Gewerbeanmeldung / Vereinssatzung.
              </p>
              <p>
                Bitte beachten Sie, dass die Sondernutzungsflächen{' '}
                <strong>
                  nur an Nebenstraßen und bei vorhandenen Kfz-Parkplätzen
                </strong>{' '}
                genehmigt werden können.
              </p>
              <p>
                Die Sondernutzungsfläche kann im Falle einer Genehmigung ihres
                Antrags Montags bis Sonntags, jeweils von 6 bis 22 Uhr genutzt
                werden. Die Sondergenehmigung zur Nutzung der Flächen gilt im
                Falle der Erteilung bis zum {permitEnd}
              </p>
              <HotlineNotice />
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
