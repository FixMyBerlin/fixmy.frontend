import styled from 'styled-components';

const HorizontalRuler = styled.hr`
  width: 100%;
  border: 1px dashed rgba(162, 162, 162, 0.87);

  &.light {
    border-color: rgba(211, 211, 211, 0.87);
  }
`;

export default HorizontalRuler;
