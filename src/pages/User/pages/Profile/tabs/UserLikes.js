import React, { PureComponent } from 'react';
import idx from 'idx';
import styled from 'styled-components';

import Title from '~/components/Title';
import Text from '~/components/Text';
import { loadLikes } from '~/pages/User/UserState';
import ProjectList from '~/components/ProjectList';
import Select from '~/components/Select';

const StyledSelect = styled(Select)`
  margin-bottom: 1.5em;
`;

class UserLikes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      itemType: 'projects'
    };
  }

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
      <>
        <Title>Likes</Title>
        <Text>
          Hier kannst du Planungen und Meldungen sehen, denen du einen Like
          gegeben hast.
        </Text>

        <StyledSelect
          title=""
          onChange={(val) => this.onSelect(val)}
          options={[
            {
              value: 'projects',
              label: 'Planungen'
            },
            {
              value: 'reports',
              label: 'Meldungen'
            }
          ]}
          disabled={this.props.isLoading}
        />

        <ProjectList
          data={this.props.userLikes || []}
          isLoading={this.props.isLoading}
          itemType={this.state.itemType}
        />
      </>
    );
  }
}

export default UserLikes;
