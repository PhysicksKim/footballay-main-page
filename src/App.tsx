import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import '@src/styles/App.scss';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
