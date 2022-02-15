import React from 'react';

import config from '~/config';

type Props = {
  height?: number;
  embedUrl?: `https://app.mailjet.com/widget/iframe/${string}`;
};

/**
 * An iFrame that shows the subscription form for the newsletter
 *
 * The iFrame source can be configured through `config.newsletter.embedUrl` or `props.embedUrl`
 * In Mailjet: https://app.mailjet.com/widget
 *
 * @param height `height` attribute of the iFrame
 * @param embedUrl optional `src` for the iframe
 */
export const NewsletterWidget: React.VFC<Props> = ({ height, embedUrl }) => {
  const src = embedUrl || `${config.newsletter.embedUrl}?v=4`;

  return (
    <iframe
      title="Newsletter-Anmeldung"
      scrolling="no"
      marginHeight={0}
      marginWidth={0}
      src={src}
      style={{ height: height || 120, width: '100%', border: 0 }}
    />
  );
};
