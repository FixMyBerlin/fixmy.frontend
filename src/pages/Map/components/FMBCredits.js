import React from 'react';
import styled from 'styled-components';
import ExternalLink from '~/components/ExternalLink';

const FMBCredits = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -90px;
  width: 180px;
  background: #fff;
  border-radius: 4px 4px 0 0;
  padding: 5px;
  font-size: 12px;
  z-index: 1000;
  text-align: center;
`;

export default () => (
  <FMBCredits>Ein Angebot von <ExternalLink href="https://fixmyberlin.de" target="_blank">FixMyBerlin</ExternalLink></FMBCredits>
);
