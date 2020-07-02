import React from 'react';

import { Paragraph, Heading, ImageMulti, List } from '~/components2/Article';
import Link from '~/components2/Link';
import BarChart from '../components/BarChart';
import FeelSafe from '../components/FeelSafe';

/* eslint-disable @typescript-eslint/no-unused-vars */
import image1 from '../images/image-1.jpg';
import CP_C_1093 from '../images/01_CP_C_1093_@x2.jpg';
import CP_C_1100 from '../images/01_CP_C_1100_@x2.jpg';
import CP_C_194 from '../images/01_CP_C_194_@x2.jpg';
import CP_C_463 from '../images/01_CP_C_463_@x2.jpg';
import CP_C_49 from '../images/01_CP_C_49_@x2.jpg';
import CP_C_509 from '../images/01_CP_C_509_@x2.jpg';
import CP_C_516 from '../images/01_CP_C_516_@x2.jpg';
import CP_C_553 from '../images/01_CP_C_553_@x2.jpg';
import CP_C_58 from '../images/01_CP_C_58_@x2.jpg';
import CP_C_688 from '../images/01_CP_C_688.jpg';
import CP_C_725 from '../images/01_CP_C_725_@x2.jpg';
import CP_C_823 from '../images/01_CP_C_823_@x2.jpg';
import CP_P_149 from '../images/01_CP_P_149_@x2.jpg';
import CP_P_185 from '../images/01_CP_P_185_@x2.jpg';
import CP_P_194 from '../images/01_CP_P_194_@x2.jpg';
import CP_P_203 from '../images/01_CP_P_203_@x2.jpg';
import CP_P_778 from '../images/01_CP_P_778_@x2.jpg';
import MS_C_1220 from '../images/01_MS_C_1220_@x2.jpg';
import MS_C_17 from '../images/01_MS_C_17_@x2.jpg';
import MS_C_2 from '../images/01_MS_C_2.jpg';
import MS_C_21 from '../images/01_MS_C_21_@x2.jpg';
import MS_C_305 from '../images/01_MS_C_305_@x2.jpg';
import MS_C_325 from '../images/01_MS_C_325_@x2.jpg';
import MS_C_377 from '../images/01_MS_C_377_@x2.jpg';
import MS_C_51 from '../images/01_MS_C_51_@x2.jpg';
import MS_C_75 from '../images/01_MS_C_75_@x2.jpg';
import MS_C_587 from '../images/01_MS_C_587_@x2.jpg';
import MS_C_596 from '../images/01_MS_C_596_@x2.jpg';
import MS_C_597 from '../images/01_MS_C_597_@x2.jpg';
import MS_C_606 from '../images/01_MS_C_606_@x2.jpg';
import MS_C_611 from '../images/01_MS_C_611_@x2.jpg';
import MS_C_619 from '../images/01_MS_C_619_@x2.jpg';
import MS_C_620 from '../images/01_MS_C_620_@x2.jpg';
import MS_C_860 from '../images/01_MS_C_860_@x2.jpg';
import MS_C_980 from '../images/01_MS_C_980_@x2.jpg';
import SE_C_10 from '../images/01_SE_C_10_@x2.jpg';
import SE_C_11 from '../images/01_SE_C_11_@x2.jpg';
import SE_C_12 from '../images/01_SE_C_12_@x2.jpg';
import SE_C_2 from '../images/01_SE_C_2_@x2.jpg';
import SE_C_42 from '../images/01_SE_C_42_@x2.jpg';
import SE_C_44 from '../images/01_SE_C_44_@x2.jpg';
import SE_C_47 from '../images/01_SE_C_47_@x2.jpg';
import SE_C_49 from '../images/01_SE_C_49_@x2.jpg';
import SE_C_50 from '../images/01_SE_C_50_@x2.jpg';
import SE_C_71 from '../images/01_SE_C_71_@x2.jpg';
import MS_A_1285 from '../images/01_MS_A_1285_@x2.jpg';
import MS_A_570 from '../images/01_MS_A_570_@x2.jpg';
import MS_A_586 from '../images/01_MS_A_586_@x2.jpg';
import MS_A_343 from '../images/01_MS_A_343_@x2.jpg';
import MS_A_67 from '../images/01_MS_A_67_@x2.jpg';
/* eslint-enable @typescript-eslint/no-unused-vars */

