import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Text from '~/components/Text';
import Title from '~/components/Title';
import { ProjectList } from '~/components2/ProjectList';
import { loadLikes } from '~/pages/User/UserState';

const StyledProjectList = styled(ProjectList)`
  margin-top: 1em;
`;

class UserLikes extends PureComponent {
  componentDidMount() {
    this.props.dispatch(loadLikes('reports'));
  }

  render() {
    return (
      <>
        <Title>Likes</Title>
        <Text>Hier siehst du Meldungen, denen du einen Like gegeben hast.</Text>

        <StyledProjectList
          data={this.props.userLikes || []}
          isLoading={this.props.isLoading}
          itemType="reports"
        />
      </>
    );
  }
}

export default UserLikes;
