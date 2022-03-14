import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import MapPlaceholder from '../components/MapPlaceholder';

export const SectionNetwork = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Vorhandene Netzkonzepte + Ziele + Anschlußpunkte
    </Heading>
    <Paragraph>
      Es gibt in dem Betrachtungsraum bereits eine Vielzahl an vorhandenen
      Radrouten und Netzkonzepten. Dazu gehören Routen auf Landkreisebene,
      Touristische Routen, Netze der Nachbargemeinden und Vorschläge aus dem
      zivilgesellschaftlichen Fahrradnetzwerk der Gemeinden ZES. Um diese
      Konzepte für die Netzplanung gut nutzbar zu machen, wurden sie gemeinsam
      mit Quell- und Zielpunkten übersichtlich in einer Karte dargestellt.
    </Paragraph>

    <Heading as="h3">Themenkarte 4: Vorhandene Netze und Vorschläge:</Heading>
    <MapPlaceholder alt="Platzhalter Karte" />
    {/* Konzept LK Dahme-Spree (Quelle: IGS, Oktober 2020)
*Touristische Radrouten(Quelle: OSM Juni 2020 )
*Konzept ZES (Prio: hoch) (Quelle: Radgruppe ZES+ Juli 2020)
a) Hauptachsen
b)Achsen ZES
*RSV BER-KW Varianten (Quelle: Radgruppe ZES+ Juli 2020
*Radkonzept Schönefeld (Quelle: Radgruppe ZES+ Juli 2020
*Berliner Radverkehrsnetz: Entwurf der Verkehrs- und Umweltverbände Quelle: ADFC, Dezember 2019
*Radschnellverbindung Y-Trasse, Quelle InfraVelo GmbH April 2019 */}
  </>
);
