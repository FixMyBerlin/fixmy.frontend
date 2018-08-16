import styled from 'styled-components';

export function getTitleStyles() {
  return `
    font-size: 22px;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
  `;
}

export default styled.h1`
  ${getTitleStyles()}
`;
