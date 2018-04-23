import React from 'react';
import FbIcon from '~/images/facebook.svg';
import TwIcon from '~/images/twitter.svg';

import './SocialButtons.styl';

export default () => (
  <div className="social-buttons">
    <div className="social-button social-button__fb">
      <img alt="" src={FbIcon} />
    </div>
    <div className="social-button social-button__tw">
      <img alt="" src={TwIcon} />
    </div>
  </div>
);
