import React from 'react';
import { Link } from 'react-router-dom';
import TopSection from '~/pages/Reports/components/Landing/TopSection';

export default () => (
  <div>
    <TopSection />

    <Link to="/meldungen/wo">Zur Karte</Link>
  </div>
);
