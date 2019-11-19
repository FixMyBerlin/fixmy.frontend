import styled from 'styled-components';

export default styled.input`
  border: none;
  border-bottom: 1px solid ${config.colors.inactivegrey};
  font-size: 24px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  &:focus {
    outline: none;
    border-bottom-color: ${config.colors.katasterHighlight};
  }
`;
