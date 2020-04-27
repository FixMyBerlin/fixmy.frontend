/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';

import Button from '~/components2/Button';
import { Insert as ImageInsert } from '~/components2/Image';
import KiezKarte from '~/images/spielstrassen/kiezkarte@3x.jpg';
import config from '~/pages/Spielstrassen/config';
import Header from '../components/Header';
import KiezCard from '../components/KiezCard';
import { media } from '~/styles/utils';

const kiezData = [
  { name: 'Andreasviertel', supporters: 0, street: 'Straßenname' },
  { name: 'Askanischer Platz', supporters: 7, street: 'Straßenname' },
  { name: 'Barnimkiez', supporters: 5, street: 'Straßenname' },
  { name: 'Boxhagener Platz', supporters: 5, street: 'Straßenname' },
  { name: 'Chamissokiez', supporters: 5, street: 'Bergmannstraße' },
  { name: 'Friedenstraße', supporters: 5, street: 'Straßenname' },
  { name: 'Gleisdreieck', supporters: 5, street: 'Straßenname' },
  { name: 'Graefekiez', supporters: 5, street: 'Straßenname' },
  { name: 'Hausburgviertel', supporters: 5, street: 'Straßenname' },
  { name: 'Lausitzer Platz', supporters: 5, street: 'Eisenbahnstraße' },
  { name: 'Mehringplatz', supporters: 5, street: 'Straßenname' },
  { name: 'Moritzplatz', supporters: 5, street: 'Straßenname' },
  { name: 'Oranienplatz', supporters: 5, street: 'Straßenname' },
  { name: 'Reichenberger Straße', supporters: 5, street: 'Straßenname' },
  { name: 'Richard-Sorge-Viertel', supporters: 5, street: 'Straßenname' },
  { name: 'Samariterviertel', supporters: 5, street: 'Straßenname' },
  { name: 'Stralauer Halbinsel', supporters: 5, street: 'Straßenname' },
  { name: 'Stralauer Kiez', supporters: 5, street: 'Straßenname' },
  { name: 'Traveplatz', supporters: 5, street: 'Straßenname' },
  { name: 'Urbanstraße', supporters: 5, street: 'Straßenname' },
  { name: 'Viktoriapark', supporters: 5, street: 'Straßenname' },
  { name: 'Wassertorplatz', supporters: 5, street: 'Straßenname' },
  { name: 'Weberwiese', supporters: 5, street: 'Straßenname' },
  { name: 'Wrangelkiez', supporters: 5, street: 'Straßenname' },
  { name: 'Wrietzener Bahnhof', supporters: 5, street: 'Straßenname' },
  { name: 'Yorckstraße', supporters: 5, street: 'Straßenname' }
];

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
        {kiezData.map(({ name, supporters, street }) => (
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
