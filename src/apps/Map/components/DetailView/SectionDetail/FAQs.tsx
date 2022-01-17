import React from 'react';
import styled from 'styled-components';
import { AnchorLink } from '~/components2/Link';

const Container = styled.section`
  padding: 0 1em;
  line-height: 1.4;

  ol {
    list-style-type: lower-alpha;
    padding-left: 1em;
  }

  li {
    margin-bottom: 1em;
  }
`;

const AccidentClasses = styled.ol`
  && {
    list-style-type: decimal;
  }
`;

export const AccidentsFAQ = () => (
  <Container>
    <h3>Wie bewertet der Vision-Zero-Check Knotenpunkte?</h3>
    <p>
      Wir bewerten Knotenpunkte im Vision-Zero-Check anhand der Unfälle mit
      Fahrradbeteiligung aus den letzten drei Jahren nach vier Kategorien:
    </p>
    <AccidentClasses>
      <li>
        <strong>Unfallschwerpunkt:</strong> Es gab an diesem Knotenpunkt in den
        letzten drei Jahren: a) mindestens 3 Unfälle mit schwerem
        Personenschaden oder getöteten Personen oder b) mindestens 5 Unfälle mit
        mindestens leichtem Personenschaden.
      </li>

      <li>
        <strong>Vermehrte Unfälle:</strong> Es gab an diesem Knotenpunkt mehr
        als 3 Unfälle mit Personenschaden.
      </li>

      <li>
        <strong>Wenige Unfälle:</strong> Es gab an diesem Knotenpunkt 1-3
        Unfälle mit Personenschaden.
      </li>

      <li>
        <strong>Keine Unfälle:</strong> Es gab diesem Knotenpunkt keine Unfälle
      </li>
    </AccidentClasses>

    <p>
      Die Bewertung ist angelehnt an die{' '}
      <AnchorLink href="https://www.berlin.de/sen/uvk/verkehr/verkehrspolitik/verkehrssicherheit/unfallkommission/verkehrsunfaelle-mit-todesfolge-21-mobg/">
        Systematik der Unfallkommision des Landes Berlin
      </AnchorLink>
      . Die dortige Definition beruht auf dem „Merkblatt zur örtlichen
      Unfalluntersuchung in Unfallkommissionen“ der FGSV
    </p>

    <p>
      Es werden alle Unfälle mit Radfahrbeteiligung aus den Unfalldaten der
      letzten verfügbaren drei Jahre ausgewertet. Dabei werden keine Unfälle mit
      Sachschaden berücksichtigt (ca. 25% der Gesamtunfälle). Es wird jeweils
      der Radius von 30 Metern um den Mittelpunkt des Knotens ausgewertet. Bei
      einigen Knotenpunkten wurden darüberhinaus einzelne Unfälle, die auf die
      Kreuzungssituation zurückzuführen waren mit einbezogen.
    </p>

    <h3>Was ist die Vision Zero?</h3>
    <p>
      Das Berliner Mobilitätsgesetz verfolgt als oberstes Ziel die Vision Zero.
      Das Ziel ist, dass im Straßenverkehr keine Menschen mehr tödlich oder
      schwer verletzt werden. Das Mobilitätsgesetz orientiert seinen
      Sicherheitsbegriff dabei besonders an den stärker zu schützenden
      Verkehrsteilnehmer:innen, dazu gehören auch Radfahrende. In
      Abwägungsentscheidungen bei der Verkehrsplanung bedeutet dies, dass z.B.
      ein schnell vorankommender Autoverkehr geringere Priorität hat, als die
      Vermeidung von Unfällen.
    </p>

    <p>
      Um die Vision Zero zu erreichen schreibt das Mobilitätsgesetz fest, dass
      dort wo sich Unfälle mit getöteten Personen ereignen oder solche
      Schwerverletzen häufen unverzüglich geprüft werden muss, welche Maßnahmen
      zur Verhinderung weiterer Unfälle kurz- mittel- und langfristig getroffen
      werden können. Die{' '}
      <AnchorLink href="https://www.berlin.de/sen/uvk/verkehr/verkehrspolitik/verkehrssicherheit/unfallkommission/verkehrsunfaelle-mit-todesfolge-21-mobg/jahr-2020/">
        Ergebnisse dieser Prüfung
      </AnchorLink>{' '}
      werden von der Unfallkommision hier für die Jahre 2018, 2019, 2020, 2021
      veröffentlicht.
    </p>

    <h3>Wie werden weitere Unfälle verhindert?</h3>
    <p>
      Entsprechend den Ergebnissen der Unfallauswertung sind geeignete Maßnahmen
      zu treffen. Das können
    </p>
    <ol>
      <li>
        Die Aufstellung oder Entfernung von Verkehrszeichen oder
        Verkehrseinrichtungen sein (z.B. Abbiegeverbote),
      </li>
      <li>
        Verkehrssteuerungs- und Verkehrslenkungsmaßnahmen (z.B. Tempo 30),
      </li>
      <li>straßenbauliche Maßnahmen oder (Umbau der Kreuzung)</li>
      <li>
        Verkehrsüberwachung durch die Polizei (Kontrollen der Regeleinhaltung)
      </li>
    </ol>
  </Container>
);

