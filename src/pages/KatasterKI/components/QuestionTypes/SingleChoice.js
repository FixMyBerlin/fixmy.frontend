import React from 'react';

import history from '~/history';
import GhostButton from '~/pages/KatasterKI/components/GhostButton';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';

export default (props) => {
  const onClick = (option) => {
    console.log('set store value', option.value);
    history.push(props.nextRoute);
  };

  return (
    <>
      <QuestionTitle>{props.title}</QuestionTitle>
      {props.options.map((option) => (
        <GhostButton
          key={`singlechioce__${option.value}`}
          onClick={() => onClick(option)}
          css={{ textAlign: 'left', marginBottom: 10 }}
        >
          {option.label}
        </GhostButton>
      ))}
    </>
  );
};
