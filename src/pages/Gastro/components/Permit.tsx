import React from 'react';
import styled from 'styled-components';
import { usageWeekday, usageWeekend } from './RegistrationForm/utils';
import Map from '~/components2/Map';
import config from '~/pages/Gastro/config';

const PermitContainer = styled.section`
  @media print {
    h1 {
      font-size: 16px;
    }

    h2,
    h3,
    h4 {
      font=size: 14px;
    }

    h2 {
      font-size: 14px !important;
    }

    font-size: 12px;
    line-height: 14px;
  }

  h2 {
    margin: 0;
  }

  h3 {
    margin: 3em 0 2em;
    text-decoration: underline;
  }

  h4 {
    font-size: 1.2em;
    font-weight: bold;
    margin: 2em 0;
  }

  table {
    border-collapse: collapse;
  }

  table,
  td {
    border: 1px solid #333;
  }

  td {
    padding: 0.5em 1em;
  }

  td:first-child {
    font-weight: bold;
  }

  .mapbox-improve-map {
    display: none;
  }
`;

const Headline = styled.div`
  display: flex;
  flex-direction: row;

  & span {
    width: 50%;
  }
`;

const StyledMap = styled(Map)`
  width: 100%;
  height: 30em;
  margin: 1em 0;
`;

const AreaMap = ({ application }) => {
  const { regulation, geometry, area } = application;
  const addAreaLayer = (map) => {
    map.addSource('usageArea', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: area
      }
    });
    map.addLayer({
      id: 'usageArea',
      type: 'fill',
      source: 'usageArea',
      layout: {},
      paint: {
        'fill-color': config.colors.change_4,
        'fill-opacity': 0.8
      }
    });
    map.setCenter(geometry?.coordinates);
    map.setZoom(18);
  };

  return (
    <StyledMap
      onInit={addAreaLayer}
      style={config.gastro.map.style}
      bounds={config.gastro.map.bounds}
      dragPan={false}
      scrollZoom={false}
      doubleClickZoom={false}
      touchZoomRotate={false}
    />
  );
};

const Permit = ({ application }) => {
  let categoryDescription = null;
  switch (application.category) {
    case 'restaurant':
      categoryDescription =
        'Herausstellen von Tischen & Stühlen für Schankzwecke';
      break;
    case 'retail':
      categoryDescription = 'Herausstellen von Waren';
      break;
    case 'workshop':
      categoryDescription = 'Ausführen von Dienstleistungen';
      break;
    default:
      categoryDescription = application.usage;
      break;
  }

  if (application.status !== 'application_accepted')
    return <p>Dieser Antrag wurde bisher nicht bewilligt.</p>;

  return (
    <PermitContainer>
      <h1>Bezirksamt Friedrichshain-Kreuzberg von Berlin</h1>
      <h2>Abt. Familie, Personal, Diversity, Straßen- und Grünflächenamt</h2>
      <h2>Straßenverkehrsbehörde</h2>

      <h3>Ausnahmegenehmigung nach der Straßenverkehrs-Ordnung</h3>

      <Headline>
        <span>Antrag vom: ___</span>
        <span>
          Antrag gestellt von {application.first_name} {application.last_name}
        </span>
      </Headline>

      <p>
        Sehr geehrte Damen und Herren, <br />
        aufgrund § 46 (1) der Straßenverkehrs-Ordnung (StVO) wird Ihnen folgende
        Ausnahmegenehmigung erteilt. Dieser Bescheid ersetzt gemäß § 13 Berliner
        Straßengesetz (BerlStrG) eine gesonderte Sondernutzungserlaubnis. Die
        Erteilung erfolgt unter dem Vorbehalt des jederzeitigen Widerrufs sowie
        unbeschadet der Rechte Dritter.
      </p>

      <p>
        Die in der/den Anlage/n genannten Nebenbestimmungen sind Bestandteil
        dieser Genehmigung.
      </p>

      <h4>Gegenstand der Genehmigung</h4>

      <table>
        <tr>
          <td>Art der Genehmigung</td>
          <td>{categoryDescription}</td>
        </tr>
        <tr>
          <td>Ort:</td>
          <td>{application.address}</td>
        </tr>
        <tr>
          <td>Ausmaß (maximal):</td>
          <td>
            Innerhalb der auf der untenstehenden Karte verzeichneten Fläche{' '}
            <strong>nur im Bereich der Parkflächen</strong> und nicht über die
            Breite der Ladenfront hinausgehend.
            <AreaMap application={application} />
          </td>
        </tr>
        <tr>
          <td>Gültigkeit:</td>
          <td>
            <p>Von ___ bis 31.8.2020 </p>
            <p>
              {usageWeekday(application) && (
                <strong>
                  Nur am Montag, Dienstag, Mittwoch, Donnerstag, Freitag,
                  jeweils von 10:00 Uhr bis 20:00 Uhr
                </strong>
              )}
              {usageWeekend(application) && (
                <strong>
                  Nur am Freitag, Samstag, Sonntag, jeweils von 11:00 Uhr bis
                  22:00 Uhr
                </strong>
              )}
            </p>
          </td>
        </tr>
        {application.note != null && application.note.length > 0 && (
          <tr>
            <td>Besondere Hinweise:</td>
            <td>{application.note}</td>
          </tr>
        )}
      </table>
      <p>Der Bescheid ergeht gebührenfrei.</p>
    </PermitContainer>
  );
};

export default Permit;
