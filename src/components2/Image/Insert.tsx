import styled from 'styled-components';
import { media } from '~/styles/utils';

const Insert = styled.img`
  width: 100vw;
  height: auto;
  margin-left: -16px;

  ${media.m`
    width: 100%;
    margin-left: initial;
  `}
`;

export default Insert;
