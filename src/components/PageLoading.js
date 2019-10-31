import React from 'react';

const Loader = ({ pastDelay, error }) => {
  if (error) {
    if (config.debug) console.error(error);
    return <p>Ups, da ist etwas schiefgegangen.</p>;
  }
  if (pastDelay) return <h2>Loading...</h2>;
  return null;
};

export default Loader;