const SectionResults = ({ toc }) => (
  <>
    <Heading as="h2" toc={toc}>
      Statistische Auswertung
    </Heading>

    <Paragraph>
      Mit den generierten Daten ist die Überprüfung von verschiedensten
      Hypothesen möglich. Ein besonderes Interesse der Forschung liegt
      beispielsweise auf der Nutzergruppe der potentiell Radfahrenden. Ab
      welcher Verkehrsinfrastruktur fühlt sich diese Nutzergruppe im Straßenraum
      sicher? Ist die Verkehrsstärke auch bei einer Trennung zwischen Rad- und
      Kfz-Verkehr eine ausschlaggebende Einflussgröße? Welche
      Verkehrsinfrastruktur empfinden die meisten Befragten als sicher? Welche
      Poller werden als am sichersten empfunden?
    </Paragraph>
    <Paragraph>
      Mittels den zur Verfügung gestellten Daten können interessierte Personen
      diese, sowie ihre eigenen Hypothesen, überprüfen. Mehr dazu im folgenden
      Abschnitt.
    </Paragraph>
    
    <Heading as="h3">Führung auf der Fahrbahn</Heading>
    <Paragraph>
      Wir betrachten zunächst die Führung an Hauptverkehrsstraßen. Nebenverkehrsstraßen werden in einem späteren Kapitel betrachtet.
    </Paragraph>
    <Heading as="h3">Führung im Mischverkehr ist unsicher</Heading>
    <Paragraph>
      Eine Führung des Radverkehrs im Mischverkehr wird als deutlich unsicherer empfunden als eine Führung auf jeder Art von RVA. Werden die Faktoren Tempolimit, Verkehrsstärke und rechtsseitiges Parken variiert ändert sich das Sicherheitsempfinden. Aber auch in der bestbewerteten Situation ist kein ausreichendes Sicherheitsempfinden (Wir gehen hier davon aus, dass eine Bewertung “eher sicher” oder “sicher” von über 80% der Teilnehmenden ein anzustrebender Wert für eine subjektiv sichere Infrastruktur ist)   zu erzielen. Im Vergleich der Nutzermerkmale gibt es den größten Unterschied zwischen Männern und Frauen, aber insgesamt große Übereinstimmungen. Alle Typen von Radfahrenden (Viel-, oder Wenig-Radfahrende, weibliche oder männliche, ältere und jüngere, etc.) fühlen sich im Mischverkehr unsicher.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_2}>
        <FeelSafe value={28} />
        <ImageMulti.Subtitle>
          *27,62 % der Nutzer:innen bewerteten diese Situation als „sicher“ oder
          „eher sicher“
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_587}>
        <FeelSafe value={11} />
        <ImageMulti.Subtitle>
          *11,05 % der Nutzer:innen bewerteten diese Situation als „sicher“ oder
          „eher sicher“
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title="Führung auf der Fahrbahn (HVS-F) mit und ohne Radverkehrsanlage (RVA)"
      source="Anm: Durchschnitt der Bewertungen aller Situationen auf HVS. Busspuren wurden hier in der Gruppe 'mit RVA' aufgenommen."
    >
      <BarChart title="mit RVA" data={[3, 18, 49, 30]} feelsafe={75.52} />
      <BarChart title="ohne RVA" data={[52, 33, 12, 3]} feelsafe={14} />
      <BarChart
        title="ohne RVA (Vielfahrer)"
        data={[51, 35, 12, 2]}
        feelsafe={15}
      />
      <BarChart
        title="ohne RVA (Seltenfahrer)"
        data={[58, 29, 10, 4]}
        feelsafe={12.87}
      />
      <BarChart
        title="ohne RVA (weiblich)"
        data={[58, 31, 9, 2]}
        feelsafe={10.52}
      />
      <BarChart
        title="ohne RVA (männlich)"
        data={[48, 35, 14, 3]}
        feelsafe={16.15}
      />
      <BarChart
        title="ohne RVA (U 30)"
        data={[60, 29, 8, 3]}
        feelsafe={9.70}
      />
      <BarChart
        title="ohne RVA (30-63)"
        data={[52, 33, 12, 3]}
        feelsafe={14.24}
      />
      <BarChart
        title="ohne RVA (Ü 64)"
        data={[42, 42, 12, 4]}
        feelsafe={15.10}
      />
    </BarChart.Wrapper>

    <Paragraph>
      Weitere Auswertungen nach Nutzermerkmalen finden Sie hier:{' '}
      <Link href="https://fixmyberlin.de">Jupyter Notebook</Link>
    </Paragraph>

    <Heading as="h3">Ruhender Verkehr erzeugt zusätzliche Konfliktzone</Heading>
    <Paragraph>
      Wird die RVA linksseitig von ruhendem Verkehr geführt, so sinkt das
      Sicherheitsempfinden. Die Anforderungen und Gestaltungsmöglichkeiten an
      die RVA sind grundlegend zu unterscheiden. Bei Führung mit ruhendem
      Verkehr rechts der RVA (Parken-rechts) beeinträchtigt die potentielle
      Gefahr durch Türöffnung der parkenden Autos das Sicherheitsempfinden
      negativ. Weiter zu beachten ist, dass bauliche Trennungen zum fließenden
      KFZ-Verkehr in diesen Situationen nicht möglich sind, was den
      Gestaltungsspielraum bei der Planung verringert. In der Umfrage nicht
      bildlich dargestellt wurde die Gefahr durch ein- sowie ausparkende Autos.
      Das tatsächliche Sicherheitsempfinden in diesen Situationen könnte also
      noch geringer ausfallen.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_17}>
        <FeelSafe value={69} />
        <ImageMulti.Subtitle>
          *69,09% der Nutzer:innen bewerteten diese Situation ohne Parkstreifen
          als „sicher“ oder „eher sicher“
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_619}>
        <FeelSafe value={33} />
        <ImageMulti.Subtitle>
          *32,76 % der Nutzer:innen bewerteten diese Situation mit Parkstreifen
          als „sicher“ oder „eher sicher“
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title="HVS-F: RVA mit und ohne rechtsseitiges Parken"
      source="Anm: Durchschnitt der Bewertungen aller Situationen mit RVA - ohne Tram, Busspur, oder RVA rechts des Parkens"
    >
      <BarChart
        title="mit Parken rechts"
        data={[8, 29, 43, 19]}
        feelsafe={59.62}
      />
      <BarChart
        title="ohne Parken (inkl. bauliche Trennung)"
        data={[2, 11, 40, 47]}
        feelsafe={85.47}
      />
      <BarChart
        title="ohne Parken (exkl. bauliche Trennung)"
        data={[4, 18, 46, 32]}
        feelsafe={76.90}
      />
    </BarChart.Wrapper>

    <Heading as="h3">Drei zentrale Einflussfaktoren</Heading>

    <Paragraph>
      Für das subjektive Sicherheitsempfinden sind neben der Lage der RVA
      vornehmlich drei Faktoren relevant:
      <List>
        <List.Item>Die Breite der RVA</List.Item>
        <List.Item>Ihre farbliche Unterscheidung</List.Item>
        <List.Item>
          Vorhandensein einer baulichen Trennung zum fließenden KFZ-Verkehr
        </List.Item>
      </List>
    </Paragraph>

    <Paragraph>
      Die Breite der Trennung Links spielt vornehmlich bei Situationen mit
      Parken rechts eine Rolle. Die weiteren in der Umfrage abgefragten
      Faktoren, Tempolimit und Verkehrsstärke, spielen eine vergleichsweise
      unbedeutende Rolle. Hier ist zu berücksichtigen, das die Empfindungen der
      Faktoren Tempolimit und Verkehrsstärke über die Visualisierungen nur
      abstrahiert vermittelt werden kann.
    </Paragraph>

    <BarChart.Wrapper
      title="RVA an HVS-F: Gewicht der Einflussfaktoren im Mittel"
      source="Anm.: Unterschied der Mittelwerte der Bewertungen aller für das Merkmal relevanter Situationen. Bei Baulicher Trennung, Markierung links, Tempolimit und Verkehrsaufkommen, werden nur solche Situationen ohne Tram, Bus und RVA rechts des Parkens einbezogen. Bei der Baulichen Trennung nur solche ohne Parken rechts.
