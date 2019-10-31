import React from 'react';
import { connect } from 'react-redux';
import Button from '~/components/Button';

const Share = ({ isAgbAccepted }) => (
  <>
    <h1>Hier kannst du die Umfrage teilen</h1>
    <div>
      <Button disabled={!isAgbAccepted}>Einfach super!</Button>
    </div>
  </>
);

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Share);
