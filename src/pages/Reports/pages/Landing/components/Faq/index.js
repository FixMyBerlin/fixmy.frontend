import React, { PureComponent } from 'react';
import styled from 'styled-components';

import FaqItem from './FaqItem';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';

const FaqWrapper = styled.div`
  padding-top: 48px;
  margin-bottom: 62px;
`;

const linkStyle = `
  color: ${config.colors.interaction};
  text-decoration: none;
 `;

const content = [
  {
    heading: 'Warum sollte ich mitmachen?',
    text: `
      Im Rahmen des Mobilitätsgesetzes sollen in ganz Berlin 100.000 neue Abstellplätze für den Radverkehr geschaffen werden.
      Friedrichshain-Kreuzberg setzt sich für sicheres Fahrradparken im Bezirk ein und möchte möglichst viele der Meldungen umsetzen.<br />
      Ihr könnt mit eurer Bedarfsmeldung aktiv an einer Verbesserung der Rad-Infrastruktur des Bezirks mithelfen indem ihr beschreibt wo neue Fahrradbügel benötigt werden.
    `
  },
  {
    heading: 'Wie kann ich mitmachen?',
    text: `
      Klicke unten auf den Button „Sag uns, wo du Radbügel benötigst“, oder schaue dir zunächst die Karte mit den
      vorhandenen Meldungen an. Für eine neue Meldung wirst du durch einen kurzen Dialog geführt,
      bei dem du den Ort und weitere Informationen zu deiner Meldung angeben musst.
      Am einfachsten kannst du eine Meldung unterwegs von deinem Smartphone machen,
      du kannst aber auch von zu Hause am PC einen Eintrag erstellen.
    `
  },
  {
    heading: 'Was passiert mit den Meldungen?',
    text: `
      Nach Abschluss des Meldezeitraums werden die Mitarbeiter und Mitarbeiterinnen des Straßen- und Grünflächenamtes 
      in Friedrichshain-Kreuzberg alle Meldungen anschauen und auswerten, welche umsetzbar sind. 
      Wenn du deine Mailadresse hinterlegt hast, bekommst du auf jeden Fall eine Rückmeldung, 
      ob dein Wunsch realisiert werden kann. Wenn es Rückfragen gibt, wird sich das Bezirksamt ebenfalls bei dir melden. 
      Zusätzlich wird auf FixMyBerlin veröffentlicht, an welchen Orten neue Fahrradbügel installiert werden.
    `
  },
  {
    heading: 'Werden alle Meldungen umgesetzt?',
    text: `
      Zunächst muss geprüft werden, ob an der gemeldeten Stelle Bügel aufgestellt werden können oder ob andere Aspekte dagegen sprechen. 
      Ggf. wird der Ort besichtigt, oder eine Rückfrage gestellt. Außerdem gibt es natürlich eine Grenze, 
      wie viele Bügel finanzierbar sind und von den beauftragten Fachfirmen pro Jahr aufgestellt werden können. 
      Mehrere Meldungen an einem Ort werden zusammengefasst und gemeinsam betrachtet. 
    `
  },
  {
    heading: 'Warum ist mein Bezirk nicht dabei?',
    text: `
      Dieses Pilotprojekt wird zunächst nur in Friedrichshain-Kreuzberg durchgeführt.
      Wenn es erfolgreich läuft, soll es auch in anderen Bezirken gestartet werden.
      Unter <a style="${linkStyle}"
      href="mailto:${config.feedbackMail}?subject=Feedback zum Meldedialog"
      >${config.feedbackMail}</a>
      kannst du uns gerne eine Rückmeldung geben,
      was wir noch verbessern können und in welchem Bezirk du diesen Dialog gerne sehen würdest.
    `
  }
];

class FaqSection extends PureComponent {
  state = {
    content
  };

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
        <Heading>Häufige Fragen</Heading>
        {faqItems}
      </FaqWrapper>
    );
  }
}

export default FaqSection;
