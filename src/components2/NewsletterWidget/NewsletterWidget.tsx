import React from 'react';
import config from '~/config';

const SubscriptionWidget = ({ height = 120 }) => (
  <iframe
    title="Newsletter-Anmeldung"
    frameBorder="0"
    scrolling="no"
    marginHeight={0}
    marginWidth={0}
    src={`${config.newsletterWidgetUrl}?v=4`}
    width="100%"
    height={height}
  />
);

export default SubscriptionWidget;
