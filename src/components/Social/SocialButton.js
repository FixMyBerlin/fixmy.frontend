import React from 'react';
import styled from 'styled-components';

import FbIcon from '~/images/facebook.svg';
import TwIcon from '~/images/twitter.svg';

const SocialButton = styled.div`
  margin: 0 10px;
`;

export default (props) => {
  let iconSource;

  switch (props.type) {
    case 'twitter':
      iconSource = TwIcon;
      break;
    case 'facebook':
    default:
      iconSource = FbIcon;
      break;
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={props.link}>
      <SocialButton>
        <img alt="" src={iconSource} />
      </SocialButton>
    </a>
  );
};
