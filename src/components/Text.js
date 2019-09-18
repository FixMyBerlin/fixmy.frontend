import styled from 'styled-components';

export function getTextStyles() {
  return `
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    line-height: 1.4;
    color: ${config.colors.darkgrey};
  `;
}

export default styled.p`
  ${getTextStyles()}
`;
