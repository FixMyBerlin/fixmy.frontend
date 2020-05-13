/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';

import config from '~/pages/Gastro/config';
import Header from '../components/Header';
import Thanks from '../components/Thanks';
import SignupForm from '../components/SignupForm';

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

const Signup = () => {
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
                Die Angaben sind unverbindlich, das Bezirksamt wird Sie nach der
                Bedarfsprüfung zum weiteren Vorgehen kontaktieren. Mögliche zur
                Verfügung gestellte Flächen wären Freitags, Samstags und
                Sonntags jeweils von 11 bis 22 Uhr nutzbar.
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

export default Signup;
