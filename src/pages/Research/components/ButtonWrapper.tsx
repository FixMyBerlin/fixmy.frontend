import styled from 'styled-components';
import { media } from '~/styles/utils';

const ButtonWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  text-align: center;

  ${media.m`
    margin: 4em auto;
  `}
`;

export default ButtonWrapper;
