import React from 'react';
import config from '~/pages/Gastro/config';

const Thanks = ({ submission }) => (
  <>
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
          <a href={`mailto:${config.gastro.email}`}>{config.gastro.email}</a> zu
          schicken.
        </strong>
      </p>
    )}

    <p>
      Das Bezirksamt bearbeitet die Anträge in der Reihenfolge Ihres Eingangs.
      Wenn Ihr Antrag bearbeitet wurde, erhalten Sie eine E-Mail zum weiteren
      Vorgehen. Bitte sehen Sie von individuellen Nachfragen ab.
    </p>
  </>
);

export default Thanks;
