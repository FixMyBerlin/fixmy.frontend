import styled from 'styled-components';
import config from '~/config';

export function getTitleStyles() {
  return `
    font-size: 22px;
    font-weight: 700;
    font-family: '${config.titleFont}', serif;
  `;
}

export default styled.h1`
  ${getTitleStyles()}
`;
