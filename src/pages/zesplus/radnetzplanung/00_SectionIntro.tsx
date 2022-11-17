import React from 'react';
import ExternalLink from '~/components/ExternalLink';
import { Heading, Intro, Paragraph, SectionProps } from '~/components2/Article';

export const SectionIntro = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Der Radverkehrsatlas
    </Heading>
    <Intro>
      Der von FixMyCity und dem NUDAFA-Reallabor entwickelte{' '}
      <strong>Radverkehrsatlas</strong> fasst Daten zusammen, welche die
      Radnetzplanung, die Entwicklung von Maßnahmen und ihre Umsetzung
      erleichtert. Er speist sich aus{' '}
      <ExternalLink
        href="https://www.openstreetmap.org/#map=6/51.330/10.453"
        target="_blank"
      >
        OpenStreetMap-Daten
      </ExternalLink>{' '}
      (OSM-Daten), die im Rahmen des Projektes von Bürger:innen vervollständigt
      und überprüft wurden. Punktuell wurden zusätzliche Daten, wie
      beispielsweise aus crowd-sensing-Kampagnen per{' '}
      <ExternalLink
        href="https://simra-project.github.io/dashboard/"
        target="_bl ank"
      >
        SimRa-App
      </ExternalLink>
      , oder in der Kommune vorhandenen Daten ergänzend eingebunden.
    </Intro>
    <Heading as="h3">Hintergrund</Heading>
    <Paragraph>
      Vielerorts wollen Städte und Gemeinden die Rahmenbedingungen für das
      Radfahren verbessern. Jedoch fehlt oft noch die Übersicht über den
      aktuellen Zustand der Infrastruktur, Potentialen und konkreten
      Handlungsbedarfen. Wenn es Daten zum Radverkehr gibt, sind diese nicht
      flächendeckend vorhanden, nicht aktuell oder können nicht gut ausgewertet
      werden. An dieser Stelle setzt der Radverkehrsatlas an.
    </Paragraph>
    <Paragraph>
      Der Radverkehrsatlas soll es Kommunen ermöglichen, eigenständig ein
      Radverkehrskonzept zu erstellen und Maßnahmen zur Verbesserung der
      Infrastruktur zu entwickeln. Potenzielle Nutzer:innen sind dabei nicht nur
      Fachexpert:innen und die Verwaltung, sondern auch alle anderen aktiv den
      Radverkehr fördernde Akteure. Die Menschen vor Ort können dazu mit ihrem
      lokalen Wissen, die Daten in OpenStreetMap als wichtige Arbeitsgrundlage
      selbst erheben und vervollständigen.
    </Paragraph>
    <Paragraph>
      In Rahmen des NUDAFA-Reallabors wird derzeit der erste Prototyp des
      Radverkehrsatlas zur Entwicklung eines interkommunalen Radnetzes für
      Eichwalde und die angrenzenden Nachbarkommunen Schulzendorf und Zeuthen
      erprobt. Dabei wird gleichzeitig erforscht, inwieweit mit dem
      Radverkehrsatlas die interkommunale Zusammenarbeit gestärkt werden kann.
    </Paragraph>
    <Heading as="h3">Die Themenkarten</Heading>
    <Paragraph>
      Die im folgenden vorgestellten Themenkarten fassen wichtigen Daten für die
      Radnetzplanung zusammen und visualisieren diese auf interaktiven Karten.
      Dabei werden die “klassischen” Planungsschritte der Radnetzplanung
      nachvollzogen (Quell- und Zielanalyse, Entwicklung eines Zielnetzes,
      Entwicklung Routennetzes usw.). Neue Daten können im Laufe der Zeit
      ergänzt und das Zielnetz bei Bedarf auch überarbeitet und aktualisiert
      werden.
    </Paragraph>
    <Heading as="h3">Entwicklung des Radnetzes und der Maßnahmen</Heading>
    <Paragraph>
      Auf Basis der Themenkarten wird in einem Workshop gemeinsam mit Akteueren
      der kommunalen Verwaltungen, der Zivilgesellschaft und unter fachlicher
      Leitung zunächst ein Zielnetz, in der Folge ein Entwurf der Radnetzplanung
      und in späteren Schritten eine Maßnahmenliste erarbeitet. Das Radnetz wird
      in einer Karte veröffentlicht. Die Maßnahmenliste wird später ebenfalls in
      eine Planungskarte überführt, die für die Projektsteuerung, Priorisierung,
      öffentliche Kommunikation und Beteiligung genutzt werden kann.
    </Paragraph>
    <Paragraph>
      Das so erstellte und fortlaufend angepasste Netzkonzept, sowie die
      Übersicht der Maßnahmen, bilden den Kern des so erstellten interkommunalen
      Radverkehrskonzeptes. Entscheidend für dessen Umsetzung ist die aktive
      Einbeziehung der beteiligten Kommunen, Politiker:innen,
      Verwaltungsmitarbeiter:innen und Bürger:innen. Mit dem Zusammenfassen und
      Darstellen der wichtigsten Informationen zum Radverkehr in der Region soll
      der Radverkehrsatlas den Austausch und die Abstimmung zwischen all diesen
      Akteursgruppen deutlich erleichtern.
    </Paragraph>
  </>
);
