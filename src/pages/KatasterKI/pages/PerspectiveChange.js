import React from 'react';
import { connect } from 'react-redux';
import Button from '~/components/Button';

const PerspectiveChange = ({ perspective }) => (
  <>
    <h1>Perspektivwechsel</h1>
    <div>
      <Button>Weiter</Button>
    </div>
  </>
);

const mapStateToProps = (state) => ({
  perspective: state.katasterKI.perspective
});

export default connect(mapStateToProps)(PerspectiveChange);
