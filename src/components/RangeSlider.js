import styled from 'styled-components';
import RangeSlider from 'react-rangeslider';
import {breakpoints} from '~/styles/utils';

export default styled(RangeSlider)`

  width: 100%;
  max-width: ${breakpoints.s}px;

  && {
    height: 6px;
    margin-bottom: 72px;
    margin-top: 64px;
  }
  
  &&  .rangeslider__fill {
    background-color: ${config.colors.interaction};
  }
  
  && .rangeslider__handle {
     width: 48px;
     height: 48px;
     background-color: ${config.colors.interaction};
     border: none;
     box-shadow: 0 3px 4px rgba(0, 0, 0, 0.4);
     cursor: pointer;
     user-select: none;
     
     &:focus {
      outline: none;
     }
     
     &:after {
      content: none;
     }
  }
  
  && .rangeslider__handle-label {
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    line-height: 48px;
    vertical-align: center;
  }
  
  && .rangeslider__labels {
     margin-block-start: -0.4em;
     
     .rangeslider__label-item {
       color: ${config.colors.inactivegrey};
       letter-spacing: 0.2px;
       font-size: 10px;
    }
     
  }
  
  
  
`;
