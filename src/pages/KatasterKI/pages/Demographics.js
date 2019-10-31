import React from 'react';
import { connect } from 'react-redux';
import Button from '~/components/Button';

const Demographics = ({ demographics }) => (
  <>
    <h1>Soziodemografische Fragen</h1>
    <div>
      <Button>Weiter</Button>
    </div>
  </>
);

const mapStateToProps = (state) => ({
  demographics: state.KatasterKI.demographics
});

export default connect(mapStateToProps)(Demographics);
