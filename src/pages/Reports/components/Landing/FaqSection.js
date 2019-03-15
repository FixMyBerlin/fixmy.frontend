import React, { Component } from 'react';
import styled from 'styled-components';
import FaqItem from './FaqItem';

const FaqSectionWrapper = styled.div`
  margin-bottom: 72px;
`;

class FaqSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: propably better make this configurable
      content: [
        {
          heading: 'Warum solltest du mitmachen?',
          text: 'Im Rahmen des Mobilitätsgesetzes sollen in ganz Berlin 100.000 neue Abstellplätze für den Radverkehr geschaffen werden. Friedrichshain-Kreuzberg setzt sich für sicheres Fahrradparken im Bezirk ein und möchte möglichst viele der Meldungen umsetzen. \n' +
          'Ihr könnt mit eurer Bedarfsmeldung aktiv an einer Verbesserung der Rad-Infrastruktur des Bezirks mithelfen indem ihr beschreibt wo neue Fahrradbügel benötigt werden.'
        },
        {
          heading: 'Wie kann ich mitmachen?',
          text: 'Klicke unten auf den Button „Jetzt Mitmachen“ dann kommst du zur Karte mit allen bisherigen Meldungen. Klicke dort auf das Plus-Zeichen um eine neue Meldung zu erstellen. Anschliessend wirst du einen kurzen Dialog geführt. Am einfachsten kannst du eine Meldung unterwegs von deinem Smartphone machen, du kannst aber auch von zuhause am PC einen Eintrag erstellen. Für die Meldung brauchst du nichts weiter als eine Emailadresse.',
          collapsed: true // initially collapse all items but the first one
        },
        {
          heading: 'Was genau passiert mit den Meldungen?',
          text: 'Nach Abschluss des Meldezeitraums werden die Mitarbeiter und Mitarbeiterinnen des Tiefbauamtes in Friedrichshain-Kreuzberg alle Meldungen anschauen und auswerten, welche umsetzbar sind. Du bekommst dann auf jeden Fall eine Rückmeldung, ob dein Wunsch realisiert werden kann. Wenn es Rückfragen gibt, wird sich das Bezirksamt ebenfalls bei dir melden. Zusätzlich wird auf FixMyBerlin veröffentlicht, welche Standorte bald neue Fahrradbügel bekommen.',
          collapsed: true // initially collapse all items but the first one
        },
        {
          heading: 'Werden alle Meldungen umgesetzt?',
          text: 'Nach Abschluss des Meldezeitraums werden die Mitarbeiter und Mitarbeiterinnen des Tiefbauamtes in Friedrichshain-Kreuzberg alle Meldungen anschauen und auswerten, welche umsetzbar sind. Du bekommst dann auf jeden Fall eine Rückmeldung, ob dein Wunsch realisiert werden kann. Wenn es Rückfragen gibt, wird sich das Bezirksamt ebenfalls bei dir melden. Zusätzlich wird auf FixMyBerlin veröffentlicht, welche Standorte bald neue Fahrradbügel bekommen.',
          collapsed: true // initially collapse all items but the first one
        },
        {
          heading: 'Warum ist mein Bezirk nicht dabei?',
          text: 'Nach Abschluss des Meldezeitraums werden die Mitarbeiter und Mitarbeiterinnen des Tiefbauamtes in Friedrichshain-Kreuzberg alle Meldungen anschauen und auswerten, welche umsetzbar sind. Du bekommst dann auf jeden Fall eine Rückmeldung, ob dein Wunsch realisiert werden kann. Wenn es Rückfragen gibt, wird sich das Bezirksamt ebenfalls bei dir melden. Zusätzlich wird auf FixMyBerlin veröffentlicht, welche Standorte bald neue Fahrradbügel bekommen.',
          collapsed: true // initially collapse all items but the first one
        }
      ]
    };
  }


  toggleCollapsed = (indexOfToggledItem) => {
    this.setState(prevState => ({
      content: prevState.content.map((item, index) => {
        const newItem = item;
        if (index === indexOfToggledItem) {
          newItem.collapsed = !newItem.collapsed;
        }
        return newItem;
      })
    }));
  };

  render() {
    const faqItems = this.state.content
      .map((item, index) => {
        const { heading, text, collapsed } = item;
        return (
          <FaqItem
            heading={heading}
            text={text}
            collapsed={collapsed}
            onTab={() => this.toggleCollapsed(index)}
            key={heading.replace(/ /g, '')} // not sure what to use here besides the array index
          />
        );
      });

    return (
      <FaqSectionWrapper>
        {faqItems}
      </FaqSectionWrapper>
    );
  }
}


export default FaqSection;
