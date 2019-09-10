import styled from 'styled-components';

import Paragraph from './Paragraph';

export const RadioButtonLabel = styled(Paragraph).attrs({ as: 'label' })`
  align-self: flex-start;
  cursor: pointer;
`;

export const RadioButton = styled.input`
  cursor: pointer;
  margin-right: 12px;
  display: inline-block;
`;
