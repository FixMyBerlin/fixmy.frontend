import { Container, Grid, Paper, Box } from '@material-ui/core';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import { RequestState, loadKieze } from '~/apps/Spielstrassen/state';
import Loader from '~/components/Loader';
import { BaseMap } from '~/components2/BaseMap';
import { Button } from '~/components2/Button';
import { Header } from '~/components2/Header';
import { ApiNotice } from '~/components2/Notice';
import config from '~/config';
import { RootState } from '~/store';
import { media } from '~/styles/utils';

import KiezCard from '../components/KiezCard';
import MissingSupportersNotice from '../components/MissingSupporters';
import { Spielstrasse } from '../types';

const ContactButton = styled(Button)`
  margin-bottom: 2em;
  width: 100%;
  ${media.s`
    width: initial;
  `}
`;

const KiezListing = styled.div`
  margin: 1em 0 2em;
`;

const OverviewMap = styled(BaseMap)`
  width: 100vw;
  height: 20em;
  margin-left: -1rem;

  ${media.m`
    margin-left: 0;
    width: 100%;
    height: 30em;
  `}
`;

const StyledApiNotice = styled(ApiNotice)`
  margin: 2em auto;
  width: 100vw;
  margin-left: -1rem !important;

  ${media.m`
    width: 100%;
    margin-left: 0 !important;
  `}
`;

const sortArray = (a: Spielstrasse, b: Spielstrasse) =>
  a.street.localeCompare(b.street);

const connector = connect((state: RootState) => ({
  ...state.SpielstrassenState,
  district: state.AppState.district,
}));

const Kieze = ({
  streets,
  streetRequest,
  district,
  dispatch,
}: ConnectedProps<typeof connector>) => {
  const fhain = streets
    .filter((street) => street.region === 'Friedrichshain')
    .sort(sortArray);
  const xberg = streets
    .filter((street) => street.region === 'Kreuzberg')
    .sort(sortArray);

  return (
    <>
      <Header to={config.routes.spielstrassen.landing} showInfoLink>
        Temporäre Spielstraßen für Friedrichshain-Kreuzberg
      </Header>
      <Container maxWidth="md">
        <h2>Welche Spielstraße wollen Sie unterstützen?</h2>
        <OverviewMap
          style={district.apps.spielstrassen.mapboxStyle}
          bounds={district.bounds}
        />
        {streetRequest.state === RequestState.pending && <Loader />}{' '}
        {streetRequest.state === RequestState.error && (
          <StyledApiNotice
            title="Fehler beim Laden der Spielstraßen"
            onRetry={() => loadKieze(dispatch, district)}
          >
            Die Spielstraßen konnten nicht geladen werden
          </StyledApiNotice>
        )}{' '}
        {streetRequest.state === RequestState.success && (
          <>
            <MissingSupportersNotice
              streets={streets}
              supporterGoal={district.apps.spielstrassen.supporterGoal}
            />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <h2>Friedrichshain</h2>
                <KiezListing>
                  {fhain.map((props: Spielstrasse) => (
                    <KiezCard key={`kiez-${props?.street}`} {...props} />
                  ))}
                </KiezListing>
              </Grid>
              <Grid item xs={12} md={6}>
                <h2>Kreuzberg</h2>
                <KiezListing>
                  {xberg.map((props: Spielstrasse) => (
                    <KiezCard key={`kiez-${props?.street}`} {...props} />
                  ))}
                </KiezListing>
              </Grid>
            </Grid>
          </>
        )}
        <Box mb={6}>
          <Paper elevation={1}>
            <Box px={4} py={1}>
              <p>
                Fehlt eine Straße? Wenn Sie Anregungen für weitere Spielstrassen
                haben, schicken Sie diese an das Bezirksamt
                Friedrichshain-Kreuzberg.
              </p>
              <ContactButton flat ghost>
                <a href=" mailto:spielstrasse.sga@ba-fk.berlin.de?subject=Vorschlag%20f%C3%BCr%20tempor%C3%A4re%20Spielstra%C3%9Fe&body=An%20das%20Bezirksamt%20Friedrichshain-Kreuzberg%2C%20Stra%C3%9Fen%20und%20Gr%C3%BCnfl%C3%A4chenamt%2C%0D%0A%0D%0Aich%20m%C3%B6chte%20folgende%20Stra%C3%9Fe%20f%C3%BCr%20die%20Einrichtung%20einer%20tempor%C3%A4ren%20Spielstra%C3%9Fe%20vorschlagen%3A%0D%0A%0D%0A%0D%0A%0D%0ADieser%20Abschnitt%20der%20Stra%C3%9Fe%20w%C3%A4re%20daf%C3%BCr%20geeignet%20(bitte%20bezeichnen%20Sie%20die%20Knotenpunkte%20oder%20Querstra%C3%9Fen%20zwischen%20denen%20die%20Spielstra%C3%9Fe%20eingerichtet%20werden%20sollte)%3A%0D%0A%0D%0A%0D%0A%0D%0AWeitere%20Anmerkungen%20zu%20meinem%20Vorschlag%3A">
                  Mail senden
                </a>
              </ContactButton>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default connector(Kieze);
