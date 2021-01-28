import React from 'react';
import { connect } from 'react-redux';

import config from '~/config';
import { Button } from '~/components2/Button';

const ShareButton = ({ style = {}, className = null, url, text, district }) => {
  // @ts-ignore
  if (!navigator.share) {
    return null;
  }

  const onShare = () => {
    // @ts-ignore
    navigator.share({
      title: district.apps.spielstrassen.shareTitle,
      text,
      url,
    });
  };

  return <Button onClick={onShare}>Link teilen</Button>;
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(ShareButton);
