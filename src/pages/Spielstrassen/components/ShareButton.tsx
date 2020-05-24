import React from 'react';

import config from '~/pages/Spielstrassen/config';
import Button from '~/components2/Button';

export default ({ style = {}, className = null, url, text }) => {
  // @ts-ignore
  if (!navigator.share) {
    return null;
  }

  const onShare = () => {
    // @ts-ignore
    navigator.share({
      title: config.Spielstrassen.shareTitle,
      text,
      url
    });
  };

  return <Button onClick={onShare}>Link teilen</Button>;
};
