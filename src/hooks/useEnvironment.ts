/* eslint-disable no-undef */
import { useMemo } from 'react';

export const useEnvironment = () => {
  const isDevelopment = useMemo(() => {
    return process.env.NODE_ENV === 'development';
  }, []);

  return {
    isDevelopment,
    isProduction: !isDevelopment,
  };
};
