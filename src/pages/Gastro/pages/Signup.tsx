/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';

import config from '~/config';
import Header from '../components/Header';

const Section = styled.section`
  border-bottom: 2px dashed ${config.colors.lightgrey};
  margin-bottom: 2em;

  &:last-child {
    border-bottom: none;
  }
`;

const Signup = () => (
  <>
    <Header showInfoLink />
    <Container maxWidth="sm">
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
        <p>Anmeldeformular</p>
      </Section>
    </Container>
  </>
);

export default Signup;
