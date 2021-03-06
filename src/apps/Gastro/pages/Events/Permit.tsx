import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import api from '~/apps/Gastro/api';
import PermitPark from '~/apps/Gastro/components/EventPermitPark';
import PermitParking from '~/apps/Gastro/components/EventPermitParking';
import Header from '~/apps/Gastro/components/Header';
import config from '~/apps/Gastro/config';

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

  let permit = null;
  if (!isLoading && !error) {
    if (application.area_category === 'parking') {
      permit = <PermitParking application={application} id={id} />;
    } else if (application.area_category === 'park') {
      permit = <PermitPark application={application} id={id} />;
    } else {
      setError(
        `Unbekannte Art von Sondererlaubnis: "${application.area_category}"`
      );
    }
  }

  return (
    <PermitWrapper>
      <NoPrint>
        <Header showInfoLink />
      </NoPrint>
      <Container maxWidth="md">
        {error && <p>Fehler: {error}</p>}
        {isLoading && <p>Loading...</p>}
        {permit}
      </Container>
    </PermitWrapper>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(PermitPage);
