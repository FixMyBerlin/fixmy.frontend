import React from 'react';
import styled from 'styled-components';
import { Paragraph, List, Heading, SectionProps } from '~/components2/Article';
import { AnchorButton } from '~/components2/Button';
import Link from '~/components2/Link';
import ButtonWrapper from '../components/ButtonWrapper';

const StyledList = styled(List)`
  list-style-type: lower-alpha;
`;

const SectionData = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Datengrundlagen
    </Heading>
    <Paragraph>
      Die Themenkarten basieren im Wesentlichen auf zwei unterschiedliche
      Datentypen: Einerseits statische Geodaten, d.h. räumliche Informationen
      zum Untersuchungsgebiet, beispielsweise zum Straßennetz, zur
      Radinfrastruktur, zu möglichen Quell- und Zielpunkten oder auch bereits
      vorhandenen Netz-Entwürfe für das Untersuchungsgebiet oder darüber hinaus.
      Andererseits auf Informationen über das Verhalten der Radfahrenden
      (Nutzerdaten) welche mit Hilfe einer App erfasst und mit speziell dafür
      entwickelten Auswertungsalgorithmen analysiert wurden. Der nachfolgende
      Abschnitt stellt dar, woher diese Daten stammen und wie sie verarbeitet
      wurden.
    </Paragraph>
    <a href="simra-data" id="simra-data" className="internal">
      <Heading as="h3">Auswertung der SimRa-Daten</Heading>
    </a>
    <Paragraph>
      Die Erfassung der Daten zum Verkehrsverhalten der Radfahrenden erfolgte
      durch die Crowdsensing-App{' '}
      <Link href="https://www.digital-future.berlin/forschung/projekte/simra/">
        “SimRa”
      </Link>{' '}
      des{' '}
      <Link href="https://www.mcc.tu-berlin.de/">
        Fachgebiets Mobile Cloud Computing
      </Link>{' '}
      der TU Berlin. Mit GPS- und Beschleunigungssensoren sammeln die
      Smartphones der Teilnehmer:innen auf datenschutzkompatible Art und Weise
      Daten zu Beinaheunfällen, zu Routenwahl, zur Oberflächenqualität der
      befahrenen Wege und zur Geschwindigkeit der Radfahrenden:
    </Paragraph>
    <StyledList ordered>
      <List.Item>
        <strong>Erfassung von sogenannten Beinahe-Unfällen:</strong> Auswertung
        abrupter Richtungsänderungen sowie manuell eingegebener Vorfälle /
        Beinahe-Unfälle,
      </List.Item>
      <List.Item>
        <strong>Sensorbasierte Oberflächenbewertung:</strong> systematische
        Auswertung der am Rad aufgezeichneten Erschütterungen,
      </List.Item>
      <List.Item>
        <strong>Box-Abfrage:</strong> interaktiver Abfragedialog von
        Quell-Ziel-Beziehungen, zeigt bspw. Umwege, Vermeiden problematischer
        Streckenabschnitte, Einzugsradien der S-Bahn und Schulen etc.,
      </List.Item>
      <List.Item>
        <strong>Wartezeiten an Knotenpunkten:</strong> Auswertung der
        Durchfahrten und der Standzeit an Knotenpunkten, und
      </List.Item>
      <List.Item>
        <strong>Fahrt-Kontinuität:</strong> Auswertung der relativen
        Geschwindigkeit bzw. der Häufigkeiten von Beschleunigungs- und
        Bremsvorgängen.
      </List.Item>
    </StyledList>
    <Paragraph>
      Die Analyse der Nutzer:innendaten und der sensorbasierten
      Zustandsbewertung ermöglicht für ausgewählte Faktoren eine objektive
      Bewertung der Bedarfe, der präferierten Wege und der vorhandenen
      Infrastruktur. Die Ergebnisse der Auswertung fließen in mehrere
      Themenkarten mit ein.
    </Paragraph>
    <ButtonWrapper>
      <AnchorButton
        flat
        target="_blank"
        rel="noopener noreferrer"
        href="http://207.180.205.80/map?lat=52.35248555312976&lng=13.631286621093752&z=13&style=CARTO_POSITRON&m=1&sm=0"
      >
        Zur Auswertung der SimRa-Daten
      </AnchorButton>
    </ButtonWrapper>
    <Heading as="h3">Auswertung der OSM-Daten</Heading>
    <Paragraph>
      Eine zentrales Ziel des NUDAFA-Projekts ist es, die Möglichkeiten zur
      Einbindung von Daten aus OpenStreetMap (OSM) in den Erstellungsprozess
      eines Radverkehrsnetzes zu prüfen. Bei den OSM-Daten handelt es sich um
      gemeinschaftliche durch die Nutzer:innen erhobene Geodaten, die dank Open
      Database-Lizenzierung für jedermann nutzbar sind. Insbesondere zum
      Straßennetz sind darin umfangreiche Informationen vorhanden.
    </Paragraph>
    <Paragraph>
      Die ausgewerteten OSM-Daten können die Netzplanung maßgeblich unterstützen
      und einzelne Analyseschritte vereinfachen. Dazu wurde untersucht, welche
      Arbeitsschritte der Konzepterstellung mit OSM-Daten und einer darauf
      zugeschnittenen Methodik unterstützt werden können. So wurde bspw. für
      Erfassung des Ist-Zustandes eine Systematik entwickelt, mit der die in den
      Gemeinden vorhandenen, vordefinierten Straßentypen anhand der OSM-Daten
      verortet werden können. Insgesamt wird so eine einheitliche Datengrundlage
      für die drei Gemeinden geschaffen. Durch die Automatisierung der
      Verarbeitungsprozesse kann der Aufwand zur Erfassung und Auswertung
      signifikant minimiert werden. Die Automatisierung ermöglicht auch das
      Aktualisieren der Analyseergebnisse bei veränderter Datenlage, sowie die
      Übertragung der Methodik auf vergleichbare Untersuchungsräume.
    </Paragraph>
  </>
);

export default SectionData;
