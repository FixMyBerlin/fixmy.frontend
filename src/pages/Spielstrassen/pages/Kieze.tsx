/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Paper, Box } from '@material-ui/core';
import styled from 'styled-components';

import config from '~/pages/Spielstrassen/config';
import Button from '~/components2/Button';
import { Insert as ImageInsert } from '~/components2/Image';
import KiezKarte1 from '~/images/spielstrassen/kiezkarte.jpg';
import KiezKarte2 from '~/images/spielstrassen/kiezkarte@2x.jpg';
import KiezKarte3 from '~/images/spielstrassen/kiezkarte@3x.jpg';
import Header from '~/components2/Header';
import KiezCard from '../components/KiezCard';
import { RequestState } from '~/pages/Spielstrassen/state';
import Loader from '~/components/Loader';
import { Spielstrasse } from '../types';
import Notice from '../components/Notice';
import { media } from '~/styles/utils';

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

const sortArray = (a: Spielstrasse, b: Spielstrasse) =>
  a.street.localeCompare(b.street);

const fullMapURL =
  'https://api.mapbox.com/styles/v1/hejco/ck98kjwqi5edx1ip74oyrmxmd.html?fresh=true&title=view&access_token=pk.eyJ1IjoiaGVqY28iLCJhIjoiY2piZjd2bzk2MnVsMjJybGxwOWhkbWxpNCJ9.L1UNUPutVJHWjSmqoN4h7Q#12.78/52.49946/13.42743';

const Kieze = ({ streets, streetRequest }) => {
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
        <h2>Geplante Temporäre Spielstraßen in Friedrichshain-Kreuzberg</h2>
        <a href={fullMapURL} target="_blank" rel="noopener noreferrer">
          <ImageInsert
            src={KiezKarte2}
            srcSet={`${KiezKarte1} 450w, ${KiezKarte2} 750w, ${KiezKarte3} 1125w`}
          />
        </a>
        <Notice />
        {streetRequest.state === RequestState.pending ? (
          <Loader />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <h2>Friedrichshain</h2>
              <KiezListing>
                {fhain.map(({ kiez, supporters, street }) => (
                  <KiezCard
                    street={street}
                    kiez={kiez}
                    supporters={supporters}
                    key={`kiez-${street}`}
                  />
                ))}
              </KiezListing>
            </Grid>
            <Grid item xs={12} md={6}>
              <h2>Kreuzberg</h2>
              <KiezListing>
                {xberg.map(({ kiez, supporters, street }) => (
                  <KiezCard
                    street={street}
                    kiez={kiez}
                    supporters={supporters}
                    key={`kiez-${street}`}
                  />
                ))}
              </KiezListing>
            </Grid>
          </Grid>
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

const mapStateToProps = (state) => state.SpielstrassenState;
export default connect(mapStateToProps)(Kieze);
