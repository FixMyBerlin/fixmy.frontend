import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';

export const Section05Potential: React.FC<SectionProps> = ({ toc }) => (
  <>
    <Heading as="h2" toc={toc}>
      Großes Potential: OSM-Daten für die Verwaltung nutzbar machen
    </Heading>
    <Paragraph>
      In OpenStreetMap können Daten einheitlich erfasst und aktuell gehalten
      werden. Die Daten werden deshalb auch in unzähligen Kartenanwendung
      genutzt. Verwaltungen haben teilweise eigene Karten und Sachdaten, diese
      sind aber manchmal viele Jahre alt, oder nicht überall vorhanden. Daher
      sind OSM-Daten eine wichtige Ergänzung und haben viel Potential für
      aktuelle Daten in guter Qualität, die mit den weltweiten Standards
      vielfältig weiterverarbeitbar sind. Da OSM-Daten aber von vielen
      Autor*innen erstellt und gepflegt werden, ist es sinnvoll, sie für die
      Verwaltungsarbeit an einem bestimmten Zeitpunkt zu prüfen und dann einen
      nicht veränderbaren Export zu erstellen. Gleichzeitig können die Daten in
      der OSM Datenbank weiter verbessert werden. Der hier beispielhaft
      verfolgte Prüfprozess soll dieses Problem lösen und kann dann hoffentlich
      auch in anderen Städte genutzt werden.
    </Paragraph>
    <Heading as="h3">
      Wofür nutzt das Straßen-und Grünflächenamt die Daten?
    </Heading>
    <Paragraph>
      Parkraumdaten werden für die oben genannten Ziele der Verkehrswende
      benötigt, in der kommenden Zeit aber ganz konkret für ein besonderes
      Projekt: Die Bezirksverordnetenversammlung (BVV) hat das Bezirksamt
      aufgefordert, bis zum Jahr 2026 10% der versiegelten Flächen im
      öffentlichen Raum zu entsiegeln. Um zu prüfen, wo Asphalt aufgebrochen
      werden kann, braucht das Amt präzise Daten zu Parkflächen. Die Kartierung
      hilft auch, automatisiert Statistiken auszugeben und den aktuellen Stand
      der Entsiegelung zu berechnen.
    </Paragraph>
  </>
);
