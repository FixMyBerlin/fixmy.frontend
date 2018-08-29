import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';

// @TODO: use heart icon
import HeartIcon from '~/images/heart.svg';
import Label from '~/components/styled/Label';

const bounce = keyframes`
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    transform: scale3d(0.5, 0.5, 0.5);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
`;

const PlanningLikeWrapper = styled.div`
  background: ${config.colors.likebg};
  padding: 24px 16px;
  box-shadow: 0 -1px 6px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  flex-direction: column;
  bottom: 0;
`;

const LikeButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`;

const LikeButton = styled.button`
  background: ${config.colors.interaction};
  width: 62px;
  height: 62px;
  display: flex;
  border-radius:50%;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
  box-shadow: 0 1px 5px 2px rgba(0, 0, 0, 0.25);
  transition: box-shadow .15s;
  cursor: pointer;
  animation: ${props => (props.bouncy ? `${bounce} 0.8s` : 'none')};
  border: none;
  
  svg {
    g {
      fill: white;
    }
  }

  &:focus {
    outline: none;
    border: none;
  }

  &:hover {
    box-shadow: 0 1px 7px 3px rgba(0, 0, 0, 0.25);
  }
`;

const Counter = styled(Label)`
  font-weight: 700;
`;

class PlanningLike extends PureComponent {
  state = {
    count: 0,
    bouncy: false
  }

  inc = () => {
    this.setState({
      count: this.state.count + 1,
      bouncy: false
    });

    setTimeout(() => {
      this.setState({ bouncy: true });
    }, 1);
  }

  render() {
    return (
      <PlanningLikeWrapper>
        <LikeButtonWrapper>
          <Counter>{this.state.count}</Counter>
          <LikeButton onClick={this.inc} bouncy={this.state.bouncy}>
            <HeartIcon />
          </LikeButton>
          <Label>gefällt mir</Label>
        </LikeButtonWrapper>
      </PlanningLikeWrapper>
    );
  }
}

export default PlanningLike;
