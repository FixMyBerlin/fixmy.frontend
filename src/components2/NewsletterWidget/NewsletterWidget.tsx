import React from 'react';
import config from '~/config';

/**
 * An iFrame that shows the subscription form for the newsletter
 *
 * The iFrame source can be configured through `config.newsletter.embedUrl`
 *
 * @param param0.height `height` attribute of the iFrame
 */
const NewsletterWidget = ({ height = 120 }) => (
  <iframe
    title="Newsletter-Anmeldung"
    frameBorder="0"
    scrolling="no"
    marginHeight={0}
    marginWidth={0}
    src={`${config.newsletter.embedUrl}?v=4`}
    width="100%"
    height={height}
  />
);

export default NewsletterWidget;
