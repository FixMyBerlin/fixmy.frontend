import { useState } from 'react';
import config from '~/pages/KatasterKI/config';

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
