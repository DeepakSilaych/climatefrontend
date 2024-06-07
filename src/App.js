import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/home'
import TrainFlood from './pages/trainflood'
import Past from './pages/past'
import Header from './components/Header'
import WhoWeAre from './pages/whoweare'
import BlogPage from './pages/BlogPage'
import NotFound from './pages/404notfound'
import Mobile from './pages/Mobile'

function App() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 650);

  React.useEffect(() => {
      window.addEventListener('resize', () => {
          setIsMobile(window.innerWidth < 650);
      });
  }, []);
  return (
    <>
      {
        isMobile 
        ?
          <Mobile /> 
        :
          <BrowserRouter>
            <Header /> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/train' element={<TrainFlood />} />
              <Route path='/about' element={<WhoWeAre />} />
              <Route path='/past' element={<Past />} />
              <Route path='/blog' element={<BlogPage />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
      }
    </>
  )
}

export default App
