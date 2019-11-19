import React from 'react';

import GhostButton from '~/pages/KatasterKI/components/GhostButton';

export default ({
  style = {},
  className = null,
  text = 'Umfrage mit Freunden teilen'
}) => {
  if (!navigator.share) {
    return null;
  }

  const onShare = () => {
    navigator.share({
      title: config.katasterKI.shareTitle,
      text: config.katasterKI.shareText,
      url: `${config.prodUrl}/${config.routes.katasterKI.landing}`
    });
  };

  return (
    <GhostButton css={style} className={className} onClick={onShare}>
      {text}
    </GhostButton>
  );
};
