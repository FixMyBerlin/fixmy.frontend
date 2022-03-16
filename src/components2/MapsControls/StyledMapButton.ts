import styled from 'styled-components';
import config from '~/config';

type Props = {
  $active: boolean;
};

// Use `$active` to invert the button and disable the hover/… styles.
// `$active` needs to be prefixed with a `$` which makes it a special styled component prop
// that does not get passed down to the underlying DOM element.
// Learn more at https://styled-components.com/docs/api#typescript and https://styled-components.com/docs/api#transient-props
export const StyledMapButton = styled.svg<Props>`
  cursor: pointer;
  display: block;
  margin-bottom: 5px;
  overflow: visible;
  circle {
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
      drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  }
  ${({ $active }) =>
    $active &&
    `
    circle {
      fill: ${config.colors.darkgrey};
      stroke: #EEE;
    }
    g {
      stroke: #EEE;
    }
  `}
  ${({ $active }) =>
    !$active &&
    `
    &:hover circle {
      fill: ${config.colors.lightbg};
    }
    &:active circle,
    &:focus circle {
      fill: ${config.colors.lightgrey};
    }`}
`;
