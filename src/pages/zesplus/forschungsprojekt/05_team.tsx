/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import styled from 'styled-components';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { InnerImg } from '~/components2/Article/Image/InnerImage';
import config from '~/config';
import { media } from '~/styles/utils';
import Teamalf from './images/team/alf.jpg';
import Teamcami from './images/team/cami.jpg';
import Teamchristoph from './images/team/christoph.jpg';
import Teamdenise from './images/team/denise.jpg';
import Teamjenoch from './images/team/jenoch.jpg';
import Teamkatharina from './images/team/katharina.jpg';
import Teamrudolph from './images/team/rudolph.jpg';
import Teamschwedes from './images/team/schwedes.jpg';
import Teamtim from './images/team/tim.jpg';
import Teamtobias from './images/team/tobias.jpg';
import Teamute from './images/team/ute.jpg';
import Teamheiko from './images/team/heiko.jpg';
import Kommuneeichwalde from './images/logos-kommunen/eichwalde.png';
import Kommunekw from './images/logos-kommunen/kw.png';
import Kommuneschoenefeld from './images/logos-kommunen/schoenefeld.png';
import Kommuneschulzendorf from './images/logos-kommunen/schulzendorf.png';
import Kommunewildau from './images/logos-kommunen/wildau.png';
import Kommunezeuthen from './images/logos-kommunen/zeuthen.png';
import { Link } from '~/components2/Link';

const MaxWidthSection = styled.div`
  margin: 1em auto;
  max-width: 518px;

  ${media.l`
    max-width: 598px;
  `}
`;

const TeamGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  ${media.m`
    grid-template-columns: repeat(3, minmax(0, 1fr));
  `}

  ${media.l`
    grid-template-columns: repeat(4, minmax(0, 1fr));
  `}
`;

const KommunenGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

const TeamMember = ({ img, name, role }) => {
  return (
    <div>
      <InnerImg source={img} alt="" />
      <p style={{ lineHeight: '130%', marginTop: '0.5rem' }}>
        <strong>{name}</strong>
        <br />
        <span style={{ color: config.colors.midgrey }}>{role}</span>
      </p>
    </div>
  );
};

export const SectionTeam = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Über Uns
    </Heading>
    <MaxWidthSection>
      <TeamGrid>
        <TeamMember
          img={Teamute}
          name="Ute Samland"
          role="Wiss. Mitarbeiterin, TU Berlin"
        />
        <TeamMember
          img={Teamdenise}
          name="Denise Kramer"
          role="Wiss. Mitarbeiterin, TH Wildau"
        />
        <TeamMember
          img={Teamchristoph}
          name="Christoph Kollert"
          role="Verbund&shy;koordination, Gemeinde Eichwalde"
        />
        <TeamMember
          img={Teamtim}
          name="Tim Zander"
          role="interkomm, Radverkehrsmanager, Gemeinde Eichwalde"
        />

        <TeamMember
          img={Teamschwedes}
          name="Prof. Dr. Oliver Schwedes"
          role="TU Berlin"
        />
        <TeamMember
          img={Teamrudolph}
          name="Prof. Dr.-Ing Christian Rudolph"
          role="TH Wildau"
        />
        <TeamMember
          img={Teamjenoch}
          name="Jörg Jenoch"
          role="Bürgermeister, Gemeinde Eichwalde"
        />
        <TeamMember
          img={Teamalf}
          name="Prof. em. Dr. Alf Hamann"
          role="Lokales Radnetz, Einwohner,  Eichwalde"
        />

        <TeamMember
          img={Teamheiko}
          name="Heiko Rintelen"
          role="Geschäftsführung, FixMyCity"
        />
        <TeamMember
          img={Teamtobias}
          name="Tobias Jordans"
          role="Entwicklung, FixMyCity"
        />
        <TeamMember
          img={Teamkatharina}
          name="Katharina Dehler"
          role="Konzeption & UX Design, FixMyCity"
        />
        <TeamMember
          img={Teamcami}
          name="Camila Espinoza"
          role="Datenredaktion, FixMyCity"
        />
      </TeamGrid>

      <Heading as="h3">Unsere Partnerkommunen</Heading>
      <KommunenGrid>
        <p style={{ textAlign: 'center' }}>
          <InnerImg
            source={Kommuneeichwalde}
            alt="Wappen der Gemeinde Eichwalde"
          />
          <br />
          <Link href="https://eichwalde.de/">Eichwalde</Link>
        </p>
        <p style={{ textAlign: 'center' }}>
          <InnerImg source={Kommunezeuthen} alt="Wappen der Gemeinde Zeuthen" />
          <br />
          <Link href="https://www.zeuthen.de/">Zeuthen</Link>
        </p>
        <p style={{ textAlign: 'center' }}>
          <InnerImg
            source={Kommuneschulzendorf}
            alt="Wappen der Gemeinde Schulzendorf"
          />
          <br />
          <Link href="https://www.schulzendorf.de/">Schulzendorf</Link>
        </p>
        <p style={{ textAlign: 'center' }}>
          <InnerImg source={Kommunewildau} alt="Wappen der Stadt Wildau" />
          <br />
          <Link href="https://www.wildau.de/">Wildau</Link>
        </p>
        <p style={{ textAlign: 'center' }}>
          <InnerImg
            source={Kommunekw}
            alt="Wappen der Stadt Königs Wusterhausen"
          />
          <br />
          <Link href="https://www.koenigs-wusterhausen.de/">
            Königs Wusterhausen
          </Link>
        </p>
        <p style={{ textAlign: 'center' }}>
          <InnerImg
            source={Kommuneschoenefeld}
            alt="Wappen der Gemeinde Schönefeld"
          />
          <br />
          <Link href="https://www.gemeinde-schoenefeld.de/">Schoenefeld</Link>
        </p>
      </KommunenGrid>
    </MaxWidthSection>
  </>
);
