import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="home">
    <Link to="/map"><button>guck dir die Karte an</button></Link>
    <Link to="/fix"><button>melde einen Fix</button></Link>
    <Link to="/about">Worum geht es hier genau?</Link>
  </div>
);
