import { useState, useEffect } from 'react'
import Chapters from './routes/chapters'
import Explore from './routes/explore'
import Home from './routes/home'
import People from './routes/people'
import Myprofile from './routes/myprofile/myprofile'
import Topbar from './components/topbar'
import Sidebar from './components/sidebar'
import Sponsors from './routes/sponsors'
import { Routes, Route, useLocation } from 'react-router-dom';

//import ReactDOM from 'react-dom';

export default function Routing(){
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  // Scroll to top when any page is opened / route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Topbar
        sidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(prev => !prev)}
      />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/chapters" element={<Chapters />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/sponsors" element={<Sponsors />} />
        </Routes>
      </main>
    </>
  )
}