import styled from 'styled-components';

import { media } from '~/styles/utils';

const Kicker = styled.div`
  text-transform: uppercase;
  font-size: 0.75em;
  letter-spacing: 0.25em;
  font-weight: 300;

  ${media.s`
    font-size: 0.88em;
  `}
`;

export default Kicker;
