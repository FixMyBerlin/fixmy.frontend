import styled from 'styled-components';
import config from '~/config';

export default styled.div`
  font-size: 17px;
  font-weight: 600;
  line-height: 1;
  margin: 0;
  color: ${(props) =>
    props.light ? config.colors.midgrey : config.colors.darkgrey};
  margin: ${(props) => props.margin || 0};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};
`;
