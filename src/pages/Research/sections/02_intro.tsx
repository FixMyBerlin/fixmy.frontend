import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Paragraph, Heading, ImageMulti } from '~/components2/Article';
import { AnchorButton } from '~/components2/Button';
import ButtonWrapper from '../components/ButtonWrapper';
import FeelSafe from '../components/FeelSafe';
import Link from '~/components2/Link';

import MS_C_573 from '../images/01_MS_C_573_@x2.jpg';
import MS_A_570 from '../images/01_MS_A_570_@x2.jpg';

const SectionIntroduction = ({ toc }) => (
  <>
    <Heading toc={toc} as="h2">
      <FormattedMessage
        id="research.02_intro.heading"
        defaultMessage="Über das Projekt"
      />
    </Heading>
    <Paragraph>
      <FormattedMessage
        id="research.02_intro.p1"
        defaultMessage="Bisher gibt es kaum Erhebungen, welche Arten von Straßen, Radverkehrsanlagen und Kreuzungen die Verkehrsteilnehmenden subjektiv als sicher empfinden. Insbesondere zur differenzierten Betrachtung verknüpfter Merkmale, wie Führungsform der Radverkehrsanlage (RVA), Ausführung, Breite sowie der Situation links und rechts der RVA gibt es bisher kaum Untersuchungen. Sind Radfahrstreifen mit Sperrpfosten (Pollern) die beste Lösung, um den gefühlten Konflikt zwischen Auto und Fahrrad zu mindern oder sind ausreichend breite Radstreifen entscheidend? Welchen Effekt hat die Einfärbung von Radstreifen? Unter welchen Bedingungen wird die Führung im Seitenraum oder auf der Fahrbahn als sicherer empfunden?"
      />
    </Paragraph>
    <Paragraph>
      <FormattedMessage
        id="research.02_intro.p2"
        defaultMessage="Um diese Forschungslücke zu verkleinern hat FixMyCity die Umfrage “Straßencheck” entwickelt und gemeinsam mit dem Tagesspiegel Berlin durchgeführt. Anhand von 3D-Bildern wurden 1.900 unterschiedliche Straßensituationen durch über 21.000 Teilnehmende bewertet. Die zugrunde liegende Systematik (s. {link}) zur Klassifizierung der Straßenquerschnitte und ihrer Merkmalsausprägungen erlaubt nun in der Auswertung die Einflussgrößen einzelner Merkmale, wie RVA-Breite, Oberfläche, baulicher Trennung, rechtsseitiges Parken, usw., zu analysieren. Ebenso konnten Erkenntnisse über Unterschiede im Sicherheitsempfinden verschiedener Nutzergruppen und zur Perspektive von Autofahrenden und Fußgänger:innen gewonnen werden."
        values={{
          link: (
            <a href="#umfragekonzept">
              <FormattedMessage
                id="research.02_intro.p2.link"
                defaultMessage="Umfragekonzept"
              />
            </a>
          )
        }}
      />
    </Paragraph>
    <ImageMulti>
      <ImageMulti.Inner
        source={MS_C_573}
        alt="Fahrradperspektive auf breiten Radweg mit grüner Oberfläche und Trennung zur Fahrbahn durch Blumenkübel"
      >
        <FeelSafe.Image value={99.11} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.02_intro.images1.label1"
            defaultMessage="*99,11 % der Radfahrenden bewerteten diese Situation als „sicher“ oder „eher sicher“"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner
        source={MS_A_570}
        alt="Autoperspektive auf vorigen Radweg"
      >
        <FeelSafe.Image value={96.84} icon="car" />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.02_intro.images1.label2"
            defaultMessage="*96,84 % der Autofahrenden bewerteten diese Situation als „sicher“ oder „eher sicher“"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <Paragraph>
      <FormattedMessage
        id="research.02_intro.p3"
        defaultMessage="Bei einer Führung auf der Fahrbahn fühlen sich die Radfahrenden unter allen Varianten auf der ersten der beiden gezeigten am sichersten. Autofahrende favorisieren die fast gleiche Gestaltung nur ohne Grüneinfärbung. Der breite, grün eingefärbter Radstreifen getrennt vom KFZ-Verkehr durch Blumenkästen erhielt von Radfahrer:innen die meisten Bewertungen “sicher” (83,93%) oder “eher sicher” (15,18%). Im Durchschnitt wurden von ihnen allerdings Führungen im Seitenraum als sicherer, als solche im fließenden Verkehr empfunden. Führungen in Nebenstraßen schnitten erstaunlich unsicher ab, wenn sie nicht “autofrei” dargestellt wurden. In der statistischen Auswertung finden Sie detaillierte Analysen zu den unterschiedlichen Führungsformen und ihrer Einflussfaktoren, sowie Auswertungen der Auto- und Fußperspektive. Eine Zusammenfassung der wichtigsten Aussagen finden Sie ganz unten in der Zusammenfassung."
      />
    </Paragraph>
    <ButtonWrapper>
      <AnchorButton flat href="#statistische-auswertung">
        <FormattedMessage
          id="research.02_intro.cta"
          defaultMessage="Direkt zur Auswertung"
        />
      </AnchorButton>
    </ButtonWrapper>
    <Paragraph>
      <FormattedMessage
        id="research.02_intro.p4"
        defaultMessage="Der Tagesspiegel Berlin hat eine eigene Auswertung der Ergebnisse gemacht, die Sie in diesem {link} finden"
        values={{
          link: (
            <Link href="https://interaktiv.tagesspiegel.de/lab/berliner-strassencheck-die-auswertung/">
              <FormattedMessage
                id="research.02_intro.p4.link"
                defaultMessage="Artikel"
              />
            </Link>
          )
        }}
      />
    </Paragraph>
  </>
);

export default SectionIntroduction;
