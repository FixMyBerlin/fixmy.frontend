import styled from 'styled-components';
import config from '~/pages/Reports/config';

export default styled.h4`
  font-size: 1em;
  font-weight: bold;
  color: ${config.colors.darkbg};
  text-align: ${(props) => (props.alignLeft ? 'left' : 'center')};
  margin-bottom: 1em;
`;
