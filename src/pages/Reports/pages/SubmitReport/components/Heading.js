import styled from 'styled-components';

export default styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: ${config.colors.black};
  text-align: ${props => (props.alignLeft ? 'left' : 'center')};
`;
