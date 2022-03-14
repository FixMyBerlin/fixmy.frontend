import React from 'react';
import {
  Details,
  Heading,
  Paragraph,
  SectionProps,
} from '~/components2/Article';
import MapPlaceholder from '../components/MapPlaceholder';

export const SectionUsageRequirements = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Nutzungsanforderungen im Wegenetz ermitteln
    </Heading>
    <Paragraph>
      Für die Erstellung des Radnetzes sollen zunächst die vorhandenen
      Nutzungsanforderungen des Wegenetzes bestimmt werden. Dazu wurde eine
      Karte mit Straßentypen, abgeleitet aus OSM-Daten, erstellt. Die vier hier
      klassifizierten Typen entsprechen typischen Nutzungsansprüchen in dieser
      oder vergleichbaren Siedlungsräumen. Es wird unterschieden nach:
    </Paragraph>
    <Details summary="Wohnstraßen">
      Wohnstraßen stellen die Verbindung zum Zuhause dar. Sie sind vorwiegend
      verkehrsberuhigt und man erkennt sie an der Vielzahl parkender Autos.
      Außerdem findet man hier Wohnhäuser und Grünanlagen.
    </Details>

    <Details summary="Haupt- und Sammelstraßen (meist innerorts)">
      Haupt- und Sammelstraßen dienen der Durchfahrung und Erschließung von
      Kommunen. Sie sind eher nicht verkehrsberuhigt und meistens befinden sich
      hier wichtige Einrichtungen sowie vereinzelt Geschäfte.
    </Details>

    <Details summary="Haupt- und Landstraßen (meist außerorts)">
      Haupt- und Landstraßen stellen die Verknüpfung von Kommunen untereinander
      her. Gerade außerorts sind höhere Geschwindigkeiten möglich. Oft haben sie
      keine Bebauung, die an die Straße grenzt (außer sie führen durch einen
      Ort) und man erkennt sie außerdem auch gut an ihrer Bezeichnung (z.B.
      L245).
    </Details>

    <Details summary="Frei geführte Wege">
      Die frei geführten Wege sind auch bekannt als “Schleichwege”. Sie sind
      vorwiegend von Befahrung mit dem Pkw ausgeschlossen. Außerdem zeichnen sie
      sich durch eine tendenziell schlechtere Infrastruktur und Qualität aus.
      Gerade innerhalb der Kommunen sind sie aber essenziell, um auf kürzesten
      Weg mit dem Fahrrad oder zu Fuß unterwegs zu sein.
    </Details>

    <Paragraph>
      Als weiteres Unterscheidungsmerkmal wurden Ansammlungen von Geschäften und
      weiteren Zielorten (z.B. Bildungseinrichtungen) die höheres
      Fußverkehrsaufkommen oder Lieferverkehr bedingen extrahiert und visuell
      überlagert, so können z.B. “Geschäftsstraßen” erkannt und gesondert
      betrachtet werden.
    </Paragraph>

    <Paragraph>
      Die Unterscheidung der Typen wurde in der Abwägung von vorhandenen Daten
      und Auswertungsmöglichkeiten in OSM sowie ausreichender Differenzierung
      für die Netzplanung getroffen. Detailliertere Unterscheidungen der
      Straßentypen sind denkbar, wären aber mit einem hohen Detailgrad beim
      Erfassen der OSM-Daten verbunden. Der hier gewählte Ansatz erscheint
      zunächst den besten Kompromiss zwischen den Anforderung der Netzkonzeption
      im betrachteten Siedlungsraum und Höhe des Aufwands beim Kartieren in OSM
      darzustellen. Eine ausführliche Beschreibung der Straßentypen und ihrer
      Genese findet sich hier
    </Paragraph>
    {/* TODO LINK --^ */}
    <Paragraph>
      Die Skripte zur Analyse der Straßentypen sind OpenSource auf GitHub
      veröffentlicht.
    </Paragraph>
    {/* TODO LINK --^ */}

    <Heading as="h3">Themenkarte 2: Straßentypen</Heading>
    <MapPlaceholder alt="Platzhalter Karte" />
  </>
);
