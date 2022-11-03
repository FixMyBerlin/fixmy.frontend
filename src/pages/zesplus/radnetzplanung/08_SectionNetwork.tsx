import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { MapPlaceholder } from '../components/MapPlaceholder/MapPlaceholder';

export const SectionNetwork = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Themenkarte Zielnetz, Radnetz und Maßnahmen
    </Heading>
    <Paragraph>
      Die “Themenkarte <strong>Zielnetz, Radnetz und Maßnahmen”</strong> zeigt,
      worauf sich die lokalen Akteure als Radnetz und als Maßnahmen verständigt
      haben. Sie fasst den angestrebten Ausbauzustand sowie den Fortschritt der
      laufenden und angestrebten Maßnahmen zusammen. Sie stellt damit ein
      wichtiges Kommunikationsmittel zwischen der Kommunen untereinander, aber
      auch zwischen der Verwaltung, der Politik und der Zivilgesellschaft dar.
    </Paragraph>
    <Paragraph>
      Die Inhalte der Karte werden, idealerweise mit Hilfe der Themenkarten, in
      einem gemeinsamen Workshop mit allen relevanten Akteuren erstellt.
      Ausgehend von den Themenkarten wird dabei zunächst ein
      kommunenübergreifendes Zielnetz erstellt. Im Abgleich mit den in den
      Themenkarten dargestellten Informationen zu Situation vor Ort (vgl.
      Straßentypen) wird dieses dann zu einem interkommunalen Radnetz
      weiterentwickelt. Anschließend werden die zur Realisierung des Radnetzes
      notwendigen Maßnahmen in einer Liste zusammengetragen und in der Karte
      dargestellt.
    </Paragraph>
    <Paragraph>
      Aktuell wird dieser Prozess unter Einbezug der unterschiedlichen
      Akteursgruppen gemeinsam für die Kommunen Eichwalde, Zeuthen, Schulzendorf
      und Wildau durchgeführt. Dabei wird aktuell noch erprobt, welche
      Vorgehensweisen bzw. welche Formate sich für die interkommunale
      Zusammenarbeit für ein gemeinsames Radverkehrsnetz am besten eignen.
      Sobald dieser Prozess abgeschlossen ist, wird er ausgewertet und die
      resultierenden Erkenntnisse, Handlungsempfehlungen und Hinweise hier auf
      dieser Website in einer weiteren Unterseite veröffentlicht.
    </Paragraph>

    <MapPlaceholder alt="TODO Platzhalter Karte Prüfkonzept" />
  </>
);
