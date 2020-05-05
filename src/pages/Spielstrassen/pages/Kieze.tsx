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
import Header from '../components/Header';
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
      <Header showInfoLink />
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
                <a href={`mailto:${config.spielstrassen.email}`}>Mail senden</a>
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
