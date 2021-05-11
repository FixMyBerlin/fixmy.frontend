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
        const data = await api.getEvent(id, district);
        if (data.area_category === 'park') {
          setApplication(data);
        } else {
          setError(
            'Für diese Veranstaltung ist keine verkehrsrechtliche Anordnung vorhanden, da sie nicht in Flächen des ruhenden Verkehrs stattfindet.'
          );
        }
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
