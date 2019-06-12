import React, { PureComponent } from 'react';
import styled from 'styled-components';

import FaqItem from './FaqItem';

const FaqWrapper = styled.div`
  margin-bottom: 62px;
`;

const content = [
  {
    heading: 'Warum solltest du mitmachen?',
    text: `
      Im Rahmen des Mobilitätsgesetzes sollen in ganz Berlin 100.000 neue Abstellplätze für den Radverkehr geschaffen werden.
      Friedrichshain-Kreuzberg setzt sich für sicheres Fahrradparken im Bezirk ein und möchte möglichst viele der Meldungen umsetzen.<br />
      Ihr könnt mit eurer Bedarfsmeldung aktiv an einer Verbesserung der Rad-Infrastruktur des Bezirks mithelfen indem ihr beschreibt wo neue Fahrradbügel benötigt werden.
    `
  },
  {
    heading: 'Wie kann ich mitmachen?',
    text: `
      Klicke unten auf den Button „Jetzt Mitmachen“ dann kommst du zur Karte mit allen bisherigen Meldungen. Klicke dort auf das Plus-Zeichen um eine neue Meldung zu erstellen.
      Anschliessend wirst du einen kurzen Dialog geführt. Am einfachsten kannst du eine Meldung unterwegs von deinem Smartphone machen, du kannst aber auch von zuhause am PC einen Eintrag erstellen.
      Für die Meldung brauchst du nichts weiter als eine Emailadresse.
    `
  },
  {
    heading: 'Was genau passiert mit den Meldungen?',
    text: `
      Nach Abschluss des Meldezeitraums werden die Mitarbeiter und Mitarbeiterinnen des Tiefbauamtes in Friedrichshain-Kreuzberg alle Meldungen anschauen und auswerten,
      welche umsetzbar sind. Du bekommst dann auf jeden Fall eine Rückmeldung, ob dein Wunsch realisiert werden kann.
      Wenn es Rückfragen gibt, wird sich das Bezirksamt ebenfalls bei dir melden. Zusätzlich wird auf FixMyBerlin veröffentlicht, welche Standorte bald neue Fahrradbügel bekommen.
    `
  },
  {
    heading: 'Werden alle Meldungen umgesetzt?',
    text: `
      Nach Abschluss des Meldezeitraums werden die Mitarbeiter und Mitarbeiterinnen des Tiefbauamtes in Friedrichshain-Kreuzberg alle Meldungen anschauen und auswerten,
      welche umsetzbar sind. Du bekommst dann auf jeden Fall eine Rückmeldung, ob dein Wunsch realisiert werden kann. Wenn es Rückfragen gibt, wird sich das Bezirksamt ebenfalls bei dir melden.
      Zusätzlich wird auf FixMyBerlin veröffentlicht, welche Standorte bald neue Fahrradbügel bekommen.
    `
  },
  {
    heading: 'Warum ist mein Bezirk nicht dabei?',
    text: `
      Nach Abschluss des Meldezeitraums werden die Mitarbeiter und Mitarbeiterinnen des Tiefbauamtes in Friedrichshain-Kreuzberg alle Meldungen anschauen und auswerten, welche umsetzbar sind.
      Du bekommst dann auf jeden Fall eine Rückmeldung, ob dein Wunsch realisiert werden kann. Wenn es Rückfragen gibt, wird sich das Bezirksamt ebenfalls bei dir melden.
      Zusätzlich wird auf FixMyBerlin veröffentlicht, welche Standorte bald neue Fahrradbügel bekommen.
    `
  }
];

class FaqSection extends PureComponent {
  state = {
    content
  }

  render() {
    const faqItems = this.state.content
      .map(item => (
        <FaqItem
          key={item.heading.replace(/ /g, '')} // not sure what to use here besides the array index
          {...item}
        />
      ));

    return (
      <FaqWrapper>
        {faqItems}
      </FaqWrapper>
    );
  }
}

export default FaqSection;
