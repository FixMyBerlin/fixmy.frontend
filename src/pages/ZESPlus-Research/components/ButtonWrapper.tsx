import styled from 'styled-components';
import { media } from '~/styles/utils';

const ButtonWrapper = styled.div`
  margin: 1em auto;
  width: 100%;
  text-align: center;

  ${media.s`
    margin: 1em auto 2em;
  `}

  ${media.m`
    margin: 2em auto 4em;
  `}
`;

export default ButtonWrapper;
