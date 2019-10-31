import React from 'react';
import { connect } from 'react-redux';
import Store from '~/store';
import history from '~/history';
import { setAGBAccepted } from '../state';
import Button from '~/components/Button';

const onAcceptTOS = (ev) => Store.dispatch(setAGBAccepted(ev.target.checked));
const onStartSurvey = () =>
  history.push(config.routes.katasterKI.introQuestions);

const Landing = ({ isAgbAccepted }) => (
  <>
    <h1>Der Straßencheck für Berlin</h1>
    <p>Hier wird die Umfrage vorgestellt</p>
    <input type="checkbox" checked={isAgbAccepted} onChange={onAcceptTOS} /> Ich
    habe die Datenschutzerklärung gelesen und stimme ihr zu
    <div>
      <Button disabled={!isAgbAccepted} onClick={onStartSurvey}>
        Umfrage beginnen
      </Button>
    </div>
  </>
);

const mapStateToProps = (state) => ({
  isAgbAccepted: state.KatasterKIState.isAgbAccepted
});

export default connect(mapStateToProps)(Landing);
