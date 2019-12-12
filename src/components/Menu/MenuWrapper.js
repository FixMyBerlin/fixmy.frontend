import styled from 'styled-components';

const MenuTransform = `translate3d(-${config.menu.size + 10}px, 0, 0)`;
const MenuActiveTransform = 'translate3d(0,0,0)';

export default styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${config.menu.size}px;
  transform: ${(props) =>
    props.isActive ? MenuActiveTransform : MenuTransform};
  transition: transform 0.3s;
  height: 100%;
  box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.24);
  z-index: 1000000;
  background: white;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
`;
