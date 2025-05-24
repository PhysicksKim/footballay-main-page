import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@src/components/layout/Layout';
import ErrorRedirect from '@src/components/error/ErrorRedirect';
import MainPage from '@src/pages/MainPage';
import DownloadPage from '@src/pages/DownloadPage';
import LicensePage from '@src/pages/LicensePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorRedirect />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'download',
        element: <DownloadPage />,
      },
      {
        path: 'license',
        element: <LicensePage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
