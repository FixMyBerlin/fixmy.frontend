import React, { PureComponent } from 'react';
import styled from 'styled-components';

import HeartIcon from '~/images/heart.svg';
import { bounce } from '~/utils/style-utils';
import Label from '~/components/Label';
import { likeDetail } from '~/pages/Map/apiservice';

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

const buttonBoxShadow = '0 1px 5px 2px rgba(0, 0, 0, 0.25)';
const buttonBoxShadowActive = '0 1px 7px 3px rgba(0, 0, 0, 0.25)';

const LikeButton = styled.button`
  background: ${config.colors.interaction};
  width: 62px;
  height: 62px;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
  box-shadow: ${buttonBoxShadow};
  transition: box-shadow .15s;
  animation: ${props => (props.bouncy ? `${bounce} 0.8s` : 'none')};
  border: none;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

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
    box-shadow: ${props => (props.disabled ? buttonBoxShadow : buttonBoxShadowActive)};
  }
`;

class PlanningLike extends PureComponent {
  state = {
    count: 0,
    bouncy: false
  }

  inc = async () => {
    const count = await likeDetail(this.props.id, this.props.token);
    this.setState({ count, bouncy: false });

    setTimeout(() => {
      this.setState({ bouncy: true });
    }, 1);
  }

  render() {
    const { token } = this.props;
    const label = token ? 'gefällt mir' : 'Um eine Planung zu liken, musst du eingeloggt sein.';

    return (
      <PlanningLikeWrapper>
        <LikeButtonWrapper>
          <Label bold>{this.state.count === 0 ? ' ' : this.state.count}</Label>
          <LikeButton disabled={!token} onClick={this.inc} bouncy={this.state.bouncy}>
            <HeartIcon />
          </LikeButton>
          <Label>{label}</Label>
        </LikeButtonWrapper>
      </PlanningLikeWrapper>
    );
  }
}

export default PlanningLike;
