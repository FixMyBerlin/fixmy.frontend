import React, { PureComponent, Fragment } from 'react';

import Title from '~/components/Title';
import Text from '~/components/Text';
import { loadLikes } from '~/pages/User/UserState';
import PlanningList from '~/components/PlanningList';

class UserLikes extends PureComponent {
  componentDidMount() {
    this.props.dispatch(loadLikes());
  }

  render() {
    return (
      <Fragment>
        <Title>Likes</Title>
        <Text>Hier kannst du deine gelikten Planungen sehen.</Text>
        <PlanningList
          data={this.props.userLikes || []}
          isLoading={this.props.isLoading}
        />
      </Fragment>
    );
  }
}

export default UserLikes;
