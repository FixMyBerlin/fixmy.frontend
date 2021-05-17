import styled from 'styled-components';

import config from '~/config';

export default styled.div<{
  bold?: boolean;
  margin?: string;
  light?: boolean;
  uppercase?: boolean;
}>`
  font-size: 10px;
  font-weight: ${(props) => (props.bold ? 700 : 500)};
  line-height: 1.2;
  letter-spacing: 0.2px;
  margin: ${(props) => props.margin || 0};
  color: ${(props) =>
    props.light ? config.colors.midgrey : config.colors.darkgrey};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};
`;
