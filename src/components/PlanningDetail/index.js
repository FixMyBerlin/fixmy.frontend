import React, { PureComponent } from 'react';

import detailWrapped from '~/hocs/detailWrapped';

class PlanningDetails extends PureComponent {
  render() {
    const { data } = this.props;
    const { title } = data;

    return (
      <React.Fragment>
        { title }
      </React.Fragment>
    );
  }
}

export default detailWrapped(PlanningDetails);
