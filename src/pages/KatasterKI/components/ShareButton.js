import React from 'react';

import GhostButton from '~/pages/KatasterKI/components/GhostButton';
import config from '~/pages/KatasterKI/config';

export default ({
  style = {},
  className = null,
  text = 'Umfrage mit Freunden teilen',
}) => {
  if (!navigator.share) {
    return null;
  }

  const onShare = () => {
    navigator.share({
      title: config.katasterKI.shareTitle,
      text: config.katasterKI.shareText,
      url: config.katasterKI.shareUrl,
    });
  };

  return (
    <GhostButton css={style} className={className} onClick={onShare}>
      {text}
    </GhostButton>
  );
};
