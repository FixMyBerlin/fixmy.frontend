import React from 'react';
import { connect } from 'react-redux';
import Button from '~/components/Button';

const Landing = ({ isAgbAccepted }) => (
  <>
    <h1>Wie empfinden Sie den Verkehr in Berlin insgesamt?</h1>
    <div>
      <Button disabled={!isAgbAccepted}>Einfach super!</Button>
    </div>
  </>
);

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Landing);
