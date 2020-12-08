import React from 'react';

import {
  Paragraph,
  ImageFull,
  Heading,
  SectionProps,
} from '~/components2/Article';
import { AnchorButton } from '~/components2/Button';
import NewsletterWidget from '~/components2/NewsletterWidget';

import Image2 from '~/images/eichwalde/research-2.jpg';

const SectionNewsletter = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Newsletter und Feedback?
    </Heading>
    <Paragraph>
      Abonnieren Sie unseren Newsletter um aktuelle Informationen zum Projekt zu
      erhalten.
    </Paragraph>
    <Paragraph>
      <NewsletterWidget height={203} />
    </Paragraph>
    <Paragraph>
      Wenn Sie Fragen zum Projekt oder Feedback haben senden Sie eine E-Mail an
      den Projektleiter Christoph Kollert.
    </Paragraph>
    <Paragraph>
      <AnchorButton flat href="mailto:Christoph.Kollert@eichwalde.de">
        Feedback an das Projektteam
      </AnchorButton>
    </Paragraph>
    <ImageFull source={Image2} alt="" role="presentation" />
  </>
);

export default SectionNewsletter;
