import React, { PureComponent } from 'react';
import ErrorMessage from '../ErrorMessage';

class ReportSubmitted extends PureComponent {
  render() {
    const { error } = this.props;
    if (error && error.message) return <ErrorMessage message={error.message} />;

    return (
      <div>
        <h1>DONE!</h1>
        <p>Working on the component..</p>
      </div>
    );
  }
}

export default ReportSubmitted;
