import styled from 'styled-components';

export default styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  opacity: ${(props) => (props.isActive ? 1 : 0.4)};

  &:hover {
    opacity: 0.4;
  }
`;
