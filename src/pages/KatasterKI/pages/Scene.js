import React from 'react';
import { connect } from 'react-redux';
import Button from '~/components/Button';

const Rating = ({ isAgbAccepted }) => (
  <>
    <h1>Wie sicher empfinden Sie diese Situation?</h1>
    <div>
      <Button disabled={!isAgbAccepted}>Einfach super!</Button>
    </div>
  </>
);

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Rating);
