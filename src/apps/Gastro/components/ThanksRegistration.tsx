import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import config from '~/apps/Gastro/config';
import { media } from '~/styles/utils';

const Wrapper = styled.div`
  border-bottom: 2px dashed ${config.colors.lightgrey};

  ${media.m`
    padding-bottom: 1em;
    margin-bottom: 2em;
  `}

  h2 {
    overflow-wrap: break-word;

    ${media.m`
      margin: 2em 0 1em;
    `};
  }
`;

const Thanks = ({ submission, district }) => (
  <Wrapper>
    <h2>Vielen Dank für Ihren Antrag auf Nutzung einer Sonderfläche</h2>

    <p>
      Ihr Antrag für <strong>{submission.shop_name}</strong> wurde übermittelt.
      Sie haben eine E-Mail zur Bestätigung erhalten.
    </p>

    {submission.uploadFailed && (
      <p>
        <strong>
          Leider konnte ihre Gewerbeanmeldung / Vereinsregister nicht übertragen
          werden. Wir bitten Sie daher, diese Datei per E-Mail an
          <a href={`mailto:${config.gastro[district?.name]?.email}`}>
            {config.gastro[district?.name]?.email}
          </a>{' '}
          zu schicken.
        </strong>
      </p>
    )}

    <p>
      Das Bezirksamt bearbeitet die Anträge in der Reihenfolge Ihres Eingangs.
      Wenn Ihr Antrag bearbeitet wurde, erhalten Sie eine E-Mail zum weiteren
      Vorgehen. Bitte sehen Sie von individuellen Nachfragen ab.
    </p>
  </Wrapper>
);

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district
});

export default connect(mapStateToProps)(Thanks);
