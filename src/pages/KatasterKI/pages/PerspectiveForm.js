import React from 'react';
import { connect } from 'react-redux';
import Button from '~/components/Button';

const PerspectiveForm = ({ transportRating }) => (
  <>
    <h1>Bewertung der Transportarten</h1>
    <div>
      <Button disabled={!isAgbAccepted}>Einfach super!</Button>
    </div>
  </>
);

const mapStateToProps = (state) => ({
  transportRating: state.katasterKI.transportRating
});

export default connect(mapStateToProps)(PerspectiveForm);
