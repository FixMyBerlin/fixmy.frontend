import React, { PureComponent } from 'react';
import styled from 'styled-components';

import HeartIcon from '~/images/heart.svg';
import { bounce } from '~/utils/style-utils';
import Label from '~/components/Label';
import Link from '~/components/Link';
import { likeDetail, getLikes } from '~/pages/Map/apiservice';

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
  background: ${props => (props.disabled ? config.colors.inactivegrey : config.colors.interaction)};
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
    bouncy: false,
    enabled: false
  }

  componentDidMount() {
    this.updateLikes();
  }

  updateLikes = async () => {
    const res = await getLikes(this.props.url, this.props.token);
    this.handleLikeResponse(res);
  }

  inc = async () => {
    this.setState({ bouncy: false });

    setTimeout(() => {
      this.setState({ bouncy: true, enabled: false });
    }, 1);

    const res = await likeDetail(this.props.url, this.props.token);
    this.handleLikeResponse(res);
  }

  handleLikeResponse = (res) => {
    if (typeof res.likes !== 'undefined' && typeof res.user_has_liked !== 'undefined' && !res.error) {
      this.setState({
        count: res.likes,
        enabled: !res.user_has_liked
      });
    }
  }

  render() {
    const { token } = this.props;
    const disabled = !token || !this.state.enabled;

    const label = token ?
      <Label>gefällt mir</Label> :
      <Label>Um eine Planung zu liken, musst du <Link to={config.routes.login}>eingeloggt sein</Link>.</Label>;

    return (
      <PlanningLikeWrapper>
        <LikeButtonWrapper>
          <Label bold>{this.state.count}</Label>
          <LikeButton disabled={disabled} onClick={this.inc} bouncy={this.state.bouncy}>
            <HeartIcon />
          </LikeButton>
          {label}
        </LikeButtonWrapper>
      </PlanningLikeWrapper>
    );
  }
}

export default PlanningLike;
