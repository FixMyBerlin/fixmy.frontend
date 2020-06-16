import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';

import Header from '../components/Header';
import api from '../api';
import TrafficOrder from '../components/TrafficOrder';

const NoPrint = styled.span`
  @media print {
    display: none;
  }
`;

const TrafficOrderPage = ({
  match: {
    params: { id }
  }
}) => {
  const [isLoading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const doLoad = async () => {
      try {
        const resp = await api.get(id, null);
        setApplication(resp);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };
    doLoad();
  }, []);

  return (
    <>
      <NoPrint>
        <Header showInfoLink />
      </NoPrint>
      <Container maxWidth="lg">
        {error && <p>Fehler: {error}</p>}
        {isLoading && <p>Anordnung wird geladen...</p>}
        {!isLoading && <TrafficOrder application={application} />}
      </Container>
    </>
  );
};

export default TrafficOrderPage;