"
    >
      <BarChart title="Gesamtbreite RVA (Breit - schmal)" data={[21.51]} />
      <BarChart
        title="Bauliche Trennung zu fließendem KFZ-Verkehr (ja - nein)"
        data={[22.17]}
      />
      <BarChart title="Oberflächenfarbe (grün - asphalt)" data={[10.57]} />
      <BarChart
        title="Markierung Links (gestrichelt - Sperrfläche)"
        data={[8.12]}
      />
      <BarChart title="Tempolimit (30 - 50)" data={[3.11]} />
      <BarChart title="Verkehrsstärke (normal - hoch)" data={[2.60]} />
    </BarChart.Wrapper>

    <Heading as="h3">
      Breite der RVA zentral, besonders bei rechtsseitigem Parken
    </Heading>

    <Paragraph>
      In der Umfrage wurde unterschieden zwischen 3,5 Metern (breit) und 2,0
      Metern (schmal) Breite für die RVA inkl. aller links und rechtsseitigen
      Markierungen (s.a. Umfragedesign). Im Ergebnis aller Situationen zeigt
      sich, dass breite RVA in den allermeisten Situationen als sicher empfunden
      werden. Im Durchschnitt bewerten 82.99 % der Teilnehmer:innen “diese als
      sicher” oder “eher sicher”.
    </Paragraph>

    <Paragraph>
      Vergleichen wir beispielhaft einen Radstreifen an einer HVS ohne ruhenden
      Verkehr zeigt sich folgender Unterschied:
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_305}>
        <FeelSafe value={74} />
        <ImageMulti.Subtitle>
          *73,68 % der Nutzer:innen bewerteten diese Situation mit einer breiten RVA
          als „sicher“ oder „eher sicher“
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_17}>
        <FeelSafe value={69} />
        <ImageMulti.Subtitle>
          *69,09 % der Nutzer:innen bewerteten diese Situation mit einer schmalen RVA
          als „sicher“ oder „eher sicher“
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <Paragraph>
      Bei einem Radstreifen mit rechtsseitigem Parken ist der Unterschied zwischen schmaler und breiter Ausführung deutlich größer
      größer. 
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_980}>
        <FeelSafe value={71} />
        <ImageMulti.Subtitle>
          *70,71 % der Nutzer:innen bewerteten diese Situation mit breiter RVA neben einem Parkstreifen
          als „sicher“ oder „eher sicher“
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_620}>
        <FeelSafe value={32} />
        <ImageMulti.Subtitle>
          *32,23 % der Nutzer:innen bewerteten diese Situation mit schmaler RVA neben einem Parkstreifen
          als „sicher“ oder „eher sicher“
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title="HVS-F: RVA Gesamtbreite schmal und breit"
      source="Anm: Durchschnitt der Bewertungen aller Situationen mit RVA - ohne Tram, Busspur, oder RVA rechts des Parkens sowie Situationen mit baulicher Trennung. "
    >
      <BarChart
        title="RVA ohne Parken schmal"
        data={[5.98653, 23.522075, 47.318533, 23.172861]}
        feelsafe={70.49}
      />
      <BarChart
        title="RVA ohne Parken breit"
        data={[3.001464, 12.591508, 44.558321, 39.848707]}
        feelsafe={84.41}
      />
      <BarChart
        title="RVA mit Parken schmal"
        data={[19.22069, 39.432608, 31.377464, 9.969238]}
        feelsafe={41.35}
      />
      <BarChart
        title="RVA mit Parken breit"
        data={[4.514474, 20.134713, 48.199824, 27.15099]}
        feelsafe={75.35}
      />
    </BarChart.Wrapper>

    <Heading as="h3">Grüne Oberfläche hilft</Heading>

    <Paragraph>
      Wird die RVA durch eine grüne Oberfläche von der Kfz-Fahrbahn
      unterschieden, hat dies einen positiven Effekt auf das subjektive
      Sicherheitsempfinden. Je nach Situation ist dieser Effekt unterschiedlich
      stark. Umso schlechter die RVA ausgebaut ist, desto stärker ist der Effekt
      der Grüneinfärbung.
    </Paragraph>

     <ImageMulti>
      <ImageMulti.Inner source={MS_C_21}>
        <FeelSafe value={80} />
        <ImageMulti.Subtitle>
          *80,37 % der Nutzer:innen bewerteten diese breite RVA mit Grüneinfärbung
          als „sicher“ oder „eher sicher“
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_17}>
        <FeelSafe value={69} />
        <ImageMulti.Subtitle>
          *69,09 % der Nutzer:innen bewerteten diese schmale RVA ohne Grüneinfärbung
          als „sicher“ oder „eher sicher“
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>
    
     <ImageMulti>
      <ImageMulti.Inner source={MS_C_1220}>
        <FeelSafe value={78} />
        <ImageMulti.Subtitle>
          *77,87 % der Nutzer:innen bewerteten diese breite RVA mit Grüneinfärbung
          als „sicher“ oder „eher sicher“
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_980}>
        <FeelSafe value={71} />
        <ImageMulti.Subtitle>
          *70,71 % der Nutzer:innen bewerteten diese breite RVA ohne Grüneinfärbung
          als „sicher“ oder „eher sicher“
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>
    
    <BarChart.Wrapper
      title="HVS-F: RVA mit oder ohne Grüneinfärbung"
      source="Durchschnitt der Bewertungen aller Situationen mit RVA - ohne Tram, Busspur, oder RVA rechts des Parkens, sowie Situationen mit baulicher Trennung."
    >
      <BarChart
        title="ohne Parken breit asphalt"
        data={[2, 10, 37, 51]}
        feelsafe={87.55}
      />
      <BarChart
        title="ohne Parken breit grün"
        data={[2, 5, 31, 62]}
        feelsafe={93.5}
      />
      <BarChart
        title="ohne Parken schmal asphalt"
        data={[4, 19, 41, 36]}
        feelsafe={76.2}
      />
      <BarChart
        title="ohne Parken schmal grün"
        data={[2, 14, 43, 41]}
        feelsafe={83.07}
      />
      <BarChart
        title="Parken-rechts breit asphalt"
        data={[5, 23, 49, 22]}
        feelsafe={70.17}
      />
      <BarChart
        title="Parken-rechts breit grün"
        data={[3, 16, 47, 34]}
        feelsafe={80.42}
      />
      <BarChart
        title="Parken-rechts schmal asphalt"
        data={[23, 42, 28, 7]}
        feelsafe={34.19}
      />
      <BarChart
        title="Parken-rechts schmal grün"
        data={[13, 36, 37, 13]}
        feelsafe={49.82}
      />
    </BarChart.Wrapper>

    <Paragraph>
      In der Umfrage wurde eine weitere Variante – ein lediglich schraffierter
      grüner Strich linksseitig – getestet. Diese Variante brachte keine
      Verbesserung gegenüber einer normalen Asphaltoberfläche.
    </Paragraph>

    <BarChart.Wrapper
      title="HVS-F: RVA mit verschiedenen Arten der Grüneinfärbung"
      source="Anm: Durchschnitt der Bewertungen aller Situationen mit RVA - ohne Tram, Busspur, oder RVA rechts des Parkens."
    >
      <BarChart
        title="RVA asphalt"
        data={[8.542686, 22.612828, 38.589373, 30.255113]}
        feelsafe={68.84}
      />
      <BarChart
        title="RVA farbig"
        data={[4.890647, 17.087043, 39.353226, 38.669085]}
        feelsafe={78.02}
      />
      <BarChart
        title="RVA farbig schraffur"
        data={[8.903186, 23.970115, 39.140811, 27.985888]}
        feelsafe={67.13}
      />
    </BarChart.Wrapper>

    <Heading as="h3">
      Poller stärken Sicherheitsempfinden, Blumenkästen auch
    </Heading>

    <Paragraph>
      Eine bauliche Trennung zwischen RVA und fließendem Kfz-Verkehr stärkt das Sicherheitsempfinden. Dabei ist die Art der Trennung nicht entscheidend. Schaut man ins Detail, findet man, dass bei schmalen RVA kleine Poller (sog. Leitboys) am beliebtesten sind, bei breiten RVA erhalten Blumenkästen die meisten sicheren Bewertungen. Auffällig ist, dass eine grüne Oberfläche nur noch minimale Verbesserung erzielt, wenn es bereits eine breite RVA mit baulicher Trennung gibt.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_75}>
        <FeelSafe value={90.65} />
        <ImageMulti.Subtitle>
          Mit 90,65 % am sichersten bewertete bauliche Trennung bei schmaler RVA ohne
          Grüneinfärbung. Die Variante mit Grüneinfärbung kommt auf 97,52%
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_377}>
        <FeelSafe value={97.52} />
        <ImageMulti.Subtitle>
          Mit 98,38 % am sichersten bewertete bauliche Trennung bei breiter RVA ohne
          Grüneinfärbung. Die Variante mit Grüneinfärbung kommt auf 99,11 %
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    {/* TODO: Add missing data */}
    <BarChart.Wrapper
      title="HVS-F: RVA mit und ohne bauliche Trennung"
      source="Anm: Durchschnitt der Bewertungen aller Situationen mit RVA, - ohne rechtsseitiges Parken, Tram, Busspur, oder RVA rechts des Parkens."
    >
      <BarChart
        title="ohne baul. Trennung, Markierung links schmal"
        data={[4.376283, 19.109343, 45.995893, 30.51848]}
        feelsafe={75.64}
      />
      <BarChart
        title="ohne baul. Trennung, Markierung links breit"
        data={[3.933106, 16.646020, 46.097863, 33.32301]}
        feelsafe={78.91}
      />
      <BarChart
        title="mit baul. Trennung Sperrpfosten-hoch"
        data={[1.895462, 7.352096, 25.272832, 65.479609]}
        feelsafe={90.75}
      />
      <BarChart
        title="mit baul. Trennung Sperrpfosten-niedrig"
        data={[1.396078, 7.32549, 33.662745, 57.615686]}
        feelsafe={91.28}
      />
      <BarChart
        title="mit baul. Trennung Blumenkasten"
        data={[1.466594, 7.224335, 25.31233, 65.996741]}
        feelsafe={91.31}
      />
    </BarChart.Wrapper>

    <Heading as="h3">Lieber rechts als links vom ruhenden Verkehr</Heading>

    <Paragraph>
      Wird der Radverkehr gemeinsam mit ruhendem Kfz-Verkehr geführt, so wird die Führung rechts des ruhenden Verkehrs als deutlich sicherer empfunden.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_597}>
        <FeelSafe value={91.3} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_980}>
        <FeelSafe value={70.71} />
      </ImageMulti.Inner>
    </ImageMulti>

    <Paragraph>
      Diese Führungsform kann durch bauliche Trennung oder Grüneinfärbung
      zusätzlich subjektiv sicherer gemacht werden, der Effekt ist aber relativ
      gering.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_611}>
        <FeelSafe value={94.32} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_596}>
        <FeelSafe value={95.45} />
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title="HVS-F: RVA Führung rechts und links vom Parken"
      source="Anm.: Durchschnitt der Bewertungen aller Situationen mit RVA breit, – ohne Tram, Busspur. Es werden nur Varianten mit breiter RVA verglichen, schmale RVA rechts des Parkens wurden in der Umfrage nicht dargestellt."
    >
      <BarChart
        title="RVA breit, links des Parken"
        data={[3.812933, 19.951131, 48.818048, 27.417888]}
        feelsafe={74.54}
      />
      <BarChart
        title="RVA breit, rechts des Parken (exkl. baul. Trennungen)"
        data={[1.431025, 3.978248, 21.665713, 72.925014]}
        feelsafe={91.69}
      />
      <BarChart
        title="RVA breit, rechts des Parken (inkl. baul. Trennungen)"
        data={[1.060071, 7.022968, 34.584806, 57.332155]}
        feelsafe={94.22}
      />
    </BarChart.Wrapper>

    <Heading as="h3">Wie sehen das Autofahrende?</Heading>

    <Paragraph>
      In der Umfrage wurde auch die Perspektive der Autofahrenden abgefragt, wobei die Frage hier nicht ausschließlich auf das eigene Sicherheitsempfinden abzielte sondern auf das aller Verkehrsteilnehmer:innen: “Wie empfinden Sie diese Situation beim Autofahren?” Von der Tendenz werden Situationen von Autofahrenden ähnlich wie von den Radfahrenden beurteilt. Im Durchschnitt werden dabei die Situationen als weniger unsicher eingeschätzt, das Konfliktpotential Radfahrender mit dem ruhenden Verkehr wird deutlich weniger stark wahrgenommen, bzw. als unsicher beurteilt.
    </Paragraph>

    <Heading as="h3">Auch Autofahrer wollen separate RVA</Heading>

    <Paragraph>
      Mischverkehr an Hauptstraßen wird im Vergleich zu vorhandener RVA
      ebenfalls als deutlich unsicherer bewertet, wenn auch nicht ganz so
      extrem, wie durch die Radfahrenden.
    </Paragraph>

    {/* Fehlende Daten */}
 <BarChart.Wrapper
      title="HVS-F: mit und ohne RVA"
      source="Anm: Durchschnitt der Bewertungen aller Situationen aus Perspektive der Autofahrenden oder der Radfahrenden"
    >
      <BarChart
        title="Radperspektive: ohne RVA"
        data={[52, 33, 12, 3]}
        feelsafe={14.24}
      />
      <BarChart
        title="Radperspektive: mit RVA"
        data={[3, 18, 49, 30]}
        feelsafe={75.52}
      />
      <BarChart
        title="Autoperspektive: ohne RVA"
        data={[31.877551, 42.095238, 16.938776, 9.088435]}
        feelsafe={25.41}
        feelsafeIcon="car"
      />
    <BarChart
        title="Autoperspektive: mit RVA"
        data={[1.773559, 12.917629, 47.055517, 38.253294]}
        feelsafe={82.99}
        feelsafeIcon="car"
      />
    </BarChart.Wrapper>
    
    <Paragraph>
      Autofahrer empfinden die Situation als deutlich sicherer, wenn eine klar
      getrennte RVA vorhanden ist. am besten mit Sperrfläche oder Doppellinie
      und Grüneinfärbung. Interessant ist, das der Faktor Parken hier keine
      große Rolle spielt, diese Gefahr für Radfahrende wird von den
      Autofahrer:innen scheinbar kaum wahrgenommen.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_A_1285}>
        <FeelSafe value={94.68} icon="car" />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_A_586}>
        <FeelSafe value={28.21} icon="car" />
      </ImageMulti.Inner>
    </ImageMulti>
    
    <Heading as="h3">Poller auch aus Autoperspektive sicherer</Heading>

    <Paragraph>
      Die bauliche Trennung der RVA durch Poller oder ähnliches erhöht auch aus
      Sicht der Autofahrenden die Sicherheit, wenn der Effekt hier auch deutlich
      weniger stark ist. Dabei favorisieren Autofahrer:innen Blumenkästen oder
      niedrige Poller. Wie man an dem Beispiel oben sehen kann werden aber auch
      breite RVA mit klarer Trennung und Grünmarkierung ähnlich sicher
      empfunden.
    </Paragraph>
    
 <BarChart.Wrapper
      title="HVS-F: RVA mit und ohne bauliche Trennung"
      source="Durchschnitt der Bewertungen aller Situationen mit RVA, - ohne rechtsseitiges Parken, Tram, Busspur, oder RVA rechts des Parkens."
    >
      <BarChart
        title="Radperspektive: RVA ohne baul. Trennung"
        data={[4.057880, 17.882982, 46.429695, 31.629443]}
        feelsafe={76.90}
      />
      <BarChart
        title="Radperspektive: RVA mit baul. Trennung"
        data={[1.366559, 6.879689, 30.908360, 60.845391]}
        feelsafe={91.20}
      />
      <BarChart
        title="Autoperspektive: RVA ohne baul. Trennung"
        data={[2.398382, 13.937584, 44.731266, 38.932768]}
        feelsafe={82.76}
        feelsafeIcon="car"
      />
      <BarChart
        title="Autoperspektive: RVA mit baul. Trennung"
        data={[2.326551, 10.173449, 34.247832, 53.252168]}
        feelsafe={86.76}
        feelsafeIcon="car"
      />
      <BarChart
        title="Autoperspektive: Trennung Sperrpfosten-hoch"
        data={[3.789474, 11.508772, 30.105263, 54.596491]}
        feelsafe={84.70}
        feelsafeIcon="car"
      />
      <BarChart
        title="Autoperspektive: Trennung Sperrpfosten-niedrig"
        data={[2.107482, 10.410959, 35.911486, 51.570074]}
        feelsafe={87.48}
        feelsafeIcon="car"
      />
      <BarChart
        title="Autoperspektive: Trennung Blumenkasten"
        data={[2.715547, 9.164969, 29.192125, 58.927359]}
        feelsafe={88.12}
        feelsafeIcon="car"
      />
    </BarChart.Wrapper> 
    <Paragraph>
    Bei hohem Verkehrsaufkommen und Tempolimit 50 km/h empfinden Autofahrer eine bauliche Trennung zum Radverkehr als sicherer. Dies gilt auch für die meisten Situationen mit T30 und normalem Verkehrsaufkommen. Autofahrende haben also ein klare Wahrnehmung für die Gefahr von Unfällen mit Radfahrenden und empfinden die Situation als angenehmer, wenn dieser Konflikt baulich entschärft ist.
    </Paragraph>
    
     <ImageMulti>
      <ImageMulti.Inner source={MS_A_67}>
        <FeelSafe value={87.77} />
        <ImageMulti.Subtitle>
          Bestbewertete Situation aus Autoperspektive bei schmaler RVA, T50 und hohem Verkehrsaufkommen
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_A_343}>
        <FeelSafe value={88.66} />
        <ImageMulti.Subtitle>
          Bestbewertete Situation aus Autoperspektive bei breiter RVA, T50 und hohem Verkehrsaufkommen
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>
    
    <Heading as="h3">Führung im Seitenraum</Heading>

    <Heading as="h3">RVA auf der Fahrbahn oder im Seitenraum?</Heading>

    <Paragraph>
      Eine Führung im Seitenraum wird im Durchschnitt als sicherer empfunden als
      eine auf der Fahrbahn. Abhängig von der Ausgestaltung der RVA,
      insbesondere in Bezug auf die jeweiligen Konfliktzonen (fließender
      Kfz-Verkehr, ruhender Verkehr, Fußverkehr) variieren die Bewertungen
      allerdings. Führungen im Seitenraum stellen insgesamt weniger hohe
      Anforderungen an die Gestaltung der RVA um ein hohes Sicherheitsempfinden
      bei Radfahrenden zu schaffen. Auf Straßen mit ruhendem Verkehr hat die
      Führung im Seitenraum oder auf der Fahrbahn rechtsseitig des ruhenden
      Verkehrs eine deutliche höhere Bewertung als eine solche links des
      ruhenden Verkehrs.
    </Paragraph>

    <BarChart.Wrapper title="HVS mit RVA: Führungen im Seitenraum (HVS-S) und auf der Fahrbahn (HVS-F)">
      <BarChart
        title="Fahrbahn, RVA ohne Parken schmal"
        data={[5.98653, 23.522075, 47.318533, 23.172861]}
        feelsafe={70.49}
      />
      <BarChart
        title="Fahrbahn, RVA ohne Parken breit"
        data={[3.001464, 12.591508, 44.558321, 39.848707]}
        feelsafe={84.41}
      />
      <BarChart
        title="Fahrbahn, RVA mit Parken schmal"
        data={[19.22069, 39.432608, 31.377464, 9.969238]}
        feelsafe={41.35}
      />
      <BarChart
        title="Fahrbahn, RVA mit Parken breit"
        data={[4.514474, 20.134713, 48.199824, 27.15099]}
        feelsafe={75.35}
      />
      <BarChart
        title="Seitenraum, RVA breit"
        data={[0.677428, 3.889918, 29.751257, 65.681397]}
        feelsafe={94.61}
      />
      <BarChart
        title="Seitenraum, RVA schmal"
        data={[3.729178, 23.567974, 43.981730, 28.721118]}
        feelsafe={69.1}
      />
      <BarChart
        title="Fahrbahn, RVA rechts des Parken"
        data={[1.055662,  5.143954, 26.813820, 66.986564]}
        feelsafe={92.40}
      />
    </BarChart.Wrapper>

    <Paragraph>
      Ohne Parkspur sind sicher gestaltete RVA sowohl im Seitenraum als auch auf
      der Fahrbahn möglich.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_325}>
        <FeelSafe value={87.93} />
        <ImageMulti.Subtitle>
          Eine auf der Fahrbahn geführte, klar gestaltete, breite RVA ohne
          rechtsseitiges Parken, wie hier im Bild wird als sehr sicher empfunden
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_C_1100}>
        <FeelSafe value={97.62} />
        <ImageMulti.Subtitle>
          Eine gleich breite RVA im Seitenraum wird sogar noch etwas sicherer
          bewertet.
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <Paragraph>
      Eine schmale RVA im Seitenraum mit linksseitigem Parken wird als
      wesentlich sicherer empfunden als eine schmale auf der Fahrbahn geführte
      mit rechtsseitigem Parken, selbst bei “optimaler” Gestaltung dieser. Hier
      bietet die Führung im Seitenraum also klare Vorteile.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_860}>
        <FeelSafe value={47.55} />
        <ImageMulti.Subtitle>
          Die bestbewertete RVA in schmaler Ausführung mit rechtsseitigem Parken
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_C_463}>
        <FeelSafe value={78.95} />
        <ImageMulti.Subtitle>
          Eine RVA im Seitenraum (mit linksseitigem Parken) in schmaler Ausführung mit Trennungen links und rechts durch
          Grünstreifen.
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <Heading as="h3">Breite der RVA auch im Seitenraum ausschlaggebend</Heading>

    <Paragraph>
      Innerhalb der Varianten im Seitenraum spielt die RVA-Breite aus Sicht der
      Radfahrenden die eindeutig größte Rolle. Der Faktor Fußgängeraufkommen
      (mit / ohne Auslage) spielt eine Rolle bei schmalen Gehwegen. Einen
      kleineren Einfluss haben die Gehweggesamtbreite und die Art der Trennung.
      Der Faktor Verkehrsart links der RVA (Ruhender / Fließender Verkehr) hat
      nur einen sehr geringen Einfluss.
    </Paragraph>

    <BarChart.Wrapper
      title="RVA im Seitenraum: Gewicht der Einflussfaktoren im Mittel"
      source="Anm: Unterschied der Mittelwerte der Bewertungen im Vergleich zweier Merkmalsausprägungen Es werden nur die für das Merkmal relevanten Situationen verglichen."
    >
      <BarChart title="Gesamtbreite RVA (breit - schmal)" data={[24.09]} />
      <BarChart title="Gesamtbreite Gehweg (breit - schmal)" data={[1.33]} />
      <BarChart title="Auslage (vorhanden - keine)" data={[4.1]} />
      <BarChart
        title="Auslage (vorhanden - keine) nur schmaler Gehweg"
        data={[11.41]} />
      <BarChart
        title="Trennung rechts (Grünstreifen - keine Trennung)"
        data={[6.23]} />
      <BarChart
        title="Faktor Verkehrsart links (Links RVA Fahrstreifen vs. Parken)"
        data={[1.1]} />
    </BarChart.Wrapper>

    <Heading as="h3">Schmale RVA sind sicher – breite sehr sicher</Heading>

    <Paragraph>
      Breite RVA im Seitenraum erfahren eine sehr große Akzeptanz was das
      Sicherheitsgefühl betrifft. Aber auch schmale RVA erhalten noch relativ
      hohe Bewertungen. Es wurde in der Umfrage nicht nach geeigneten
      Ausbaustandards gefragt und kein hohes Radverkehrsaufkommen dargestellt.
      Es ist im Seitenraum aber – im Gegensatz z.B. zu schmalen RVA auf der
      Fahrbahn – einer sehr großen Gruppe von Menschen grundsätzlich ein
      entspanntes Radfahren möglich.{' '}
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={CP_C_553}>
        <FeelSafe value={76.52} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_C_1093}>
        <FeelSafe value={97.47} />
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title="HVS-S: RVA breit und schmal"
      source="Anm.: Durchschnitt der Bewertungen aller Situationen im Seitenraum"
    >
      <BarChart title="RVA breit" data={[0.677428, 3.889918, 29.751257, 65.681397]} feelsafe={94.61} />
      <BarChart title="RVA schmal" data={[3.729178, 23.567974, 43.981730, 28.721118]} feelsafe={69.1} />
    </BarChart.Wrapper>

    <Paragraph>
      Auch wenn die Situation linksseitig der RVA im Durchschnitt keinen großen
      Einfluss hat sind dennoch in bestimmten Situationen starke Einschränkungen
      der subjektiven Sicherheit vorhanden, wie das untenstehende Beispiel
      zeigt.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={CP_C_516}>
        <FeelSafe value={56.13} />
        <ImageMulti.Subtitle>
          Ist fließender Verkehr linksseitig der RVA geführt, ist eine physische
          Trennung rechts problematisch.
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_C_509}>
        <FeelSafe value={77.42} />
      </ImageMulti.Inner>
    </ImageMulti>

    <Heading as="h3">Geschäftsnutzung relevant bei engen Gehwegen</Heading>

    <Paragraph>
      Der Einfluss durch hohes Fußgänger:innenaufkommen, bzw. Geschäftsnutzung
      wurde in der Umfrage durch die Darstellung von Cafétischen dargestellt.
      Dieser Faktor wird relevant wenn die Gehweg-Gesamtbreite schmal ist.
    </Paragraph>

    <BarChart.Wrapper
      title="HVS-S: Mit und ohne Auslage"
      source="Anm.: Durchschnitt der Bewertungen aller Situationen im Seitenraum"
    >
      <BarChart
        title="Breiter Gehweg Auslage ja"
        data={[2.043688, 11.751203, 39.159571, 47.045539]}
        feelsafe={84.24}
      />
      <BarChart
        title="Breiter Gehweg Auslage nein"
        data={[2.039444, 11.687584, 37.483191, 48.789780]}
        feelsafe={84.16}
      />
      <BarChart
        title="Schmaler Gehweg Auslage ja"
        data={[3.390943, 18.938234, 40.016772, 37.654051]}
        feelsafe={74.96}
      />
      <BarChart
        title="Schmaler Gehweg Auslage nein"
        data={[1.710024, 9.920563, 35.795282, 52.574131]}
        feelsafe={86.4}
      />
    </BarChart.Wrapper>

    <Paragraph>
      Hier zeigen sich im Detail große Unterschiede: Ist die RVA gut getrennt
      und ausreichend breit, wird sie von Radfahrenden auch bei schmalem Gehweg
      als sicher empfunden. Ist sie dies nicht, so sinkt der Wert stark ab:
      zumindest eine gut erkennbare Trennung zwischen Rad und Fußverkehr sollte
      vorhanden sein.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={CP_C_725}>
        <FeelSafe value={69.16} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_C_823}>
        <FeelSafe value={98.18} />
      </ImageMulti.Inner>
    </ImageMulti>

    <ImageMulti>
      <ImageMulti.Inner source={CP_C_49}>
        <FeelSafe value={49.56} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_C_58}>
        <FeelSafe value={67.88} />
      </ImageMulti.Inner>
    </ImageMulti>

    <Heading as="h3">
      Fußgänger:innen ist eine eindeutige Trennung vom Radverkehr wichtig.
    </Heading>

    <Paragraph>
      Die meisten zu Fuß Gehenden fühlen sich grundsätzlich sicher mit einer
      Führung des Radverkehrs im Seitenraum. Wichtig ist ihnen eine eindeutige
      Trennung und ausreichend verbleibender Platz für den Fußverkehr.
    </Paragraph>

    <BarChart.Wrapper
      title="Diagramm Gewicht"
      source="Anm.: Unterschied der Mittelwerte der Bewertungen aller für das Merkmal relevanter Situationen. Die Fußperspektive wurde nur bei schmaler Gehweg-Gesamtbreite abgefragt."
    >
      <BarChart title="Breite RVA schmal vs. breit" data={[5.76]} />
      <BarChart title="Trennung rechts (grün - keine)" data={[32.13]} />
      <BarChart title="Auslage (ja - nein)" data={[25.39]} />
    </BarChart.Wrapper>

    <Heading as="h3">
      Hohes Fußverkehrsaufkommen erfordert passende Gestaltung
    </Heading>

    <Paragraph>
      Hat die Straße eine überwiegend geschäftliche Nutzung und damit
      verbundenes hohes Fußverkehrsaufkommen, so werden nur bestimmte
      Gestaltungen der RVA von den zu Fuß Gehenden als sicher empfunden. Im
      Vergleich zur Radperspektive zeigt sich ein deutlich unterschiedliches
      Empfinden der Situationen mit Auslage.
    </Paragraph>

    <BarChart.Wrapper
      title="HVS-S Fuß- und Radperspektive: Mit und ohne Auslage"
      source="Anm.: Durchschnitt der Bewertungen aller Situationen im Seitenraum. Die Auswertung vergleicht nur die Fälle mit schmaler Gehweggesamtbreite, da die Fußperspektive wurde nur in dieser Variante abgefragt wurde."
    >
      <BarChart
        title="Fußperspektive Auslage ja"
        data={[6.599897, 36.123951, 38.004337, 19.271814]}
        feelsafe={53.24}
        feelsafeIcon="walk"
      />
       <BarChart
        title="Fußperspektive Auslage nein"
        data={[1.740895, 12.454977, 42.070208, 43.733920]}
        feelsafe={83.36}
        feelsafeIcon="walk"
      />
      <BarChart
        title="Radperspektive Auslage ja"
        data={[3.390943, 18.938234, 40.016772, 37.654051]}
        feelsafe={74.95}
      />
      <BarChart
        title="Radperspektive Auslage nein"
        data={[1.710024, 9.920563, 35.795282, 52.574131]}
        feelsafe={86.4}
      />
     
    </BarChart.Wrapper>

    <Paragraph>
      Eine Variante, mit der Radfahrende und Fußgänger:innen unter engen
      Platzverhältnissen relativ gut leben können, ist die Trennung durch einen
      Grünstreifen. In der realen Situation spielen Faktoren wie Überholvorgänge
      von Radfahrenden, frei laufende Hunde, Kinder etc. eine zusätzlich
      mindernde Rolle auf das Sicherheitsempfinden. Eine gemeinsame Führung von
      Radverkehr und Fußverkehr bei hohem Fußgängeraufkommen ist daher nur bei
      ausreichend breitem Gehweg zu empfehlen.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={CP_P_194}>
        <FeelSafe value={81.44} icon="walk" />
      <ImageMulti.Subtitle>
          Trotz relativ enger Platzverhältnisse, wird diese Situation noch 81,44 % der zu Fuß Gehenden als “eher sicher” oder “sicher” empfunden.
        </ImageMulti.Subtitle>
        </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_C_194}>
        <FeelSafe value={75.56} />
        <ImageMulti.Subtitle>
          Die gleiche Situation wird von 75,56 % der Radfahrenden als “eher sicher” oder “sicher” bewertet.
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>      
    </ImageMulti>

    <Paragraph>
      Eine eindeutige Trennung der RVA kann das subjektive Sicherheitsempfinden
      der zu Fuß Gehenden deutlich verbessern.
    </Paragraph>

    <BarChart.Wrapper
      title="HVS-S Fußperspektive: Mit und ohne Trennung"
      source="Anm.: Durchschnitt der Bewertungen aller Situationen im Seitenraum. Die Fußperspektive wurde nur bei schmaler Gehweggesamtbreite abgefragt."
    >
      <BarChart
        title="Trennung rechts grünstreifen schmal"
        data={[2.907560, 16.603599, 39.771411, 40.717430]}
        feelsafe={78.18}
       feelsafeIcon="walk"
      />
      <BarChart
        title="Trennung rechts grünstreifen breit"
        data={[1.970729, 10.933870, 35.689949, 51.405451]}
        feelsafe={85.49}
        feelsafeIcon="walk"
      />
      <BarChart
        title="Trennung rechts keine"
        data={[8.617505, 35.028605, 35.731339, 20.622551]}
        feelsafe={56.35}
        feelsafeIcon="walk"
      />
    </BarChart.Wrapper>

    <Paragraph>
      Sind keine Auslagen vorhanden und ist der Radweg klar erkennbar vom Fußweg
      getrennt fühlen sich Fußgänger:innen mit den meisten Varianten der
      Radverkehrsführung sicher.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={CP_P_149}>
        <FeelSafe value={90.52} icon="walk" />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_P_778}>
        <FeelSafe value={93.47} icon="walk" />
      </ImageMulti.Inner>
    </ImageMulti>

    <Heading as="h3">Führung in Nebenverkehrsstraßen</Heading>

    <Paragraph>
      Der Vergleich einer Radverkehrsführung in Nebenverkehrsstraßen gegenüber der Führung an Hauptverkehrsstraßen ist nur bedingt aussagekräftig, da in der Umfrage nur statische Bilder gezeigt wurden, die den potenziellen Konflikt zwischen Kfz und Fahrrad zeigen. Das unterschiedliche Verkehrsaufkommen zwischen Haupt- und Nebenstraße konnte nur andeutungsweise abgebildet werden. Dennoch lassen die Ergebnisse Aussagen zum subjektiven Sicherheitsempfinden bei unterschiedlichen Gestaltungsformen von Nebenstraßen zu. 
    </Paragraph>
    <Heading as="h3">Nebenstraßen am liebsten “autofrei”</Heading>

    <Paragraph>
     Auffällig ist, dass der Faktor “autofrei” (fließender Verkehr ja - nein) bei der Bewertung von Nebenstraßen die größte Rolle spielt. Außerdem haben Einbahnstraßen mit Gegenverkehr eine sehr negative Wirkung auf das Sicherheitsempfinden. Breitere Straßen werden als sicherer empfunden, ruhender Verkehr verschlechtert das Sicherheitsempfinden.
    </Paragraph>

    <BarChart.Wrapper
      title="NVS: Gewicht der Einflussfaktoren im Mittel"
      source="Anm: Unterschied der Mittelwerte der Bewertungen im Vergleich zweier Merkmalsausprägungen. Grundlage sind alle für das Merkmal relevante Situationen. Ausgenommen sind die Situationen mit durchgehender Grüneinfärbung des Asphalts. Unter Markierung werden Fahrradstraße, Fahrradstraße-Sondermarkierung und Spielstraße zusammengefasst."
    >
      <BarChart title="Straßenbreite (schmal vs. breit)" data={[30.5]} />
      <BarChart title="Parken (beidseitig – nein)" data={[19.4]} />
      <BarChart title="Parken (einseitig – nein)" data={[18.07]} />
      <BarChart title="Markierung (vorhanden – keine)" data={[26.14]} />
      <BarChart
        title="Gegenläufige Einbahnstraße (gegenläufig vs. beidseitig)"
        data={[60.52]}
      />
      <BarChart
        title="Einbahnstraße in Fahrtrichtung (einbahn vs. beidseitig)"
        data={[1.13]}
      />
      <BarChart title="“autofrei” (ja/nein)" data={[76.66]} />
    </BarChart.Wrapper>

    <Paragraph>
      Wenn wir alle Situationen ohne Sondermarkierungen und mit Kfz-Verkehr
      betrachten, so zeigt sich ein eher schlechtes durchschnittliches
      Sicherheitsempfinden. Die beste Variante erhält lediglich 33,40% sichere
      oder eher sichere Bewertungen.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={SE_C_11}>
        <FeelSafe value={33.4} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={SE_C_71}>
        <FeelSafe value={21.43} />
      </ImageMulti.Inner>
    </ImageMulti>

    <Heading as="h3">
      Fahrradstraßen sind besser, aber nicht ausreichend
    </Heading>

    <Paragraph>
      Die Markierung von Fahrradstraßen verbessert das Sicherheitsempfinden,
      aber es werden keine besonders hohen Werte erreicht. Es wird maximal ein
      Wert von 45,03% sicherer oder eher sicherer Bewertungen erreicht. Bei
      Straßen ohne Parken und geführten Einbahnstraßen in Fahrtrichtung erhöht
      sich dieser Wert auf maximal 56,72%
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={SE_C_2}>
        <FeelSafe value={51.02} />
        <ImageMulti.Subtitle>
          Die bestbewertete Fahrradstraße mit KFZ-Verkehr als Einbahnstraße
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={SE_C_12}>
        <FeelSafe value={56.72} />
        <ImageMulti.Subtitle>
          Und hier mit beidseitigem Verkehr
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title="NVS: Markierungsarten"
      source="Anm: Durchschnitt der Bewertungen aller Situationen in Nebenverkehrsstraßen. Ausgenommen sind die Situationen mit durchgehender Grüneinfärbung des Asphalts."
    >
      <BarChart
        title="ohne Markierung"
        data={[35.902256, 36.172462, 20.911654, 7.013628]}
        feelsafe={27.93}
      />
      <BarChart
        title="Fahrradstraße"
        data={[17.051071, 34.478701, 33.478466, 14.991763]}
        feelsafe={48.47}
      />
      <BarChart
        title="Fahrradstraße - Sondermarkierung"
        data={[30.787364, 36.338991, 22.477605, 10.39604]}
        feelsafe={32.87}
      />
      <BarChart
        title="Spielstraße"
        data={[17.137386, 34.837243, 34.633796, 13.391575]}
        feelsafe={48.03}
      />
    </BarChart.Wrapper>

    <Paragraph>
      Auffällig ist, dass Fahrradstraßen mit Sondermarkierungen (der Dooring Zone) schlechter abschneiden als solche mit einer großen Fahrradstraßen-Markierung auf der Fahrbahn. Dieser Vergleich ist durch die Darstellung in der Umfrage allerdings wenig aussagekräftig, da durch die Komposition der Bilder mehrere Faktoren (Kennzeichnung als Fahrradstraße, Optische Breite der zur Verfügung stehenden Fahrbahn, Position der Radfahrenden) die Bewertung beeinflussen können. 
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={SE_C_42}>
        <FeelSafe value={45.03} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={SE_C_44}>
        <FeelSafe value={21.74} />
      </ImageMulti.Inner>
    </ImageMulti>

    <Heading as="h3">Die Holländische Lösung</Heading>

    <Paragraph>
      Wirklich gute Werte erhalten in den NVS lediglich die Varianten, bei denen
      kein fließender Kfz-Verkehr dargestellt wurde. Darunter sind auch
      Varianten mit parkenden Autos. (Dies würde z.B. der Situatione in einer Straße mit
      Durchfahrtssperren entsprechen, wo nur Anlieger
      einfahren können.) Die besten Bewertungen erhält die “holländische Lösung”
      mit aufgepflastertem Mittelstreifen und durchgehendem grünen Asphalt. Bei
      der Führung in Nebenstraßen scheint die optisch deutliche Signalisierung
      der Fahrradstraße eine hohe Bedeutung zu haben.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={SE_C_10}>
        <FeelSafe value={98.33} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={SE_C_50}>
        <FeelSafe value={92.42} />
      </ImageMulti.Inner>
    </ImageMulti>

    <Paragraph>
      Bei den Varianten mit ruhendem Verkehr zeigen sich deutliche Unterschiede
      in der Markierungsart.
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={SE_C_47}>
        <FeelSafe value={74.54} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={SE_C_49}>
        <FeelSafe value={54.83} />
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title="NVS “autofrei”: Markierungsarten"
      source="Anm: Durchschnitt der Bewertungen aller Situationen in Nebenverkehrsstraßen. Nur solche die ohne fließenden Kfz-Verkehrs dargestellt wurden"
    >
      <BarChart
        title="Ohne Markierung"
        data={[15.428571, 33.142857, 33.0, 18.428571]}
        feelsafe={51.42}
      />
      <BarChart
        title="Holländische Markierung"
        data={[2.039405, 6.394746, 22.571725, 68.994124]}
        feelsafe={91.56}
      />
      <BarChart
        title="Fahrradstraße"
        data={[2.811245, 14.993307, 40.763052, 41.432396]}
        feelsafe={82.19}
      />
      <BarChart
        title="Fahrradstraße - Sondermarkierung"
        data={[9.591983, 20.042949, 33.786686, 36.578382]}
        feelsafe={70.35}
      />
      <BarChart
        title="Spielstraße"
        data={[4.538799, 18.081991, 43.045388, 34.333821]}
        feelsafe={77.37}
      />
    </BarChart.Wrapper>
    
    <Heading as="h2" toc={toc}>
      Zusammenfassung
    </Heading>
    <Paragraph>
      
    Die Umfrage zeigt, dass die Einflüsse unterschiedlicher Faktoren in ihren Wechselbeziehungen keine linearen Aussagen über die subjektive Sicherheit von Radinfrastruktur zulassen. Dennoch können einige zentrale Aussagen und Empfehlungen abgeleitet werden, wie eine “Radinfrastruktur für Alle” aussehen sollte. Dabei ist zu beachten, dass in der Umfrage nur die unterschiedlichen Führungsformen auf der Strecke untersucht wurden, die Gestaltung von Knotenpunkten und bzw. Implikationen auf diese, die sich aus der Wahl der Führung ergeben kann hier nicht beurteilt werden.
