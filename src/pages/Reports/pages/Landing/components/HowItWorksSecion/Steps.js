import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const Item = styled.div`
  display: flex;
  align-items: flex-start;
  padding-bottom: 2em;
  border-left: 2px solid lightgray;
  &:last-child{
        border: 0;
    }

`;

const Text = styled.p`
  margin: 0;
  font-size: 16px;
  color: ${config.colors.darkgrey};
  float: right;
  flex-grow: 1;
`;

const StepIndicator = styled.span`
  flex-shrink: 0;
  display: block;
  margin-right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid white;
  color: white;
  background-color: ${props => props.color};;
  position: relative;
  right: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepNumber = styled.span`
  display: block;
  font-size: 12px;
  color: white;
  font-weight: bold;
`;

export default ({ steps }) => (
  <Wrapper>
    {steps.map(({ step, text, color }) => (

      <Item key={text.split(' ').slice(0, 5).join()}>
        <StepIndicator color={color}>
          <StepNumber>{step}</StepNumber>
        </StepIndicator>
        <Text>{text}</Text>
      </Item>

    ))
    }
  </Wrapper>
);
