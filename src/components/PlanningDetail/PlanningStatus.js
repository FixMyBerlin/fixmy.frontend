import React, { PureComponent } from 'react';
import { If } from 'react-extras';

import PlanningStatusChart from './PlanningStatusChart';
import PlanningChecklist from './PlanningChecklist';

class PlanningStatus extends PureComponent {
  state = {
    isExpanded: false
  }

  toggleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    return (
      <div>
        <PlanningStatusChart phase={this.props.phase} />
        <button onClick={this.toggleExpand}>Details</button>
        <If condition={this.state.isExpanded}>
          <PlanningChecklist />
        </If>
      </div>
    );
  }
}

export default PlanningStatus;
