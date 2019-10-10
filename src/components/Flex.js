import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'unset'};
  justify-content: ${props => props.justifyContent || 'unset'};
  align-items: ${props => props.alignItems || 'unset'};
`;
