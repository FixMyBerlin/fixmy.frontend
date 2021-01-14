import styled from 'styled-components';

interface Props {
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
}

const Flex = styled.div<Props>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'unset'};
  justify-content: ${(props) => props.justifyContent || 'unset'};
  align-items: ${(props) => props.alignItems || 'unset'};
`;

export default Flex;
