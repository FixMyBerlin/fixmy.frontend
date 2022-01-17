import { FormHelperText } from '@material-ui/core';
import { ErrorMessage, Field } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import React from 'react';
import styled from 'styled-components';

const FormError = styled(FormHelperText)`
  && {
    font-size: 1em;
    line-height: normal;
    margin: 2em auto;
  }
`;

const SectionNotice = () => (
  <section>
    <p>
      <strong>Bedingungen für die Nutzung der Sonderflächen</strong>
    </p>
    <p>
      Damit Sie die Sonderfläche nutzen können, müssen Sie der
      Kooperationsvereinbarung mit dem Bezirksamt Friedrichshain-Kreuzberg
      zustimmen, damit sichern Sie folgende Punkte zu:
    </p>
    <ul>
      <li>
        Eigenverantwortliche{' '}
        <strong>Durchführung der verkehrsrechtlichen Anordnung</strong>. Sie
        müssen eigenverantwortlich eine Beschilderungsfirma beauftragen,
        Schilder und Absperrungen für die Fläche dem Regelplan entsprechend
        aufzustellen.
        <br />
        <a
          href="/uploads/offene-terrassen/Beschilderungsfirmen_Berlin.pdf"
          className="internal"
          target="_blank"
        >
          Liste mit Beschilderungsfirmen in Berlin
        </a>
      </li>
      <li>
        Sie müssen die{' '}
        <strong>Freihaltung von ausreichend breiten Gehwegen</strong>{' '}
        sicherstellen (mindestens 2 Meter). Dies wird durch das Ordnungsamt
        stichprobenartig überprüft und bei Nichteinhaltung kann die Genehmigung
        entzogen werden.
      </li>
      <li>
        Die Sondernutzung der Flächen des ruhenden Verkehrs darf während der
        Zeiten <strong>Montag bis Sonntag jeweils von 6 bis 22 Uhr</strong>{' '}
        erfolgen. In den Zeiten zwischen 6 und 22 Uhr ist die Fläche gegen
        widerrechtliche Nutzung in geeigneter Weise zu sichern.
      </li>
      <li>
        Verpflichtung zur Einführung eines{' '}
        <strong>Pfandsystems für Einweggebinde</strong> bei der Herausgabe von
        Speisen. Damit durch die zusätzlichen Gastronomieflächen keine
        zusätzlichen Müllmengen entstehen, erklären sich die beantragenden
        Betriebe grundsätzlich bereit, ein Pfandsystem einzuführen.
        <br />
        Selbstverständlich dürfen vorhandene Mehrweggeschire genutzt werden.
        Zeitpunkt und Gebiete, in denen das Pfandsystem eingeführt wird, stehen
        noch nicht fest.
        <br />
        Für die Herausgabe von Einweggebinden stellt das Bezirksamt
        entsprechende Pfandrollen zur Verfügung, die erst nach Herausgabe der
        Kartons / Becher samt Vereinnahmung des Pfandes erstattet werden müssen.
        Darüber hinaus entstehen den Gastronomiebetrieben keine Aufwendungen.
        Das Pfand wird 2 € für Pizza- und Essenskartons / Schalen, sowie 1 € für
        Kaffeebecher betragen. Die Rückholung erfolgt unabhängig von den
        Gastronomiebetrieben durch einen Sozialhilfeträger.
        <br />
        <a
          href="/uploads/offene-terrassen/Nebenbestimmungen.pdf"
          className="internal"
          target="_blank"
        >
          Nebenbestimmungen für Sonderflächen
        </a>
      </li>
    </ul>
    <div className="checkboxFieldGroup">
      <ErrorMessage
        name="agreement_accepted"
        render={(msg) => <FormError error>{msg}</FormError>}
      />
      <Field
        component={CheckboxWithLabel}
        name="agreement_accepted"
        type="checkbox"
        Label={{
          label: (
            <span>
              Ich habe die Bedingungen für die Nutzung der Sonderfläche gelesen
              und stimme ihnen zu.
            </span>
          ),
        }}
      />
    </div>
  </section>
);

export default SectionNotice;
