import React from 'react';
import styled from 'styled-components';

import BikeIcon from '~/images/bike.svg';
import { numberFormat, getHBIColorByIndex } from '~/utils';

const HBISign = styled.div`
  border: 3px solid ${props => props.color || config.colors.index};
  width: 62px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-align: center;
  box-shadow: 0 0 2px 2px rgba(0,0,0,.18);
  text-decoration: none;
  color:  ${config.colors.darkgrey};
  font-weight: 600;
  cursor: pointer;
  background: white;

  svg {
    path {
      fill: ${props => props.color || config.colors.index};
    }
  }
`;

const HBISignComp = props => (
  <HBISign
    className={props.className}
    onClick={props.onClick}
    color={getHBIColorByIndex(props.hbi)}
  >
    <div>
      <BikeIcon />
      <div>
        {numberFormat(props.hbi)}
      </div>
    </div>
  </HBISign>
);

HBISignComp.defaultProps = {
  onClick: () => {}
};

export default HBISignComp;
