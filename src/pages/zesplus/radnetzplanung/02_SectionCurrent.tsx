import React from 'react';
import { Heading, List, Paragraph, SectionProps } from '~/components2/Article';
import { StyledList } from '../components';
import { MapCurrent } from './components/Maps';

export const SectionCurrent = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Themenkarte Vorhandene Netze und Planungen
    </Heading>
    <Paragraph>
      <strong>Funktion:</strong>
    </Paragraph>
    <StyledList>
      <List.Item>
        Darstellung der Kommunalen Hoheitsgebiete (insb. Kommunen, Landkreis und
        Landesgrenzen)
      </List.Item>
      <List.Item>Darstellung des Betrachtungsraums </List.Item>
      <List.Item>Darstellung vorhandener Radrouten und -netze </List.Item>
      <List.Item>
        Stellt Anforderungen des Touristischen Radverkehrs dar
      </List.Item>
    </StyledList>
    <Paragraph>
      <strong>Datenquellen:</strong>
    </Paragraph>
    <StyledList>
      <List.Item>OSM-Daten</List.Item>
      <List.Item>
        Vorhandende Planungen, manuell importiert aus anderen Quellen
      </List.Item>
    </StyledList>
    <Paragraph>
      <strong>Beschreibung:</strong>
    </Paragraph>
    <Paragraph>
      Die <strong>“Themenkarte Vorhandene Netze und Planungen”</strong> stellt
      die im Betrachtungsraum vorhandenen Radrouten und Netzkonzepte dar. Dazu
      gehören Routen auf Landkreisebene, Touristische Routen, Netze der
      Nachbargemeinden und Vorschläge aus dem zivilgesellschaftlichen
      Fahrradnetzwerk der Gemeinden ZES. Sobald Radrouten über Kommunen-,
      Landkreis- und Landesgrenzen führen, ergibt sich daraus oft ein
      zusätzlicher Abstimmungsbedarf zur Planung, Umsetzung und später auch beim
      Unterhalt der Wegeverbindung. Daher sind in der Karte auch die grenzen der
      unterschiedlichen kommunalen Hoheitsgebiete dargestellt. Der
      Betrachtungsraum umfasst dabei für jede der betrachteten Kommunen den
      Umkreis von 10 km um den jeweiligen Siedlungskern.
    </Paragraph>
    <Paragraph>
      Diese Themenkarte gibt Übersicht über die bereits vorhandenen Netzkonzepte
      für den Alltags- wie auch den Freizeitradverkehr, die oft unterschiedliche
      Zielstellungen verfolgen und nicht unbedingt aufeinander Abgestimmt sind.
      Sie dient somit als Arbeitsgrundlage für die Entwicklung des
      Radverkehrsnetzes. Später kann mit ihr der Netzentwurf geprüft werden und
      die Bedeutung von Maßnahmen im Gesamtnetz oder der Nutzen für
      touristischen Radverkehr beurteilt werden.
    </Paragraph>

    <MapCurrent />
  </>
);
