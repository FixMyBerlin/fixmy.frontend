import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  0%    { transform: rotate(0deg); }
  100%  { transform: rotate(360deg); }
`;

const Loader = styled.div.attrs((props) => ({ size: props.size || 15 }))`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  animation: ${rotate360} 0.8s infinite linear;
  border: 3px solid ${config.colors.darkgrey};
  border-right-color: transparent;
  border-radius: 50%;
`;

export default Loader;
