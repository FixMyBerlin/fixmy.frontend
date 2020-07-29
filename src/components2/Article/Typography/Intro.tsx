import styled from 'styled-components';
import Paragraph from './Paragraph';
import { media } from '~/styles/utils';

const Intro = styled(Paragraph)`
  font-weight: 700;

  ${media.m`
    margin: 3em auto;
  `};
`;

Intro.displayName = 'Introduction';

export default Intro;
