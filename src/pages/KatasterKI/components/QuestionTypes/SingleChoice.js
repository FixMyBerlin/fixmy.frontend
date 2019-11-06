import React from 'react';

import history from '~/history';
import GhostButton from '~/pages/KatasterKI/components/GhostButton';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';

const SingleChoiceInput = ({
  title,
  options,
  currentValue,
  handleChange,
  next
}) => {
  const onClick = (option) => {
    handleChange(option.value);
    next();
  };

  console.log(currentValue);

  return (
    <>
      <QuestionTitle>{title}</QuestionTitle>
      {options.map((option) => (
        <GhostButton
          key={`singlechoice__${option.value}`}
          onClick={() => onClick(option)}
          css={{ textAlign: 'left', marginBottom: 10 }}
          isActive={option.value === currentValue}
        >
          {option.label}
        </GhostButton>
      ))}
    </>
  );
};

export default SingleChoiceInput;
