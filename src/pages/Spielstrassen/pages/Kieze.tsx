/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';

import config from '~/pages/Spielstrassen/config';
import Button from '~/components2/Button';
import { Insert as ImageInsert } from '~/components2/Image';
import KiezKarte from '~/images/spielstrassen/kiezkarte@3x.jpg';
import Header from '../components/Header';
import KiezCard from '../components/KiezCard';
import { media } from '~/styles/utils';

const KiezListing = styled.div`
  margin: 1em 0 2em;
`;

const ContactButton = styled(Button)`
  margin-bottom: 2em;
  width: 100%;

  ${media.s`
    position: absolute;
    right: 24px;
    width: initial;
  `}
`;

const ZoomMap = styled.span`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: auto;

  input[type='checkbox'] {
    display: none;
  }

  img {
    display: inline-block;
    transition: transform 0.25s ease;
    cursor: zoom-in;
    flex: 0 0 auto;
    max-width: none;
  }

  input[type='checkbox']:checked ~ label > img {
    transform: scale(2) translate(28%, 28%);
    cursor: zoom-out;
  }
`;

const Kieze = () => (
  <>
    <Header showInfoLink />
    <Container>
      <h2>In welchem Kiez wollen Sie eine Spielstraße unterstützen?</h2>
      <ZoomMap>
        <input type="checkbox" id="zoomMap" />
        <label htmlFor="zoomMap">
          <ImageInsert src={KiezKarte} />
        </label>
      </ZoomMap>
      <KiezListing>
        {config.spielstrassen.kieze.map(({ name, supporters, street }) => (
          <KiezCard street={street} name={name} supporters={supporters} />
        ))}
      </KiezListing>
      <p>
        Fehlt eine Straße? Wenn Sie Anregungen für weitere Spielstrassen haben
        schicken Sie diese an das Bezirksamt Friedrichshain-Kreuzberg.
      </p>
      <ContactButton flat ghost>
        <a href={`mailto:${config.spielstrassen.email}`}>Mail senden</a>
      </ContactButton>
    </Container>
  </>
);

export default Kieze;
