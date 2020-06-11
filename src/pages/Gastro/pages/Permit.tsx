import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';

import config from '~/pages/Gastro/config';
import Loader from '~/components/PageLoading';
import Header from '../components/Header';
import Permit from '../components/Permit';
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

const NoPrint = styled.span`
  @media print {
    display: none;
  }
`;

const PermitPage = ({
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
      <NoPrint>
        <Header showInfoLink />
      </NoPrint>
      <Container maxWidth="md">
        {error && <p>Fehler: {error}</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && <Permit application={application} />}
      </Container>
    </PermitWrapper>
  );
};

export default PermitPage;
