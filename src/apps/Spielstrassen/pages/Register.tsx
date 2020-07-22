/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import BigLoader from '~/components/BigLoader';
import Header from '~/components2/Header';
import config from '~/config';

import KiezNotFound from '~/apps/Spielstrassen/components/NotFound';
import Notice from '~/apps/Spielstrassen/components/Notice';
import SupporterIcon from '~/apps/Spielstrassen/components/SupporterIcon';
import SignupForm from '~/apps/Spielstrassen/components/SignupForm';
import KiezMap from '~/apps/Spielstrassen/components/KiezMap';
import { RequestState } from '~/apps/Spielstrassen/state';
import { getStreetInfo } from '~/apps/Spielstrassen/utils';

const SupporterInfo = styled.div`
  display: flex;

  span:first-child {
    flex-basis: 64px;
    flex-shrink 0;
    width: 64px;
    height: 64px;
    margin-right: .5em;
  }
`;

const Section = styled.section`
  border-bottom: 2px dashed ${config.colors.lightgrey};
  margin-bottom: 2em;

  &:last-child {
    border-bottom: none;
  }
`;

const Register = ({ match, streets, streetRequest, district }) => {
  const [street, setStreet] = useState(
    getStreetInfo(streets, match.params?.slug)
  );

  useEffect(() => {
    setStreet(getStreetInfo(streets, match.params?.slug));
  }, [match, streets]);

  if (district == null) return null;
  if (streetRequest.state === RequestState.pending) return <BigLoader />;
  if (street == null) return <KiezNotFound />;

  return (
    <>
      <Header to={config.routes.spielstrassen.landing} showInfoLink>
        Temporäre Spielstraßen für Friedrichshain-Kreuzberg
      </Header>
      <Container maxWidth="sm">
        <Section>
          <h1>{street.street}</h1>
          <p className="subline">
            Temporäre Spielstraße im Kiez {street.kiez}:
          </p>
          <KiezMap street={street.street} />
          <SupporterInfo>
            <SupporterIcon count={street.supporters} />
            {street.supporters === 0 ? '' : 'Bereits '}
            {street.supporters || 0} Unterstützer:in
            {street.supporters === 1 ? '' : 'nen'} sind registriert, mindestens{' '}
            {district.apps.spielstrassen.supporterGoal} benötigt.
          </SupporterInfo>
          <p>
            <Link to={config.routes.spielstrassen.streets} className="internal">
              andere Spielstraße auswählen
            </Link>
          </p>
        </Section>
        <Section>
          <h2>Diese Spielstrasse benötigt Ihre Unterstützung!</h2>
          <Notice />
          <p>
            Hier finden Sie{' '}
            <Link to={config.routes.spielstrassen.landing} className="internal">
              weitere Informationen
            </Link>{' '}
            zur Einrichtung der Spielstraßen.
          </p>
          <p>
            <strong>
              Melden Sie sich über dieses Formular an, um als Kiezlots:in in der{' '}
              {street.street} zu unterstützen:
            </strong>
          </p>
        </Section>
        <Section>
          <SignupForm street={street.street} />
        </Section>
      </Container>
    </>
  );
};

const mapStateToProps = ({ AppState, SpielstrassenState }) => ({
  ...SpielstrassenState,
  district: AppState.district
});
export default connect(mapStateToProps)(Register);
