import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import ProjectListItem from '~/components/ProjectListItem';
import ReportListItem from '~/components/ReportListItem';
import DotLoader from '~/components/DotLoader';

class ProjectList extends PureComponent {
  render() {
    const isProjects = this.props.itemType === 'projects';

    if (this.props.isLoading && this.props.showLoadingIndicator) {
      return <DotLoader />;
    }

    if (!this.props.isLoading && this.props.data.length === 0) {
      return (
        <p>
          Du hast noch keine {isProjects ? 'Planungen' : 'Meldungen'} geliked.
        </p>
      );
    }

    const Item = isProjects ? ProjectListItem : ReportListItem;
    const listItems = this.props.data.map((d) => (
      <Item key={d.url} history={this.props.history} {...d} />
    ));

    return <span>{listItems}</span>;
  }
}

ProjectList.defaultProps = {
  showLoadingIndicator: true,
  itemType: 'projects'
};

export default withRouter(ProjectList);
