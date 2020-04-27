import styled from 'styled-components';
import config from '~/config';

interface Props {
  ghost?: boolean;
  flat?: boolean;
}

export default styled.button<Props>`
  border-radius: 24px;
  border: ${(props) =>
    props.ghost ? `1.5px solid ${config.colors.interaction}` : 'none'};
  outline: none;
  display: inline-block;
  padding: 15px 25px;
  background: ${(props) => (props.ghost ? 'none' : config.colors.interaction)};
  box-shadow: ${(props) =>
    props.flat ? 'none' : '0 10px 20px 0 rgba(0, 0, 0, 0.2)'};
  color: ${config.colors.darkbg};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  && a:link,
  && a:visited {
    color: ${config.colors.darkbg};
    border: none;
    text-decoration: none;
  }
`;
