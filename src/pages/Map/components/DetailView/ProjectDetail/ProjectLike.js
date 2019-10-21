import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import HeartIcon from '~/images/heart.svg';
import { bounce } from '~/styles/utils';
import Label from '~/components/Label';
import Link from '~/components/Link';
import { likeDetail, getLikes } from '~/pages/Map/apiservice';

const LikeButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`;

const buttonBoxShadow = '0 1px 5px 2px rgba(0, 0, 0, 0.25)';
const buttonBoxShadowActive = '0 1px 7px 3px rgba(0, 0, 0, 0.25)';
const animation = () => css`
  ${bounce} .8s;
`;

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
  animation: ${props => (props.bouncy ? animation : 'none')};
  border-style: solid;
  border-color: #cf0a7d;
  border-width: ${props => (props.isLiked ? '2px' : '0')};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

  svg {
    g {
      fill: white;
    }
  }

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: ${props => (props.disabled ? buttonBoxShadow : buttonBoxShadowActive)};
  }
`;

class ProjectLike extends PureComponent {
  state = {
    count: 0,
    bouncy: false,
    userLike: false
  }

  componentDidMount() {
    this.updateLikes();
  }

  updateLikes = async () => {
    const res = await getLikes(this.props.url, this.props.token);
    this.handleLikeResponse(res);
  }

  handleClick = async () => {
    this.setState({ bouncy: false });

    setTimeout(() => {
      this.setState({ bouncy: true });
    }, 1);

    const res = await likeDetail(this.props.url, this.props.token);
    this.handleLikeResponse(res);
  }

  handleLikeResponse = (res) => {
    if (typeof res.likes !== 'undefined' && typeof res.user_has_liked !== 'undefined' && !res.error) {
      this.setState({
        count: res.likes,
        userLike: res.user_has_liked
      });
    }
  }

  render() {
    const { token, itemType = 'Planung' } = this.props;
    const { userLike, count, bouncy } = this.state;

    const label = token ?
      <Label>{userLike ? `Diese ${itemType} gefällt mir` : `Gefällt dir die ${itemType}?`}</Label> :
      <Label>Um eine {itemType} zu liken, musst du <Link to={config.routes.login}>eingeloggt sein</Link>.</Label>;

    return (
      <LikeButtonWrapper>
        <Label bold>{count}</Label>
        <LikeButton
          isLiked={userLike}
          disabled={!token}
          onClick={this.handleClick}
          bouncy={bouncy}
        >
          <HeartIcon />
        </LikeButton>
        {label}
      </LikeButtonWrapper>
    );
  }
}

export default ProjectLike;
