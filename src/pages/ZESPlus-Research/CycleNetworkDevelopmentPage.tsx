import React from 'react';
import { ArticleHeader, Intro, Paragraph } from '~/components2/Article';
import LogoZES from './components/Logos/assets/logo-zes.png';
import LogoZES2 from './components/Logos/assets/logo-zes@2x.png';
import LogoZES3 from './components/Logos/assets/logo-zes@3x.png';
import Logos from './components/Logos/Logos';
import {
  SectionAreaOfInteres,
  SectionBasics,
  SectionCurrent,
  SectionNetwork,
  SectionNextSteps,
  SectionPlanningMap,
  SectionUsageRequirements,
} from './radnetzentwicklung';
import { Logo, Wrapper } from './styles';

export const CycleNetworkDevelopmentPage = () => (
  <Wrapper
    tocTitle="Inhalt"
    enumerateToc={false}
    bannerTitle="Forschungs&shy;projekt - ZES-Plus"
    logo={
      <Logo
        src={LogoZES2}
        srcSet={`${LogoZES} 1x, ${LogoZES2} 2x, ${LogoZES3} 3x`}
        alt="Logo ZES+"
      />
    }
  >
    <ArticleHeader
      kicker="Modellprojekt der MobilitätsWerkStatt 2025"
      publishDate={new Date('2022-03-30 10:00')}
      author="Jörg Jenoch, Bürgermeister Eichwalde"
    >
      Radnetzplanung basierend auf OSM-Daten
    </ArticleHeader>
    <Intro>
      Dieser Artikel beschreibt, wie mit Hilfe von OSM-Daten die Grundlagen für
      eine Radnetzplanung im kleinstädtischen bzw. ländlichen Raum erstellt
      wurden. Dabei wurde der Planungsprozess so einfach wie möglich gehalten,
      mit dem Ziel eine für die hier betrachteten Siedlungsräume adäquate
      Netzplanung zu erstellen und gleichzeitig einen so weit wie möglich
      automatisierten und leicht übertragbaren Prozess der Datenanalyse zu
      entwickeln. Der dargestellte Ablauf kann mit der entwickelten Methodik und
      den dahinterliegenden Datenverarbeitungsschritten in vergleichbaren
      Kommunen mit verhältnismäßig geringem finanziellen Aufwand übertragen
      werden.{' '}
    </Intro>
    <Paragraph>
      Aufbauend auf den manuell in QGIS erstellten Themenkarten in der
      abgeschlossenen Phase I des NUDAFA-Projektes, wurde diese um weitere
      Karten ergänzt und der ursprüngliche Betrachtungsraum (Eichwalde, Zeuthen,
      Schulzendorf) um die Nachbargemeinden Königs Wusterhausen, Schönefeld und
      Wildau erweitert. Für alle Karten wurden die Datenextraktions- und
      Datenanalyse-Schritte weitestgehend automatisiert. In iterativen
      Wiederholungen der Datenverarbeitungsschritte wurden Lücken in den
      genutzten OSM-Daten identifiziert, um diese dann gezielt gemeinsam mit den
      Bürger:innen vor Ort zu schließen.
    </Paragraph>
    <SectionAreaOfInteres toc="Gebiet" />
    <SectionBasics toc="Grundlagen" />
    <SectionUsageRequirements toc="Anforderungen" />
    <SectionCurrent toc="Ist-Zustand" />
    <SectionNetwork toc="Netzkonzepte" />
    <SectionPlanningMap toc="Karte" />
    <SectionNextSteps toc="Ausblick" />
    <Logos />
  </Wrapper>
);
