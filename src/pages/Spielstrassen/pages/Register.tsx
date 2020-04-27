/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import slugify from 'slugify';
import { Link } from 'react-router-dom';

import config from '~/pages/Spielstrassen/config';
import Header from '../components/Header';
import mapChamissokiez from '~/images/spielstrassen/map-chamissokiez@2x.png';
import { media } from '~/styles/utils';
import logger from '~/utils/logger';
import SupporterIcon from '../components/SupporterIcon';
import SignupForm from '../components/SignupForm';

const MapWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const MapImg = styled.img`
  width: 90%;
  height: auto;
  margin: 1em auto;
`;

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

const getStreetInfo = (slug) =>
  config.spielstrassen.streets.find(
    (kiezInfo) => slugify(kiezInfo.street, { lower: true }) === slug
  );

const KiezNotFound = () => (
  <>
    <Header showInfoLink />
    <Container>
      <h1>Diese Seite gibt es leider nicht.</h1>
    </Container>
  </>
);

const KiezMap = ({ street }) => (
  <MapImg
    src={`/src/images/spielstrassen/kieze/${street}.png`}
    alt={`${street} im Kiezumfeld`}
  />
);

const Register = ({ match }) => {
  let street = getStreetInfo(match.params?.slug);
  useEffect(() => {
    street = getStreetInfo(match.params?.slug);
  }, [match]);

  if (street == null) return <KiezNotFound />;

  return (
    <>
      <Header showInfoLink />
      <Container>
        <Section>
          <h2>{street.street}</h2>
          <p>Temporäre Spielstraße im {street.kiez}:</p>
          <MapWrapper>
            <KiezMap street={street.street} />
          </MapWrapper>
          <SupporterInfo>
            <SupporterIcon count={street.supporters} />
            Bereits {street.supporters} Unterstützer:innen sind registriert,
            mindestens {config.spielstrassen.supporterGoal} benötigt.
          </SupporterInfo>
          <p>
            <Link to={config.routes.spielstrassen.streets} className="internal">
              andere Spielstraße auswählen
            </Link>
          </p>
        </Section>
        <Section>
          <h2>Diese Spielstrasse benötigt Ihre Unterstützung!</h2>
          <p>
            Die Spielstraße kann nur eingerichtet werden, wenn mindestens 7
            Anwohner:innen die Betreuung vor Ort übernehmen. Hier finden Sie{' '}
            <Link to={config.routes.spielstrassen.landing} className="internal">
              weitere Informationen
            </Link>{' '}
            zur Einrichtung der Spielstraßen.
          </p>
          <p>
            <strong>
              Melden Sie sich über dieses Formular an, um als Kiezlotse in der
              Bergmannstraße zu unterstützen:
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

export default Register;
