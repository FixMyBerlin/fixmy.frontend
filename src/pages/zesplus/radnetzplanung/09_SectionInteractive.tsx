import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { MapInteractive } from './components';

export const SectionInteractive = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Interaktive Version des Radverkehrsatlases
    </Heading>
    <Paragraph>
      Zur besseren Einbindung der Karten in den Prozess der Radnetzentwicklung
      wurde eine <strong>interaktive Version des Radverkehrsatlases</strong>{' '}
      entwickelt, welche alle Themenkarten zusammenführt und ein flexibles
      Kombinieren der Informationen ermöglicht. Grundsätzlich lässt sich dieser
      systematische Ansatz der Auswertung und Darstellung verschiedenster Daten-
      und Informationsebenen auf andere Kommunen übertragen, um auch dort mit
      Hilfe des Radverkehrsatlases zur Beschleunigung der Radverkehrsförderung
      beizutragen.
    </Paragraph>
    <Paragraph>
      Durch den Einbezug der sechs, in ihrer Art durchaus unterschiedlichen,
      Partnerkommunen des NUDAFA-Reallabors lässt sich bereits eine gewisser
      Grad der Übertragbarkeit feststellen. Welche Anpassungen für die Anwendung
      auf andere Kommunen notwendig sind, soll nun in weiteren Projekten in
      weiteren Städte und Regionen erprobt werden.
    </Paragraph>

    <MapInteractive />
  </>
);
