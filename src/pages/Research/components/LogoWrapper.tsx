import styled from 'styled-components';
import { media } from '~/styles/utils';

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  ${media.s`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      max-width: 420px;
   `}
`;

export default LogoWrapper;
