import React, { PureComponent } from 'react';
import withRouter from 'react-router/withRouter';

import PlanningListItem from '~/pages/Analysis/components/PlanningListItem';

class PlanningList extends PureComponent {
  render() {
    if (this.props.isLoading || this.props.data.length === 0) {
      return null;
    }

    return (
      this.props.data.map(d => (
        <PlanningListItem
          key={d.url}
          history={this.props.history}
          {...d}
        />
      ))
    );
  }
}

export default withRouter(PlanningList);
