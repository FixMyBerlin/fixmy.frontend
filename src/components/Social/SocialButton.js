import React from 'react';
import styled from 'styled-components';

import FbIcon from '~/images/facebook.svg';
import TwIcon from '~/images/twitter.svg';

const SocialButton = styled.div`
  margin: 0 10px;
`;

export default (props) => {
  let SocialIcon;

  switch (props.type) {
    case 'twitter':
      SocialIcon = TwIcon;
      break;
    case 'facebook':
    default:
      SocialIcon = FbIcon;
      break;
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={props.link}>
      <SocialButton>
        <SocialIcon />
      </SocialButton>
    </a>
  );
};
