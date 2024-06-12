// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 650);
  const [warningpopup, setWarningPopup] = React.useState(true);

  const WarningPopup = () => {
    return (
      <div className="fixed bottom-1 right-0 w-1/3 mt-6 mr-7 z-50">
        <div className="bg-yellow-100 border border-red-400 text-red-700 px-2 py-3 rounded relative">
          
            <strong className="font-bold blinking-text ${isMobile ? 'w-screen' : ''}`">Fill this form and Report Flood in your area!</strong>
          
          <span className="absolute top-0 bottom-0 right-0 px-0.5 py-3" onClick={() => setWarningPopup(false)}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      </div>
    );
  };

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 650);
    });
  }, []);

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      {isMobile ? (
        <BrowserRouter>
          {isMobile ? <HeaderMobile /> : <Header />}
          {warningpopup && <span className="absolute w-1/2 right-2 bottom-6 z-20"><WarningPopup /></span>}
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

