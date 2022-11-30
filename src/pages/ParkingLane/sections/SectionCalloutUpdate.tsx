import React from 'react';
import styled from 'styled-components';
import ExternalLink from '~/components/ExternalLink';
import { Paragraph } from '~/components2/Article';
import { InsertImage } from '~/components2/Image';
import { media } from '~/styles/utils';
import Screenshot from '../assets/parking-data-community-map.jpg';

const Wrapper = styled.div`
  padding: 1rem;
  background-color: rgb(240 253 244);
  border-radius: 0.375rem;

  ${media.m`
    margin-left: calc(-0.75rem + -1rem + -1.25rem);
    margin-right: calc(-0.75rem + -1rem + -1.25rem);
    margin-bottom: 2rem;
    padding-right: calc(0.75rem + 1rem + 1.25rem);
  `}
`;

export const SectionCalloutUpdate: React.FC = () => (
  <Paragraph>
    <Wrapper>
      <div style={{ display: 'flex' }}>
        <div style={{ flexShrink: '0' }}>
          <svg
            className="h-5 w-5 text-green-400"
            style={{
              color: 'rgb(22 101 52)',
              height: '1.25rem',
              width: '1.25rem',
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div style={{ marginLeft: '.75rem' }}>
          <h3
            style={{
              color: 'rgb(22 101 52)',
              fontWeight: '600',
              fontSize: '.875rem',
              lineHeight: '1.25rem',
              margin: '0',
            }}
          >
            100 % der Straßen erfasst!
          </h3>
          <div
            style={{
              color: 'rgb(21 128 61)',
              fontSize: '.875rem',
              lineHeight: '1.25rem',
              marginTop: '.5rem',
            }}
          >
            <p>
              Vielen Dank an alle Aktiven aus der OpenStreetMap Community!
              Innerhalb von vier Monaten wurden Parkraum-Daten für alle Straßen
              im Bezirk erfasst. Es liegen jetzt flächendeckend Daten zum Typ
              der Parkflächen zur Anzahl der vorhandenen Parkplätze vor. Die
              zahlenmäßigen Auswertungen erreichen bereits jetzt 80 bis 95
              Prozent Genauigkeit und werden weiter verbessert (
              <ExternalLink
                target="_blank"
                href="https://parkraum.osm-verkehrswende.org/posts/2022-07-15-einflussfaktoren-datenqualitaet"
              >
                Erläuterungen zur Berechnung
              </ExternalLink>
              ) . Hier gehts zur{' '}
              <ExternalLink
                target="_blank"
                href="https://parkraum.osm-verkehrswende.org/project-vector-tiles/#13.35/52.50418/13.42527"
              >
                Parkraumkarte der OSM Berlin Community
              </ExternalLink>
              . Die Daten werden derzeit vom Bezirksamt geprüft und ausgewertet.
            </p>
            <ExternalLink
              target="_blank"
              href="https://parkraum.osm-verkehrswende.org/project-vector-tiles/#13.35/52.50418/13.42527"
            >
              <InsertImage
                src={Screenshot}
                alt="Screenshot der Parkraumkarte der OSM Berlin Community."
              />
            </ExternalLink>
          </div>
        </div>
      </div>
    </Wrapper>
  </Paragraph>
);
