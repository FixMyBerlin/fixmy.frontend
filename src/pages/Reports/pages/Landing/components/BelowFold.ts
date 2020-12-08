import styled from 'styled-components';
import { media } from '~/styles/utils';

const ContentWrapper = styled.div`
  max-width: 568px;
  margin: 0 auto;
  padding: 0 16px 20px 16px;

  ${media.m`
    padding: 0 24px 40px 24px;
  `}
`;

export default ContentWrapper;
