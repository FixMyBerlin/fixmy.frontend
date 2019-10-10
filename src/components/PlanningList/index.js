import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import PlanningListItem from '~/components/PlanningListItem';
import ReportListItem from '~/components/ReportListItem';
import DotLoader from '~/components/DotLoader';

class PlanningList extends PureComponent {
  static defaultProps = {
    showLoadingIndicator: true,
    itemType: 'plannings'
  };

  render() {
    const isPlanning = this.props.itemType === 'plannings';

    if (this.props.isLoading && this.props.showLoadingIndicator) {
      return <DotLoader />;
    }

    if (!this.props.isLoading && this.props.data.length === 0) {
      return `Es sind noch keine ${
        isPlanning ? 'Planungen' : 'Meldungen'
      } gelikt worden.`;
    }

    const Item = isPlanning ? PlanningListItem : ReportListItem;

    return this.props.data.map((d) => (
      <Item key={d.url} history={this.props.history} {...d} />
    ));
  }
}

export default withRouter(PlanningList);
