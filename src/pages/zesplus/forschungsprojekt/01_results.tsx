import React from 'react';
import { Heading, SectionProps } from '~/components2/Article';
import { InnerImg } from '~/components2/Article/Image/InnerImage';
import { Link } from '~/components2/Link';
import PngCtaRadverkehrsatlas from './images/cta-radverkehrsatlas.png';
import PngCtaNotion from './images/cta-teilprojekte.png';
import { notionUrl, radnetzplanungPath, simraUrl } from './links.const';

export const SectionResults = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Wichtigste Projektergebnisse
    </Heading>
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <a href={radnetzplanungPath} aria-hidden="true">
          <InnerImg source={PngCtaRadverkehrsatlas} alt="" />
        </a>
        <Link internal href={radnetzplanungPath}>
          Zum Radverkehrsatlas
        </Link>
      </div>
      <div style={{ textAlign: 'center' }}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={notionUrl}
          aria-hidden="true"
        >
          <InnerImg source={PngCtaNotion} alt="" />
        </a>
        <Link href={simraUrl}>Zur den Teilprojekten</Link>
      </div>
    </div>
  </>
);
