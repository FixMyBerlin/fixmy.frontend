import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import api from '../../api';
import Header from '../../components/Header';
import { TrafficOrderEvents } from '../../components/TrafficOrder';

const NoPrint = styled.span`
  @media print {
    display: none;
  }
`;

const TrafficOrderPage = ({
  match: {
    params: { id },
  },
  district,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const doLoad = async () => {
      try {
        setApplication(await api.getEvent(id, district));
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
      <Container maxWidth="md">
        {error && <p>Fehler: {error}</p>}
        {isLoading && <p>Anordnung wird geladen...</p>}
        {!isLoading && !error && (
          <TrafficOrderEvents application={application} />
        )}
      </Container>
    </>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(TrafficOrderPage);
