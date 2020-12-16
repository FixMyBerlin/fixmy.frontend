import React from 'react';

import {
  Paragraph,
  Heading,
  SectionProps,
  ImageFull,
} from '~/components2/Article';
import Link from '~/components2/Link';
import ZESMobil from './images/zesmobil.png';

const SectionNextSteps = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Wie geht es weiter?
    </Heading>
    <Paragraph>
      <strong>Als nächste Schritte</strong> sind der Abschluss der Netzplanung
      und die <strong>Weiterentwicklung der Maßnahmenübersicht</strong> in Form
      einer tabellarischen Übersicht und einer Karte geplant. Dafür werden
      Maßnahmen mit den beteiligten Verwaltungen und mit allen relevanten
      Akteuren abgestimmt und deren Umsetzungen soweit möglich initiiert.
      Parallel bewirbt sich das NUDAFA-Projekt im Rahmen der MobilitätsWerkStadt
      2025 auf weitere Fördermittel des BMBF. Zukünftig sollen damit die agile
      Kommunikations- und Planungsplattform für die interkommunale
      Radverkehrsförderung weiterentwickelt werden und die Übertragbarkeit auf
      andere Kommunen (insbesondere auch für Wildau, Königs Wusterhausen und
      Schönefeld) erprobt werden. Geplant ist dabei bspw. eine Planungskarte,
      die Bewertung des Umsetzungsgrad des Konzepts mit dem Happy-Bike-Index 2.0
      und die Entwicklung weiterer Themenkarten.
    </Paragraph>
    <Paragraph>
      <strong>Die Integration der Nachbargemeinden</strong> in den
      Betrachtungsraum des <strong>ZESplus</strong>-Konzepts bietet dabei die
      Möglichkeit, die entwickelte Methodik anzupassen und weiter zu entwickeln.
      Im Vordergrund steht dabei jedoch die Abstimmung mit den Nachbarkommunen
      zur Herstellung eines flächendeckenden, attraktiven und sicheren
      Wegenetzes.
    </Paragraph>
    <a href="#reallabor" id="reallabor" className="internal">
      <Heading as="h3">Reallabor</Heading>
    </a>
    <Paragraph>
      <strong>
        Das geplante Reallabor für interkommunale Radverkehrsförderung
      </strong>{' '}
      bietet dabei die Möglichkeit verschiedene Kooperationspartner zusammen zu
      bringen, um in konkreten Modellprojekten und *Realexperimenten* den
      Radverkehr stärker in der Region zu verankern. Ein besonders wichtiger
      Partner ist dabei die <strong>TH Wildau</strong> mit der dort
      angesiedelten{' '}
      <Link href="https://www.th-wildau.de/studieren-weiterbilden/studiengaenge/radverkehr-m-eng/projekt-stiftungsprofessur-radverkehr/">
        <strong>Stiftungsprofessur für Radverkehrsplanung</strong>
      </Link>{' '}
      und weiteren Professuren mit umfangreichen Kompetenzen in der
      Verkehrsplanung. Neben der Fortführung der Kooperation mit{' '}
      <Link href="https://fixmyberlin.de">FixMyCity</Link> und dem{' '}
      <Link href="https://www.mcc.tu-berlin.de/">
        Fachgebiet Mobile Cloud Computing
      </Link>{' '}
      der TU Berlin ist auch die intensive Zusammenarbeit mit dem{' '}
      <Link href="https://ivp.tu-berlin.de">
        Fachgebiet Integrierte Verkehrsplanung - TU Berlin
      </Link>{' '}
      geplant.
    </Paragraph>
    <a href="#realexperimente" id="realexperimente" className="internal">
      <Heading as="h3">Realexperimente</Heading>
    </a>
    <Paragraph>
      <strong>Realexperimente</strong> beschreiben die transformative und
      transdiszipiplinäre Erforschung innovativer Ansätze der
      Radverkehrsförderung. Die Entwicklung der oben vorgestellten Karten bildet
      so ein Realexperiment. Weitere Realexperimente werden aktuell vorbereitet
      bzw. durchgeführt: Zur Verbesserung des Fahrkomforts erprobt die Gemeinde
      Eichwalde zusammen mit mehreren Firmen einer neuartigen Schleifmaschine
      zum Abschleifen von Fahrbahnflächen mit großem Kopfsteinpflaster. Am
      Humboldt-Gymnasium Eichwalde wurde mit der Partizipation
      Schulwegkartierung bereits erste Schritte zur Verbesserung des schulischen
      Mobilitätsmanagements eingeleitet. Sie hilft, die Bedürfnisse der
      Schüler:innen besser zu verstehen, ihre Schulwege sicherer zu machen und
      mehr Menschen frühzeitig fürs Radfahren zu begeistern. Mit weiteren
      Schulen und in Kooperation mit dem{' '}
      <Link href="https://www.kjv.de/">Kinder und Jugend Verband</Link> soll
      dies fortgeführt werden.
    </Paragraph>
    <Heading as="h3">Aufsuchende Bürgerbeteiligung</Heading>
    <a href={ZESMobil}>
      <ImageFull
        source={ZESMobil}
        alt="Schematische Darstellung des ZESmobil"
      />
    </a>
    <Paragraph>
      <strong>Das ZESmobil</strong> soll zukünftig Beteiligungsformate im Freien
      (corona-konform) unterstützten. Mit umfangreicher Ausstattung (integrierte
      Tablets, weitere Präsentationstechnik, Moderationskoffer, Handbibliothek,
      Sonnenschirm, klappbarer Tisch und Stühlen) bildet es das Bindeglied
      zwischen digitalen und analogen Beteiligungsformen, weil bspw. die
      Themenkarten mobil betrachtet und diskutiert werden können.
    </Paragraph>
  </>
);

export default SectionNextSteps;
