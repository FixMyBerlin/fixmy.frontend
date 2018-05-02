import styled from 'styled-components';

const marginTop = '10px';
const marginRight = '10px';
const marginBottom = '10px';
const marginLeft = '10px';

export default styled.div.attrs({
  margins: (props) => {
    switch (props.position) {
      case 'top-right':
        return { top: marginTop, right: marginRight, bottom: 'auto', left: 'auto' };
      case 'bottom-right':
        return { top: 'auto', right: marginRight, bottom: marginBottom, left: 'auto' };
      case 'bottom-left':
        return { top: 'auto', right: 'auto', bottom: marginBottom, left: marginLeft };
      default:
        return { top: marginTop, right: 'auto', bottom: 'auto', left: marginLeft };
    }
  }
})`
  position: absolute;
  top: ${props => props.margins.top};
  right: ${props => props.margins.right};
  bottom: ${props => props.margins.bottom};
  left: ${props => props.margins.left};
  z-index: 9999999;

  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
`;
