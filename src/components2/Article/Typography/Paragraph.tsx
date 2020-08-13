import styled from 'styled-components';
import config from '~/config';

const Paragraph = styled.div`
  font-weight: 400;
  font-family: ${config.baseFont};
  margin: 1em auto;
  line-height: 1.5;
  max-width: 520px;
`;

export default Paragraph;
