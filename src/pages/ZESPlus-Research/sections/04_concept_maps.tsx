import React from 'react';
import {
  Heading,
  Paragraph,
  Paragraph2Cols,
  SectionProps,
} from '~/components2/Article';

const SectionConceptMaps = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Die Konzeptkarten
    </Heading>
    <Paragraph>
      Wie beschrieben, bilden die fortlaufend angepassten Karten “Netzkonzept”
      und die “Planungskarte” den Kern des interkommunalen Radverkehrskonzeptes
      *ZESplus*. Die darin vorgeschlagenen Maßnahmen der Radverkehrsförderung
      und die laufende Fortschreibung basiert auf den Themenkarten sowie auf der
      aktiven Einbeziehung der beteiligten Kommunen und Bürger:innen.
    </Paragraph>
    <Heading as="h3">&ldquo;Netzkonzept&rdquo;: Entwurf des Zielnetzes</Heading>
    <Paragraph2Cols>
      In dieser Karte sehen Sie verschiedene bereits bestehenden Netzkonzepte.
      Außerdem finden Sie hier eine grobe Analyse von Start-Zielpunkten, die den
      Bedarf für wichtige Radverbindungen zeigen. Auf Basis ihrer lokalen
      Expertise erarbeiteten Mitglieder des ZES+Netzwerks[LINK EINFÜGEN] den
      ersten Entwurf für ein gemeindeübergreifendes Hauptroutennetz. Darauf
      aufbauend wird ein im Frühjahr 2021 in einem Workshop ein Routennetz für
      die ZES-Gemeinden konzipiert, auf dem es sich sicher und entspannt Rad
      fahren lässt.
    </Paragraph2Cols>
    <Heading as="h3">
      &ldquo;Planungskarte&rdquo;: Geplanten und umgesetzte Maßnahmen (In
      Vorbereitung)
    </Heading>
    <Paragraph2Cols>
      Die Planungskarte sowie die Übersicht der Maßnahmen befindet sich aktuell
      noch in der Entwicklung. Sobald diese abgeschlossen wurden, werden sie
      hier veröffentlicht. Demnächst finden Sie ein vorläufige Version der
      Maßnahmenübersicht hier:
    </Paragraph2Cols>
  </>
);

export default SectionConceptMaps;
