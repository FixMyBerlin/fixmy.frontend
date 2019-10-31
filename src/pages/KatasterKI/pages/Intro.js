import React from 'react';
import { connect } from 'react-redux';
import Button from '~/components/Button';

const Intro = ({ intro }) => (
  <>
    <h1>Eingangsfragen</h1>
    <div>
      <Button>Einfach super!</Button>
    </div>
  </>
);

const mapStateToProps = (state) => ({ intro: state.katasterKI.intro });

export default connect(mapStateToProps)(Intro);
