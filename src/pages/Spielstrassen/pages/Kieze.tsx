/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { generatePath } from 'react-router-dom';
import { Paper, Container } from '@material-ui/core';
import styled from 'styled-components';
import slugify from 'slugify';

import Button from '~/components2/Button';
import Link from '~/components/Link';
import { Insert as ImageInsert } from '~/components2/Image';
import KiezKarte from '~/images/spielstrassen/kiezkarte@3x.jpg';
import Supporter from '~/images/spielstrassen/supporter.svg';
import SupporterCheck from '~/images/spielstrassen/supporter-check.svg';
import config from '~/pages/Spielstrassen/config';
import Header from '../components/Header';

const kiezNames = [
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

const KiezPaper = styled(Paper)`
  padding: 0.5em;
  margin-bottom: 1em;

  dl {
    margin-top: 0;
  }

  dd,
  dt {
    display: inline;
  }

  dd {
    margin-left: 0.5em;
  }

  footer {
    display: flex;

    > svg {
      margin-right: 1em;
    }

    .supportercount {
      font-size: 0.75em;
      line-height: 1.5em;
      color: ${config.colors.darkgrey};
      hyphens: manual;
    }
  }
`;

const ContactButton = styled(Button)`
  align-self: flex-end;
  margin-bottom: 2em;
  position: absolute;
  right: 24px;
`;

const SupportersReached = styled(SupporterCheck)`
  margin-left: -30px;
  margin-top: -5px;
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

const Kiez = ({ name, street, supporters = 0 }) => (
  <KiezPaper elevation={5}>
    <dl>
      <strong>
        <dt>Spielstraße:</dt>
        <dd>{street}</dd>
      </strong>
      <br />
      <dt>Kiez:</dt>
      <dd>{name}</dd>
    </dl>
    <footer>
      <Supporter />
      {supporters >= config.spielstrassen.supporterGoal && (
        <SupportersReached />
      )}
      <span className="supportercount">
        {supporters} Unter&shy;stützer registriert
      </span>
      <Button flat>
        <Link
          to={generatePath(config.routes.spielstrassen.register, {
            kiez: slugify(name, { lower: true })
          })}
        >
          Unterstützen
        </Link>
      </Button>
    </footer>
  </KiezPaper>
);

const Kieze = () => (
  <>
    <Header showInfoLink />
    <Container>
      <h1>In welchem Kiez wollen Sie eine Spielstraße unterstützen?</h1>
      <ZoomMap>
        <input type="checkbox" id="zoomMap" />
        <label htmlFor="zoomMap">
          <ImageInsert src={KiezKarte} />
        </label>
      </ZoomMap>
      <KiezListing>
        {kiezNames.map(({ name, supporters, street }) => (
          <Kiez street={street} name={name} supporters={supporters} />
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
kiezNames;
