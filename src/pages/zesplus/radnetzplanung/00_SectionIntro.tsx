import React from 'react';
import { Heading, Intro, Paragraph, SectionProps } from '~/components2/Article';
import { AnchorLink } from '~/components2/Link';

export const SectionIntro = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Einleitung
    </Heading>
    <Heading as="h3">Der Radverkehrsatlas</Heading>
    <Intro>
      Der <strong>Radverkehrsatlas</strong> fasst Daten zusammen, welche die
      Radnetzplanung, die Entwicklung von Maßnahmen und ihre Umsetzung
      erleichtert. Er speist sich aus{' '}
      <AnchorLink href="#todo-osm">OpenStreetMap-Daten</AnchorLink> die im
      Rahmen des Projektes von Bürger:innen vervollständigt und überprüft
      wurden. Punktuell wurden zusätzliche Daten, wie beispielsweise aus
      crowd-sensing-Kampagnen per{' '}
      <AnchorLink href="#todo-simra">SimRa App</AnchorLink>, oder in der Kommune
      vorhandenen Daten ergänzend eingebunden.
    </Intro>
    <Paragraph>
      <strong>Herausforderung:</strong> Vielerorts wollen Städte und Gemeinden
      die Rahmenbedingungen für das Radfahren verbessern. Jedoch fehlt oft noch
      die Übersicht über den aktuellen Zustand der Infrastruktur, Potentialen
      und konkreten Handlungsbedarfen. Wenn es Daten zum Radverkehr gibt, sind
      diese nicht flächendeckend vorhanden, nicht aktuell oder können nicht gut
      ausgewertet werden. An dieser Stelle setzt der Radverkehrsatlas an.
    </Paragraph>
    <Paragraph>
      Der Radverkehrsatlas soll es Kommunen ermöglichen, eigenständig ein
      Radverkehrskonzept zu erstellen und Maßnahmen zur Verbesserung der
      Infrastruktur zu entwickeln. Potenzielle Nutzer sind dabei nicht nur
      Fachexperten und Verwaltung, sondern auch alle anderen aktiv den
      Radverkehr fördernde Akteure. Die Menschen vor Ort können dazu mit ihrem
      lokalen Wissen, die Daten in OpenStreetMap als wichtige Arbeitsgrundlage
      selbst zu erheben und vervollständigen.
    </Paragraph>
    <Paragraph>
      In Rahmen des NUDAFA-Reallabors wird derzeit der erste Prototyp des
      Radverkehrsatlas zur Entwicklung eines interkommunalen Radnetzes für
      Eichwalde und die angrenzenden Nachbarkommunen Schulzendorf und Zeuthen
      erprobt. Dabei wird gleichzeitig erforscht, inwieweit mit dem
      Radverkehrsatlas die interkommunale Zusammenarbeit gestärkt werden kann.
    </Paragraph>
    <Heading as="h3">Der Radverkehrsatlas</Heading>
    <Paragraph>
      Die im folgenden vorgestellten Themenkarten fassen alle wichtigen Daten
      für die Radnetzplanung zusammen und visualisieren diese auf interaktiven
      Karten. Für die Radnetzplanung werden basierend auf thematischen Karten
      die “klassischen” Planungsschritte (Quell- und Zielanalyse, Entwicklung
      eines Zielnetzes, Entwicklung Routennetzes usw.) nachvollzogen. Neue Daten
      können im Laufe der Zeit ergänzt und das Zielnetz bei Bedarf auch
      überarbeitet und aktualisiert werden.
    </Paragraph>
    <Heading as="h3">Zielnetz, Radnetz und Planungskarte</Heading>
    <Paragraph>
      Auf Basis der Themenkarten wird in einem Workshop gemeinsam mit Akteueren
      der KOmmunalen Verwaltungen, der Zivilgesellschaft und unter fachlicher
      Leitung zunächst ein Zielnetz, in der Folge ein Entwurf der Radnetzplanung
      und in späteren Schritten eine Maßnahmenliste erarbeitet. Die
      Radnetzplanung wird ebenfalls in der Karte veröffentlicht. Die
      Maßnahmenliste wird später in eine Planungskarte überführt die für die
      Projektsteuerung, Priorisierung, öffentliche Kommunikation und Beteiligung
      genutzt werden kann.
    </Paragraph>
    <Paragraph>
      Wie beschrieben, bilden die fortlaufend angepasste Netzkonzept” und die
      “Maßnahmenübersicht” den Kern des interkommunalen Radverkehrskonzeptes
      ZESplus. Die darin vorgeschlagenen Maßnahmen der Radverkehrsförderung und
      die laufende Fortschreibung basiert auf den Themenkarten sowie auf der
      aktiven Einbeziehung der beteiligten Kommunen und Bürger:innen.
    </Paragraph>
  </>
);
