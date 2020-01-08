import styled from 'styled-components';
import config from '~/config';

export function getSectionTitleStyles() {
  return `
    font-size: 22px;
    font-weight: 300;
    font-family: 'Open Sans', serif;
    color: ${config.colors.black};
  `;
}

export default styled.h2`
  ${getSectionTitleStyles()}
`;
