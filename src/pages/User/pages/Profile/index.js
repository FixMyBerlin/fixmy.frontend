import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import Profile from './tabs/Profile';
import UserLikes from './tabs/UserLikes';

class ProfileTabs extends PureComponent {
  render() {
    return (
      <ContentPageWrapper>
        <Tabs>
          <TabList>
            <Tab>Profil</Tab>
            <Tab>Likes</Tab>
          </TabList>

          <TabPanel>
            <Profile {...this.props} />
          </TabPanel>
          <TabPanel>
            <UserLikes
              dispatch={this.props.dispatch}
              userLikes={this.props.userLikes}
              isLoading={this.props.isLoading}
            />
          </TabPanel>
        </Tabs>
      </ContentPageWrapper>
    );
  }
}

export default connect((state) => state.UserState)(ProfileTabs);
