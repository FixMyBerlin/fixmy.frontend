import React, { PureComponent } from 'react';
import withRouter from 'react-router/withRouter';

import PlanningListItem from '~/components/PlanningListItem';
import DotLoader from '~/components/DotLoader';

class PlanningList extends PureComponent {
  static defaultProps = {
    showLoadingIndicator: true
  }

  render() {
    if (this.props.isLoading && this.props.showLoadingIndicator) {
      return <DotLoader />;
    }

    if (!this.props.isLoading && this.props.data.length === 0) {
      return 'Es sind keine Planungen gelikt worden.';
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
