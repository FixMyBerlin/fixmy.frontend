import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { MapCurrent } from './components/Maps';

export const SectionCurrent = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Themenkarte Vorhandene Netze und Planungen
    </Heading>
    <Paragraph>
      Die “Themenkarte <strong>Vorhandene Netze und Planungen</strong>” stellt
      die im Betrachtungsraum vorhandenen Radrouten und Netzkonzepte dar. Dazu
      gehören Routen auf Landkreisebene, Touristische Routen, und Netze der
      Nachbargemeinden. Sobald Radrouten über Kommunen-, Landkreis- und
      Landesgrenzen führen, ergibt sich daraus oft ein zusätzlicher
      Abstimmungsbedarf zur Planung, Umsetzung und später auch beim Unterhalt
      der Wegeverbindung. Daher sind in der Karte auch die Grenzen der
      unterschiedlichen kommunalen Hoheitsgebiete dargestellt. Unabhängig davon
      umfasst der Betrachtungsraum eine Fläche von mindestens 10 km rund um die
      Siedlungskerne der beteiligten Kommunen herum.
    </Paragraph>
    <Paragraph>
      Diese Themenkarte gibt Übersicht über die bereits vorhandenen Netzkonzepte
      für den Alltags- wie auch den Freizeitradverkehr, die oft unterschiedliche
      Zielstellungen verfolgen und nicht unbedingt aufeinander Abgestimmt sind.
      Sie dient somit als Arbeitsgrundlage für die Entwicklung des
      Radverkehrsnetzes. Später kann der Netzentwurf damit abgeglichen werden
      und die Bedeutung von Maßnahmen im Gesamtnetz oder der Nutzen für
      touristischen Radverkehr beurteilt werden.
    </Paragraph>

    <MapCurrent />
  </>
);
