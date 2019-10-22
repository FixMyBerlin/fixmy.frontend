import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import ProjectListItem from '~/components/ProjectListItem';
import ReportListItem from '~/components/ReportListItem';
import DotLoader from '~/components/DotLoader';

class ProjectList extends PureComponent {
  static defaultProps = {
    showLoadingIndicator: true,
    itemType: 'projects'
  };

  render() {
    const isProjects = this.props.itemType === 'projects';

    if (this.props.isLoading && this.props.showLoadingIndicator) {
      return <DotLoader />;
    }

    if (!this.props.isLoading && this.props.data.length === 0) {
      return `Es sind noch keine ${
        isProjects ? 'Planungen' : 'Meldungen'
      } gelikt worden.`;
    }

    const Item = isProjects ? ProjectListItem : ReportListItem;

    return this.props.data.map((d) => (
      <Item key={d.url} history={this.props.history} {...d} />
    ));
  }
}

export default withRouter(ProjectList);
