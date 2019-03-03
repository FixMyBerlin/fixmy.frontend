import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: ${config.colors.black};
`;

const Hint = styled.p`
  font-size: 14px;
  color: ${config.colors.darkgrey};
  line-height: 1.4;
`;

// TODO: make this a component having subcomponents
// TODO: checkout https://github.com/odysseyscience/react-s3-uploader for upload component

const AdditionalDataForm = ({photoUploadUrl}) => (
  <Wrapper>
    <Heading>Hier kannst du noch ein Foto ergänzen</Heading>
    <Hint>Das hilft den Planer*innen die Situation vor Ort besser zu verstehen.</Hint>


    <Heading>…oder eine Beschreibung eingeben</Heading>
  </Wrapper>
);

AdditionalDataForm.propTypes = {
  photoUploadUrl: PropTypes.string
};

AdditionalDataForm.defaultProps = {
  photoUploadUrl: 'please-set-a-url'
};

export default AdditionalDataForm;
