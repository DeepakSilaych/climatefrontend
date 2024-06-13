// App.js
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles.css';

import Home from './pages/home';
import HomeMobile from './pages/home_mobile';
import TrainFlood from './pages/trainflood';
import Past from './pages/past';
import Header from './components/Header';
import HeaderMobile from './components/HeaderMobile';
import WhoWeAre from './pages/whoweare';
import BlogPage from './pages/BlogPage';
import NotFound from './pages/404notfound';
import Mobile from './pages/Mobile';
import WhoWeAreMobile from './pages/WhoWeAreMobile';
import TrainFloodMobile from './pages/TrainFloodMobile';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 650);
  const [warningpopup, setWarningPopup] = React.useState(true);

  const WarningPopup = () => {
    const Navigate = useNavigate();
    const handleclick = () => {
      localStorage.setItem('selectedTab', 3);
      window.location.reload();
      Navigate('/');
    };
    
    return (
      <div className="fixed top-16 right-0 w-1/6 mt-6 mr-7 z-50">
        <div className='flex flex-col text-center'>
          <button className="zigzag-button alert-button" onClick={handleclick}>
            Report Flood in your Area!
          </button>
        </div>
      </div>
    );
  };

  const WarningPopupMobile = () => {
    return (
      <div className="fixed bottom-16 right-0 w-1/2 mt-6 mr-7 z-50">
        
      </div>
    );
  };

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 650);
    });
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-300 overflow-x-hidden">
      {isMobile ? (
        <BrowserRouter>
          <HeaderMobile />
          {warningpopup && <span className="absolute w-1/2 right-2 bottom-6 z-0"><WarningPopupMobile /></span>}
          <Routes>
            <Route path="/" element={<HomeMobile />} />
            <Route path="/train" element={<TrainFloodMobile />} />
            <Route path="/about" element={<WhoWeAreMobile />} />
            <Route path="/past" element={<Past />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Header />
          {warningpopup && <span className="absolute w-1/2 right-2 bottom-6 z-20"><WarningPopup /></span>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/train" element={<TrainFlood />} />
            <Route path="/about" element={<WhoWeAre />} />
            <Route path="/past" element={<Past />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
