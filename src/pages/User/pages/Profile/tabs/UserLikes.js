import React, { PureComponent, Fragment } from 'react';
import idx from 'idx';

import Title from '~/components/Title';
import Text from '~/components/Text';
import { loadLikes } from '~/pages/User/UserState';
import PlanningList from '~/components/PlanningList';
import Select from '~/components/Select';

class UserLikes extends PureComponent {
  state = {
    itemType: 'plannings'
  };

  componentDidMount() {
    this.props.dispatch(loadLikes(this.state.itemType));
  }

  onSelect(evt) {
    const itemType = idx(evt, (_) => _.target.selectedOptions[0].value);

    this.setState({ itemType });
    this.props.dispatch(loadLikes(itemType));
  }

  render() {
    return (
      <Fragment>
        <Title>Likes</Title>
        <Text>
          Hier kannst du deine gelikten Planungen und Meldungen sehen.
        </Text>

        <Select
          title=""
          onChange={(val) => this.onSelect(val)}
          options={[
            {
              value: 'plannings',
              label: 'Planungen'
            },
            {
              value: 'reports',
              label: 'Meldungen'
            }
          ]}
          disabled={this.props.isLoading}
        />

        <PlanningList
          data={this.props.userLikes || []}
          isLoading={this.props.isLoading}
          itemType={this.state.itemType}
        />
      </Fragment>
    );
  }
}

export default UserLikes;
