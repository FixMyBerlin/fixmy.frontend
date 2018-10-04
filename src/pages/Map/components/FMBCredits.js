import React from 'react';
import styled from 'styled-components';
import ExternalLink from '~/components/ExternalLink';

const FMBCredits = styled.div`
  position: absolute;
  bottom: 215px;
  left: 8px;
  background: #fff;
  border-radius: 4px;
  padding: 5px;
  font-size: 12px;
`;

export default () => (
  <FMBCredits>Ein Angebot von <ExternalLink href="https://fixmyberlin.de" target="_blank">FixMyBerlin</ExternalLink></FMBCredits>
);
