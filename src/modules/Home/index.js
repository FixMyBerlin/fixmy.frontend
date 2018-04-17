import React from 'react';
import { Link } from 'react-router-dom';

import './Home.styl';

export default () => (
  <div className="home app__content--overlay">
    <div className="home__content">
      <div className="logo__container">
        <img src="http://via.placeholder.com/80x100" alt="logo" />
      </div>
      <div className="intro__container">
        <h1>Hi, das ist FixMyBerlin</h1>
        <p className="text">Wir wollen, dass Berlin eine richtig gute Fahrradstadt wird. Hier siehst du, wie das gehen kann.</p>
      </div>
      <div className="button__container">
        <Link className="btn btn--secondary" to="/map">guck dir die Karte an</Link>
        <Link className="btn btn--primary" to="/fix">melde einen Fix</Link>
        <Link className="btn" to="/info">Worum geht es hier genau?</Link>
      </div>
    </div>
  </div>
);
