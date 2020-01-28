import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import config from '~/config';

export default styled(Slider)`
  .rc-slider-track {
    background-color: ${config.colors.interaction};
  }

  .rc-slider-track, .rc-slider-rail, .rc-slider-step {
    height: 6px;
  }
  
  .rc-slider-handle {
     width: 48px;
     height: 48px;
     background-color: ${config.colors.interaction};
     border: none;
     box-shadow: 0 3px 4px rgba(0, 0, 0, 0.4);
     cursor: pointer;
     user-select: none;
     transform: translate(-50%, -18px) !important;
     display: flex;
     justify-content: center;
     align-items: center;
     z-index: 100;
     
     &:focus {
      outline: none;
      border: none;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.4);
     }
     
     &:after {
      content: "${(p) => p.value}";
      display: block;
      user-select: none;
      color: white;
      font-size: 18px;
      font-weight: bold;
     }

     &:active, &:hover {
      outline: none;
      border: none;
     }

     &:active {
      box-shadow: none;
     }
  }

  .rc-slider-dot {
    display: none;
  }

  .rc-slider-mark-text {
    color: ${config.colors.inactivegrey};
    letter-spacing: 0.2px;
    font-size: 10px;
  }
`;
