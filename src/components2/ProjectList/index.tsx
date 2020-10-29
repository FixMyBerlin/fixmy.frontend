import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import ProjectListItem from './ProjectListItem';
import ReportListItem from './ReportListItem';
import DotLoader from '~/components/DotLoader';

interface Props extends RouteComponentProps {
  showLoadingIndicator?: boolean;
  itemType?: 'projects' | 'reports';
  data: any[];
  isLoading: boolean;
}

const ProjectList = ({
  itemType = 'projects',
  showLoadingIndicator = true,
  data,
  isLoading,
  history
}: Props) => {
  const isProjects = itemType === 'projects';

  if (isLoading && showLoadingIndicator) {
    return <DotLoader />;
  }

  if (!isLoading && data.length === 0) {
    return (
      <p>
        Du hast noch keine {isProjects ? 'Planungen' : 'Meldungen'} geliked.
      </p>
    );
  }

  const Item = isProjects ? ProjectListItem : ReportListItem;
  const listItems = data.map((d) => (
    <Item key={d.url} history={history} {...d} />
  ));

  return <span>{listItems}</span>;
};

export default withRouter(ProjectList);
