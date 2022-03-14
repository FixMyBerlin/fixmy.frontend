import styled from 'styled-components';
import { media } from '~/styles/utils';

export const ButtonWrapper = styled.div`
  margin: 1em auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.s`
    margin: 1em auto 2em;
  `}

  ${media.m`
    margin: 2em auto 4em;
  `}
`;
