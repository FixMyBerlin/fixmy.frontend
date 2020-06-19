import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import { connect } from 'react-redux';

import config from '~/apps/Gastro/config';
import Header from '../components/Header';
import Permit from '../components/Permit';
import api from '../api';

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
  },
  district
}) => {
  const [isLoading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const doLoad = async () => {
      try {
        setApplication(await api.get(id, null, district));
      } catch (e) {
        if (e.message === 'Failed to fetch') {
          setError(
            'Daten konnten nicht geladen werden. Bitte prüfen Sie Ihre Netzwerkverbindung und versuchen Sie es später noch einmal.'
          );
        } else {
          setError(e.message);
        }
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
        {!isLoading && !error && <Permit application={application} />}
      </Container>
    </PermitWrapper>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district
});

export default connect(mapStateToProps)(PermitPage);
