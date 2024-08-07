// App.js
import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles.css';

import Home from './pages/home';
import HomeMobile from './pages/home_mobile';
import TrainFlood from './pages/trainflood';
import Past from './pages/past';
import Header from './components/Header';
import HeaderMobile from './components/HeaderMobile';
import BlogPage from './pages/BlogPage';
import NotFound from './pages/404notfound';
import Mobile from './pages/Mobile';
import TrainFloodMobile from './pages/TrainFloodMobile';
import { useNavigate } from 'react-router-dom';
import About from './pages/about';
import AboutMobile from './pages/aboutmobile';
import { use } from 'i18next';
import Tweet from './pages/tweet';
import TweetMobile from './pages/tweetMobile';

function App() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 650);
  const [warningpopup, setWarningPopup] = React.useState(true);

  useEffect(() => {
    localStorage.setItem('selectedTab', 1);
  }, []);

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
          {/* {WarningPopupMobile && <span className="absolute w-1/2 right-2 bottom-6 z-0"><WarningPopupMobile /></span>} */}
          <Routes>
            <Route path="/" element={<HomeMobile />} />
            <Route path="/warning" element={<HomeMobile warningtab={3} />} />
            <Route path="/train" element={<TrainFloodMobile />} />
            <Route path='/tweet' element={<TweetMobile />} />
            <Route path="/about" element={<AboutMobile />} />
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
            <Route path="/warning" element={<Home warningtab={3} />} />
            <Route path="/train" element={<TrainFlood />} />
            <Route path="/tweet" element={<Tweet/>} />
            <Route path="/about" element={<About />} />
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


const WarningPopup = () => {
  const Navigate = useNavigate();
  const handleclick = () => {
    localStorage.setItem('selectedTab', 3);
    Navigate('/warning');
    window.location.reload();
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
  const Navigate = useNavigate();
  const handleclick = () => {
    localStorage.setItem('selectedTab', 3);
    Navigate('/warning');
    window.location.reload();
  };

  return (
    <div className="fixed bottom-16 right-0 w-1/2 mt-6 mr-7 z-50">
      <div className='flex flex-col text-center'>
        <button className="zigzag-button alert-button" onClick={handleclick}>
          Report Flood in your Area!
        </button>
      </div>
    </div>
  );
};