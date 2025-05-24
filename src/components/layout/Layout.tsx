import { Outlet } from 'react-router-dom';
import Header from '@src/components/layout/Header';
import Footer from '@src/components/layout/Footer';

const Layout = () => {
  return (
    <div className="main-intro-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
