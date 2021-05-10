import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import KiezMap from '~/apps/Spielstrassen/components/KiezMap';
import KiezNotFound from '~/apps/Spielstrassen/components/NotFound';
import SignupForm from '~/apps/Spielstrassen/components/SignupForm';
import SupporterIcon from '~/apps/Spielstrassen/components/SupporterIcon';
import { RequestState } from '~/apps/Spielstrassen/state';
import { getStreetInfo } from '~/apps/Spielstrassen/utils';
import { Header } from '~/components2/Header';
import { BigLoader } from '~/components2/Loaders';
import { Notice } from '~/components2/Notice';
import config from '~/config';
import { RootState } from '~/store';

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
  padding-bottom: 2em;
`;

const Schedule = styled.p`
  color: ${config.colors.darkbg};
`;

const connector = connect(({ AppState, SpielstrassenState }: RootState) => ({
  ...SpielstrassenState,
  district: AppState.district,
}));

type Props = ConnectedProps<typeof connector> &
  RouteComponentProps<{ slug: string }>;

const Register = ({ match, streets, streetRequest, district }: Props) => {
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
          <KiezMap street={street} />
          {street.schedule && (
            <Schedule>
              {street.status === 'paused' && (
                <>
                  <Notice>
                    <strong>Diese Spielstraße ist derzeit pausiert.</strong>
                  </Notice>
                </>
              )}
              Öffnungszeiten: {street.schedule}
            </Schedule>
          )}
          <SupporterInfo>
            <SupporterIcon count={street.supporters} />
            {street.supporters <= district.apps.spielstrassen.supporterGoal && (
              <>
                {street.supporters === 0 ? '' : 'Bereits '}
                {street.supporters} Unter&shy;stützer:in
                {street.supporters === 1 ? '' : 'nen'} registriert. Mit{' '}
                {district.apps.spielstrassen.supporterGoal} Kiezlots:innen kann
                die Spielstraße eingerichtet werden.
              </>
            )}
            {street.supporters > district.apps.spielstrassen.supporterGoal && (
              <>
                Diese Spielstraße findet bereits statt, benötigt aber weiter
                ihre Unterstützung.
              </>
            )}
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
            Damit die Spielstraßen dauerhaft stattfinden können, brauchen sie
            Kiezlots:innen, die an Sonntagen 1-2 mal im Monat für drei Stunden
            vor Ort sind. Registrieren Sie sich hier, um Ihre Nachbarn zu
            unterstützen und Kindern das Spielen im öffentlichen Raum zu
            ermöglichen.
          </p>
          <p>
            Hier finden Sie{' '}
            <Link to={config.routes.spielstrassen.landing} className="internal">
              weitere Informationen
            </Link>{' '}
            zur Einrichtung der Spielstraßen.
          </p>
          <p>
            <strong>
              Melden Sie sich über dieses Formular an, um die temporäre
              Spielstraße {street.street} zu unterstützen:
            </strong>
          </p>
          <SignupForm street={street.street} />
        </Section>
      </Container>
    </>
  );
};

export default connector(Register);
