import { useEffect } from 'react';
import { Navigate, useRouteError } from 'react-router-dom';

const ErrorRedirect = () => {
  const error = useRouteError();

  useEffect(() => {
    // 개발 환경에서만 에러 로그 출력
    if (import.meta.env.DEV) {
      console.error('Router Error:', error);
    }
  }, [error]);

  // 즉시 인덱스 페이지로 리다이렉트
  return <Navigate to="/" replace />;
};

export default ErrorRedirect;