<List>
        <List.Item>Auf Hauptstraßen aber auch auf Nebenstraßen wird die Führung im Mischverkehr als sehr unsicher empfunden.</List.Item>
        <List.Item>Für einen subjektiv sicheren Radverkehr sollte die Führung an Hauptstraßen der Regelfall sein, das Berliner Mobilitätsgesetz geht hier den richtigen Weg.</List.Item>
        <List.Item>
          Die Führung in Nebenstraßen, kann bei weitgehender Autofreiheit und deutlicher Markierung eine Alternative / Ergänzung sein. Das reine Markieren von Fahrradstraßen ohne Einschränkungen des KFZ-Verkehrs erhöht nur in geringem Maß die subjektive Sicherheit und wird auch von Autofahrenden als unsicher empfunden.
        </List.Item>
        <List.Item>Wenn es ausreichend breite Gehwege und keine geschäftliche Nutzung gibt ist die Führung im Seitenraum die beste Alternative, da hier wesentlich geringeres Konfliktpotential vorhanden ist. Auch zu Fuß Gehende fühlen sich bei einer Führung im Seitenraum ausreichend sicher, wenn es kein Hohes Fußverkerhersaufkommen gibt, Sie ausreichend Platz zur Verfügung haben und eine Trennung zum Radverkehr z.B. durch einen Grünstreifen klar erkennbar ist.
 </List.Item>
        <List.Item>Soll der Radverkehr auf der Fahrbahn geführt werden, so ist eine ausreichende Breite vorzusehen. Bei 3,5 Meter Breite (inkl. Markierungen) kann in fast allen Situationen eine hohe subjektive Sicherheit erreicht werden. Je nach Situation sind Grüneinfärbungen und bauliche Trennungen zusätzlich sinnvoll.
 </List.Item>
        <List.Item>Auch schmalere RVA können eine noch akzeptable subjektive Sicherheit bieten, wenn Sie z.B. durch niedrige Poller vom KFZ-Verkehr getrennt sind und an HVS ohne ruhenden Verkehr geführt werden.
</List.Item>
        <List.Item>Bei Führung des Radverkehrs zusammen mit ruhendem Verkehr ist die Lage rechts vom ruhenden Verkehr zu empfehlen. Eine Führung links des ruhenden Verkehrs wird generell als deutlich weniger sicher empfunden. Es können hier zwar Varianten gefunden werden, die in der Umfrage einen akzeptablen Wert erreichten, dabei sollte aber beachtet werden, dass zusätzliche Konflikte, wie Falschparker oder kreuzender Parkverkehr in der Umfrage nicht dargestellt wurden.
 </List.Item>
        <List.Item>Auch Autofahrende empfinden gut ausgebaute RVA inklusive Poller als sicherer. Die Bewertungen sind von den Tendenzen ähnlich, wie die der Radfahrenden, wenn auch einige Gefahren, bzw. durch Dooring weniger stark eingeschätzt werden.
</List.Item>
      </List>
    </Paragraph>
  </>
);

export default SectionResults;
