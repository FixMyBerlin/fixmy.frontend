import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { AnchorLink } from '~/components2/Link';

export const Section04Next: React.FC<SectionProps> = ({ toc }) => (
  <>
    <Heading as="h2" toc={toc}>
      Was bedeuten die Ergebnisse für die Arbeit des Bezirksamts?
    </Heading>
    <Paragraph>
      Wie die Analyse zeigt, werden sehr viele der Straßen im Bezirk von
      hunderten Schüler*innen täglich genutzt. Diese Verkehrsteilnehmenden
      benötigen besonderen Schutz, da sie im Straßenverkehr besonders gefährdet
      sind. Um die Verkehrssicherheit zu gewährleisten, werden an allen in der
      Analyse identifizierten Abschnitten mit Gefährdungspotential Maßnahmen
      abgewogen, die mehr Sicherheit für Kinder schaffen.
    </Paragraph>
    <Paragraph>
      Solche Maßnahmen können zum Beispiel sein: Die Schaffung von
      Fußgängerüberwegen oder Ampeln, baulich vom Autoverkehr getrennte und
      damit für Kinder sichere Radwege oder Fahrradstraßen,
      Fußgänger*innen-Zonen oder Spielstraßen. Eine weitere Möglichkeit ist die
      Einrichtung sogenannter “Schulstraßen”: Durch versenkbare oder umklappbare
      Poller werden diese Straßen vor Schulbeginn und zum Schulschluss für den
      Kfz-Verkehr gesperrt. Dadurch soll das Bringen der Kinder durch
      Elterntaxis eingedämmt und die Verkehrssicherheit für zu Fuß gehende oder
      mit dem Fahrrad kommende Kinder deutlich erhöht werden. Für den Betrieb
      einer “Schulstraße” ist die Unterstützung seitens der Schule oder der
      Elternschaft notwendig. Welche Maßnahmen konkret getroffen werden, kommt
      auf die genaue Situation auf den Schulwegen an.
    </Paragraph>
    <Paragraph>
      Die Analyse zeigt, dass im gesamten Bezirk an vielen Orten Handlungsbedarf
      besteht. Stück für Stück sollen all diese Schulwege sicherer gestaltet
      werden. Als erstes konzentriert sich das Straßen- und Grünflächenamt
      darauf, Situationen zu entschärfen, die besonders unfallträchtig sind
      und/oder auf den besonders viele Schulwege verlaufen.
    </Paragraph>
    <Heading as="h3">Hintergrund: Fußverkehrsplanung im Bezirksamt</Heading>
    <Paragraph>
      Das Bezirksamt Friedrichshain-Kreuzberg erachtet die Verbesserung der
      Situation für den Fußverkehr als wichtigen Teil der Mobilitätswende. Das
      <AnchorLink href="https://www.berlin.de/sen/uvk/verkehr/verkehrspolitik/mobilitaetsgesetz/">
        Mobilitätsgesetz Berlin
      </AnchorLink>{' '}
      schreibt die Entwicklung des Fußverkehrs als wichtiges Ziel für ganz
      Berlin fest. Mit dem Beschluss{' '}
      <AnchorLink href="https://www.berlin.de/ba-friedrichshain-kreuzberg/politik-und-verwaltung/bezirksverordnetenversammlung/online/vo020.asp?VOLFDNR=9353">
        eines Fußverkehrskonzeptes
      </AnchorLink>{' '}
      hat das Bezirksamt diese gesetzlichen Anforderungen auf konkrete Projekte
      innerhalb von Friedrichshain-Kreuzberg heruntergebrochen. Mit der
      Einstellung von zwei Fußverkehrsplaner*innen im Straßen- und
      Grünflächenamt wurden zudem die notwendigen Ressourcen für die Umsetzung
      dieser Pläne geschaffen. Für das Jahr 2022 sind vielfältige Maßnahmen zur
      Verbesserung der Situation für den Fußverkehr geplant. Dazu gehört auch
      die Verbesserung der Schulwegsicherheit.
    </Paragraph>
    <Heading as="h3">Schreiben Sie uns</Heading>
    <Paragraph>
      Haben Sie Fragen oder Anregungen zu sicheren Schulwegen oder zum
      Fußverkehr im Bezirksamt Friedrichshain-Kreuzberg? Brauchen Sie im Umfeld
      Ihrer Schule eine verbesserte Verkehrssicherheit? Dann schreiben Sie uns
      eine Mail:{' '}
      <AnchorLink href="mailto:'Straßen- und Grünflächenamt FH' <tiefgruen@ba-fk.berlin.de>?subject=Hinweis zur Schulwegesicherheit">
        tiefgruen@ba-fk.berlin.de
      </AnchorLink>
    </Paragraph>
  </>
);
