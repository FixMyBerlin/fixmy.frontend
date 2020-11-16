import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Plus } from 'react-feather';
import config from '~/pages/Reports/config';

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 50px;
  transform: translate(${(props) => (props.shiftLeft ? '-200px' : '0')});
  transition: transform 0.5s;
  pointer-events: none;
`;

const Button = styled.button`
  width: 220px;
  height: 48px;
  border: none;
  border-radius: 25px;
  background: ${config.colors.interaction};
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.5);
  font-size: 18px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  padding: 0 20px 0 8px;
  align-items: center;

  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5) &[disabled] {
    box-shadow: none;
    background-color: ${config.colors.inactivegrey};
  }

  &:focus {
    outline: none;
  }
`;

const PlusIcon = styled(Plus)`
  height: 30px;
  width: 30px;
  padding-right: 14px;
  box-sizing: content-box;
`;

const CTAButton = ({ onTab, shiftLeft }) => (
  <ButtonWrapper shiftLeft={shiftLeft}>
    <Button onClick={onTab} className="wiggle">
      {config.reports.enabled && (
        <>
          <PlusIcon /> Neue Meldung
        </>
      )}
      {!config.reports.enabled && <>Mehr Infos</>}
    </Button>
  </ButtonWrapper>
);

CTAButton.propTypes = {
  onTab: PropTypes.func.isRequired,
  shiftLeft: PropTypes.bool // if true, position more to the left to leave space for foldout
};

CTAButton.defaultProps = {
  shiftLeft: false
};

export default CTAButton;
