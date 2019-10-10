import styled from 'styled-components';

export default styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 10px;
  font-weight: ${props => (props.bold ? 700 : 500)};
  line-height: 1.2;
  letter-spacing: 0.2px;
  margin: ${props => props.margin || 0};
  color: ${props => (props.light ? config.colors.midgrey : config.colors.darkgrey)};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
`;
