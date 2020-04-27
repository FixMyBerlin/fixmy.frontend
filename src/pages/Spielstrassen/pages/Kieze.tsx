/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import styled from 'styled-components';

import { Insert as ImageInsert } from '~/components2/Image';
import KiezKarte from '~/images/spielstrassen/kiezkarte@3x.jpg';
import Header from '../components/Header';
import KiezCard from '../components/KiezCard';
import { RequestState } from '~/pages/Spielstrassen/state';
import Loader from '~/components/Loader';

const KiezListing = styled.div`
  margin: 1em 0 2em;
`;

const Kieze = ({ streets, streetRequest }) => {
  const fhain = streets.filter((street) => street.region === 'Friedrichshain');
  const xberg = streets.filter((street) => street.region === 'Kreuzberg');
  return (
    <>
      <Header showInfoLink />
      <Container maxWidth="md">
        <h2>In welchem Kiez wollen Sie eine Spielstraße unterstützen?</h2>
        <ImageInsert src={KiezKarte} />
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
      </Container>
    </>
  );
};

const mapStateToProps = (state) => state.SpielstrassenState;
export default connect(mapStateToProps)(Kieze);
