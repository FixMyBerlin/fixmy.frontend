import React from 'react';
import styled from 'styled-components';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { Link } from '~/components2/Link';
import MapPlaceholder from '../components/MapPlaceholder';
import MapQuality from '../components/MapQuality';
import MapSafety from '../components/MapSafety';

const SectionHeadingWrapper = styled.div`
  & h3 {
    font-weight: normal;
  }
`;

// This component allows h3 elements in this section to use a mix of bold
// and normal font-weight
const SectionH3 = ({ children }) => (
  <SectionHeadingWrapper>
    <Heading as="h3">{children}</Heading>
  </SectionHeadingWrapper>
);

export const SectionNetwork = (props: SectionProps) => (
  <>
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

    <SectionH3>
      <strong>Themenkarte &ldquo;Radinfrastruktur&rdquo;:</strong> Komfort &
      Qualität
    </SectionH3>
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

    <SectionH3>
      <strong>Themenkarte &ldquo;Sicherheit&rdquo;:</strong> (Beinahe-)Unfälle &
      Sicherheitsempfinden
    </SectionH3>
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

    <SectionH3>
      <strong>Themenkarte &ldquo;Führungsformen&rdquo;:</strong> Typische
      Straßenquerschnitte und Potenziale
    </SectionH3>
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
  </>
);
