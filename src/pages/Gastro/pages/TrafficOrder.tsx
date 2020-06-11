import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';

import config from '~/pages/Gastro/config';
import Loader from '~/components/PageLoading';
import Header from '../components/Header';
import api from '../api';
import { setError } from '~/pages/Map/MapState';

const PermitWrapper = styled.article`
  border-bottom: 2px dashed ${config.colors.lightgrey};
  margin-bottom: 2em;

  &:last-child {
    border-bottom: none;
  }

  h1 {
    overflow-wrap: break-word;
  }
`;

const Permit = ({
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
        setApplication(await api.get(id, null));
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };
    doLoad();
  }, []);

  return (
    <PermitWrapper>
      <Header showInfoLink />
      <Container maxWidth="lg">
        {error && <p>Fehler: {error}</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <>
            <h1>Anordnung</h1>
          </>
        )}
      </Container>
    </PermitWrapper>
  );
};

export default Permit;
