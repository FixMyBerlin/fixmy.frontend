import React from 'react';
import styled from 'styled-components';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import Link from '~/components2/Link';
import MapPlaceholder from '../components/MapPlaceholder';

import MapQuality from '../components/MapQuality';
import MapSafety from '../components/MapSafety';

const Wrapper = styled.section`
  & h3 {
    font-weight: normal;
  }
`;

const SectionNetwork = (props: SectionProps) => (
  <Wrapper>
    <Heading as="h2" {...props}>
      Die Themenkarten
    </Heading>
    <Paragraph>
      Die Themenkarten fassen jeweils unterschiedliche Informationsebenen
      zusammen. Sie sind eine wichtige Diskussionsgrundlage für die
      Bürgerbeteiligung und die Kommunikation während der Planungs- und
      Umsetzungsprozesse. Die zugrunde liegende Systematik wurde im Rahmen des
      NUDAFA-Projekts zusammen mit FixMyCity entwickelt. Die Systematik basiert
      auf gemeinfrei lizenzierten Daten sowie Verarbeitungsmethoden und ist auf
      andere Kommunen mit vergleichbaren Rahmenbedingungen übertragbar. Weiteren
      Themenkarten (bspw. zu Handlungsbedarfen an Knotenpunkten) sollen in der{' '}
      <Link internal href="#about-nudafa">
        Fortführung des NUDAFA-Projekts
      </Link>{' '}
      hinzukommen.
    </Paragraph>

    <Heading as="h3">
      <strong>Themenkarte &ldquo;Radinfrastruktur&rdquo;:</strong> Komfort &
      Qualität
    </Heading>
    <MapQuality />
    <Paragraph>
      Die Themenkarte &ldquo;Radinfrastruktur&rdquo; bildet die vorhandene
      Radinfrastruktur und die Qualität der Wegstrecken ab. Informationen zur
      vorhandenen Infrastruktur und ihrer Führungsform liefern die eingebundenen
      OSM-Daten. Die Bewertung der Qualität der Wegstrecken erfolgt auf Basis
      der systematischen, sensorbasierten{' '}
      <Link internal href="#simra-data">
        Oberflächenbewertung mit SimRa
      </Link>
      . Die Informationen beider Datenquellen wurden in Kooperation mit den
      Bürger:innen gesammelt bzw. aktualisiert und können auf diese Weise auch
      aktuell gehalten werden.
    </Paragraph>

    <Heading as="h3" {...props}>
      <strong>Themenkarte &ldquo;Sicherheit&rdquo;:</strong> (Beinahe-)Unfälle &
      Sicherheitsempfinden
    </Heading>
    <MapSafety />
    <Paragraph>
      Diese Themenkarte fasst mehrere Aspekte der objektiven wie auch der
      subjektiven Sicherheit der Radfahrenden zusammen. In der interaktiven
      Karte sind tatsächliche Unfälle verortet sowie Beinahe-Unfälle, die mit
      der SimRa-App identifiziert wurden. Die dünnen blauen Linien zeigen
      Strecken, die von Schüler:innen des Humboldt-Gymnasiums Eichwalde mit dem
      Fahrrad als Schulweg genutzt werden. Auf den orange hinterlegten
      Abschnitte fühlen sich Schüler:innen nach eigenen Angaben unsicher.
    </Paragraph>

    <Heading as="h3" {...props}>
      <strong>Themenkarte &ldquo;Führungsformen&rdquo;:</strong> Typische
      Straßenquerschnitte und Potenziale
    </Heading>
    <MapPlaceholder alt="Platzhalter für Karte der Führungsformen" />
    <Paragraph>
      Für die Themenkarte “Führungsformen” wurde eine Systematik entwickelt, mit
      der die in den Gemeinden typischerweise vorhandenen Straßentypen bzw.
      Straßenquerschnitte anhand der OSM-Daten verortet werden können. Auf Basis
      der Straßentypen können im Folgeschritt die jeweils geeigneten
      Führungsformen identifiziert und zugeordnet werden. In einer
      Übersichtstabelle werden dann für die einzelnen Führungsformen
      Mindestbreiten und Rahmenbedingungen festgelegt, die den örtlichen
      Gegebenheiten entsprechen.
    </Paragraph>
    <Paragraph>
      Die Karten, sowie die Übersicht der Straßentypen, befinden sich aktuell
      noch in der Entwicklung. Sobald diese abgeschlossen wurde, werden sie hier
      veröffentlicht.
    </Paragraph>
  </Wrapper>
);

export default SectionNetwork;
