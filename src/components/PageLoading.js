import React from 'react';

const Loader = ({ pastDelay, error }) => {
  if (error) {
    if (config.debug) console.error(error);
    return (
      <p>
        <span role="img" aria-label="sick face emoji">
          🤕
        </span>{' '}
        Ups, da ist etwas schiefgegangen: {error}
      </p>
    );
  }
  if (pastDelay)
    return (
      <h2>
        <span role="img" aria-label="robot">
          🤖
        </span>{' '}
        Computer arbeitet...
      </h2>
    );
  return null;
};

export default Loader;
