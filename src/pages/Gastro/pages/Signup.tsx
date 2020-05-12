/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';

import config from '~/config';
import Header from '../components/Header';
import Thanks from '../components/Thanks';
import SignupForm from '../components/SignupForm';

const Section = styled.section`
  border-bottom: 2px dashed ${config.colors.lightgrey};
  margin-bottom: 2em;

  &:last-child {
    border-bottom: none;
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
              <h1>Interessensbekundung</h1>
              <p>
                <strong>
                  Füllen Sie dieses Formular aus, um dem Bezirksamt Ihren Bedarf
                  mitzuteilen.
                </strong>
              </p>
              <p>
                Die Angaben sind unverbindlich, das Bezirksamt wird Sie nach der
                Bedarfsprüfung zum weiteren Vorgehen kontaktieren.
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
