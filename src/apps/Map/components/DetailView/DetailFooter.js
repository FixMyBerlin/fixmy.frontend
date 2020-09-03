import styled from 'styled-components';
import config from '~/config';

export default styled.div`
  background: ${config.colors.likebg};
  padding: 24px 16px;
  box-shadow: 0 -1px 6px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  flex-direction: column;
  bottom: 0;
`;
