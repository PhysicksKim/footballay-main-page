import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@src/components/layout/Header';
import Footer from '@src/components/layout/Footer';
import MainPage from '@src/pages/MainPage';
import DownloadPage from '@src/pages/DownloadPage';
import LicensePage from '@src/pages/LicensePage';
import '@src/styles/App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="main-intro-container">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/license" element={<LicensePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
