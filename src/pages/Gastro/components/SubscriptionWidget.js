import React from 'react';
import IframeResizer from 'iframe-resizer-react';

export default ({ url }) => {
  return (
    <IframeResizer
      title="Anmeldung für Benachrichtigung"
      frameBorder="0"
      scrolling="no"
      marginHeight={0}
      marginWidth={0}
      src={url}
      width="100%"
    />
  );
};
