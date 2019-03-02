import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BikeParkIcon from '~/images/reports/bikeparkdark.svg';

const Wrapper = styled.div`
  border-bottom: solid 1px ${config.colors.inactivegrey};
  background-color: white;
  width: 100vw;
`;

const BackButton = styled.p`
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
  color: ${config.colors.darkgrey};
`;

const NavBar = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledBikeParkIcon = styled(BikeParkIcon)`

`;

// TODO: remove style prop when a cleaner solution is found
const FormProgressBar = ({stepNumber, stepCaption, onBackButtonTap, style}) => (
  <Wrapper style={style}>
    <BackButton onClick={onBackButtonTap}>&lt; zurück</BackButton>
    <NavBar>
      {stepNumber} | {stepCaption}
      <StyledBikeParkIcon />


    </NavBar>
  </Wrapper>
);

FormProgressBar.propTypes = {
  stepNumber: PropTypes.number,
  stepCaption: PropTypes.string,
  onBackButtonTap: PropTypes.func
};

FormProgressBar.defaultProps = {
  stepNumber: 1,
  stepCaption: 'Ort',
  onBackButtonTap: () => console.log('onBackButtonTap() says implement me')
}

export default FormProgressBar;
