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
    <h3>Bedingungen für die Nutzung der Sonderflächen</h3>
    <ul>
      <li>
        Die Veranstaltung dient einem der folgenden Zwecke
        gemeinwohlorientierter bzw. nichtkommerzieller Art:
        <ul>
          <li>Kulturelle Veranstaltung</li>
          <li>Sportveranstaltung</li>
          <li>Bildungsveranstaltung</li>
          <li>Veranstaltungen mit Kiezcharakter (z.B. Nachbarschaftsfest)</li>
        </ul>
      </li>
      <li>Eigenverantwortliche Durchführung der Veranstaltung,</li>
      <li>
        Nach aktuellem Stand der{' '}
        <a
          className="external"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.berlin.de/corona/massnahmen/verordnung/"
        >
          SARS-CoV-2-Infektionsschutzmaßnahmenverordnung
        </a>{' '}
        müssten die Antragstellenden ein auf die konkrete Veranstaltung
        bezogenes Schutz- und Hygienekonzept erstellen und auf Verlangen den
        zuständigen Behörden vorlegen. In diesem Konzept ist darzulegen, wie die
        allgemeinen Anforderungen der Infektionsschutzverordnung, insbesondere
        Abstands- und Hygieneregeln, auf der jeweiligen Veranstaltung umgesetzt
        werden sollen. Bitte beachten Sie dazu die jeweils gültigen
        Verordnungen.
      </li>
      <li>Reinigung der Flächen im Anschluß an die Veranstaltung</li>
      <li>
        Sicherstellen, dass die Veranstaltung während gesamten Zeitraums durch
        den Antragstellenden betreut und beaufsichtigt ist, und bei möglichen
        Konflikten mit Dritten eingeschritten werden kann. Beachtung des
        Anwohnerschutzes (nur zumutbare Lärmimmissionen; Maßgeblichkeit der
        Häufigkeit von Veranstaltungen, die Lärmstörungen verursachen; ein
        angemessener zeitlicher Abstand zu anderen Festen – mindestens 3 Wochen
        Abstand zu vorangegangenen und zu künftigen Veranstaltungen in demselben
        Quartier).
      </li>
      <li>
        Freihaltung von ausreichend breiten Gehwegen (Mindestens 2 Meter).
      </li>
      <li>
        Weiter gelten die allgemeinen und besonderen Nebenbestimmungen für
        Sondernutzungen
      </li>
      <li>
        Einhalten der{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/uploads/event-terrassen/Richtlinien_Berliner_Feuerwehr.pdf"
          className="internal"
        >
          Auflagen der Berliner Feuerwehr
        </a>{' '}
        (sofern dies die Veranstaltung betrifft)
      </li>
      <li>
        Im Fall einer beantragten Fläche im Bereich des ruhenden Verkehrs werden
        die späteren Anordnungen nach folgenden{' '}
        <a
          href="/uploads/event-terrassen/Regelplan_BAFK_RP_Sondernutzung_Parkstreifen.pdf"
          className="internal"
          target="_blank"
          rel="noopener noreferrer"
        >
          Regelplänen
        </a>{' '}
        getroffen: Das Stellen entsprechender Schilder muss von den
        Antragsstellenden eigenständig organisiert werden.
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
              Ich habe die Bedingungen für die Nutzung der Sonderfläche für
              Veranstaltung gelesen und stimme ihnen zu.
            </span>
          ),
        }}
      />
    </div>
  </section>
);

export default SectionNotice;
