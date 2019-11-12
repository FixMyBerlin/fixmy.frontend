import React from 'react';

import GhostButton from '~/pages/KatasterKI/components/GhostButton';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';

const PerspectiveChange = ({
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

export default PerspectiveChange;
