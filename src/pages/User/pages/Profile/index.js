import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

import 'react-tabs/style/react-tabs.css';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import config from '~/config';

import Profile from './tabs/Profile';
import ReportLikes from './tabs/ReportLikes';
import UserLikes from './tabs/UserLikes';

const StyledTabs = styled(Tabs)`
  margin-top: 1em;
`;

class ProfileTabs extends PureComponent {
  render() {
    return (
      <ContentPageWrapper>
        <StyledTabs>
          <TabList>
            <Tab>Profil</Tab>
            <Tab>Likes</Tab>
          </TabList>

          <TabPanel>
            <Profile {...this.props} />
          </TabPanel>
          <TabPanel>
            {config.region === 'aachen' ? (
              <ReportLikes
                dispatch={this.props.dispatch}
                userLikes={this.props.userLikes}
                isLoading={this.props.isLoading}
              />
            ) : (
              <UserLikes
                dispatch={this.props.dispatch}
                userLikes={this.props.userLikes}
                isLoading={this.props.isLoading}
              />
            )}
          </TabPanel>
        </StyledTabs>
      </ContentPageWrapper>
    );
  }
}

export default connect((state) => state.UserState)(ProfileTabs);
