import styled from 'styled-components';
import config from '~/config';

export function getTextStyles() {
  return `
    font-size: 14px;
    line-height: 1.4;
    color: ${config.colors.darkgrey};
  `;
}

export default styled.p`
  ${getTextStyles()}
`;
