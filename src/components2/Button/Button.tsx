import styled from 'styled-components';
import config from '~/config';
import { media } from '~/styles/utils';

interface Props {
  ghost?: boolean;
  flat?: boolean;
  disabled?: boolean;
  href?: string;
}

const getBackgroundColor = ({ ghost, disabled }: Props) => {
  if (ghost) {
    return 'none';
  }
  if (disabled) return config.colors.lightbg;
  return config.colors.interaction;
};

const BaseButton = (containerElem: 'a' | 'button') => styled(containerElem)<
  Props
>`
  background: ${getBackgroundColor};
  border-radius: 24px;
  border: ${(props) =>
    props.ghost ? `1.5px solid ${config.colors.interaction}` : 'none'};
  display: inline-block;
  box-shadow: ${(props) =>
    props.flat ? 'none' : '0 10px 20px 0 rgba(0, 0, 0, 0.2)'};
  color: ${({ disabled }) =>
    disabled ? config.colors.inactivegrey : config.colors.darkbg};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-weight: bold;
  hyphens: auto;
  line-height: 1.15;
  outline: none;
  padding: 15px 25px;
  width: 100%;
  word-break: break-all;

  &:hover {
    opacity: ${(props) => (props.disabled ? 1 : 0.9)};
  }

  && a:link,
  && a:visited {
    border: none;
    color: ${config.colors.darkbg};
    text-decoration: none;
  }

  ${media.s`
    width: initial;
    max-width: 24em;
  `}
`;

export default BaseButton;
