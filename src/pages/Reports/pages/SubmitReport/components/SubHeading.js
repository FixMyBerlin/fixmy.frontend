import styled from 'styled-components';

export default styled.h4`
  font-size: 16px;
  font-weight: bold;
  color: ${config.colors.darkbg};
  text-align: ${(props) => (props.alignLeft ? 'left' : 'center')};
`;