export const SectionsFAQ = () => (
  <Container style={{ padding: '0' }}>
    <h3>Warum wird hier kein Happy-Bike-Index gezeigt?</h3>
    <p>
      Derzeit wird der Happy-Bike-Index nur an Knotenpunkten angezeigt, da wir
      für die Streckenabschnitte an der Verbesserung der Datenlage arbeiten.
      Dafür entwickeln wir ein Tool mit dem Bürger:innen fehlende Daten eingeben
      können, melde dich für den Newsletter an um informiert zu werden, sobald
      das Tool bereit steht.
    </p>

    <h3>Was ist der Happy-Bike-Index?</h3>
    <p>
      Der Happy-Bike-Index (HBI) hat zum Ziel, Städten eine einfache,
      datenbasierte Analyse Ihres Straßennetzes zur Qualität der vorhandenen
      Radinfrastruktur zur Verfügung zu stellen, damit diese möglichst schnell
      und effizient die Situation für den Radverkehr verbessern können. Der
      Ansatz ist neu und die komplexe Aufgabenstellung muss viele Faktoren
      berücksichtigen. So stoßen wir immer wieder auf fehlende oder
      unvollständige Daten und Herausforderungen bei der standardisierten
      Bewertung von Infrastruktur. So haben wir z.B. in 2019 / 2020 die Umfrage
      Straßencheck entwickelt und durchgeführt um eine Datengrundlage zur
      Bewertung der subjektiven Sicherheit von Radinfrastruktur zu bekommen. Ein
      Faktor, der für die Nutzung des Fahrrads durch neue Nutzergruppen
      besonders wichtig ist, zu dem es aber bisher kaum Daten gibt. Im Sinne
      eines langfristigen Forschungsprojektes entwickeln wir den HBI fortlaufend
      weiter und veröffentlichen neue Iterationen. Der Index wird immer
      übertragbar entwickelt, so dass er auch für weitere Städte erstellt werden
      kann.
    </p>

    <h4>Versionsschritte des HBI für Berlin</h4>
    <ul>
      <li>
        Februar 2021: Veröffentlichung des Straßenkatasters als Hintergrundkarte
      </li>
      <li>
        Februar 2021 Veröffentlichung des HBI für Knotenpunkte basierend auf dem
        Vision Zero Check, einer Auswertung von Unfalldaten.
      </li>
      <li>
        Mai 2020 Auswertung des Straßenchecks. Veröffentlichung eines
        Datensatzes zur Bewertung der subjektiven Sicherheit an 1.900
        unterschiedlichen Straßensituationen
      </li>
      <li>Dezember 2019 Veröffentlichung der Umfrage Straßencheck</li>
      <li>September 2018 Veröffentlichung erster Happy-Bike-Index (beta)</li>
    </ul>
  </Container>
);
