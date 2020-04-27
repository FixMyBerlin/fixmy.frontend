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
  height: 8em;
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

const getKiezInfo = (slug) =>
  config.spielstrassen.kieze.find(
    (kiezInfo) => slugify(kiezInfo.name, { lower: true }) === slug
  );

const KiezNotFound = () => (
  <>
    <Header showInfoLink />
    <Container>
      <h1>Diese Seite gibt es leider nicht.</h1>
    </Container>
  </>
);

const KiezMap = ({ kiez }) => (
  <MapImg
    src={`/src/images/spielstrassen/map-${slugify(kiez, {
      lower: true
    })}@2x.png`}
    alt={`Karte von ${kiez}`}
  />
);

const Register = ({ match }) => {
  let kiez = getKiezInfo(match.params?.slug);
  useEffect(() => {
    kiez = getKiezInfo(match.params?.slug);
  }, [match]);

  if (kiez == null) return <KiezNotFound />;

  return (
    <>
      <Header showInfoLink />
      <Container>
        <Section>
          <h2>{kiez.street}</h2>
          <p>Temporäre Spielstraße im {kiez.name}:</p>
          <MapWrapper>
            <KiezMap kiez={kiez.name} />
          </MapWrapper>
          <SupporterInfo>
            <SupporterIcon count={kiez.supporters} />
            Bereits {kiez.supporters} Unterstützer:innen sind registriert,
            mindestens {config.spielstrassen.supporterGoal} benötigt.
          </SupporterInfo>
          <p>
            <Link to={config.routes.spielstrassen.kieze} className="internal">
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
          <SignupForm street={kiez.street} />
        </Section>
      </Container>
    </>
  );
};

export default Register;
