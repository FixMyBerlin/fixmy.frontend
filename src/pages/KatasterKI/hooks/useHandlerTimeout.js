import { useState } from 'react';

export default (handler = () => {}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      handler();
    }, config.katasterKI.buttonTimeout);
  };

  return [isLoading, onClick];
};
