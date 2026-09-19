//import { useState } from 'react'
import Chapters from './routes/chapters'
import Explore from './routes/explore'
import Home from './routes/home'
import People from './routes/people'
import Myprofile from './routes/myprofile/myprofile'
import Navigationbar from './components/navigationbar'
import Sponsors from './routes/sponsors'
import { Routes, Route } from 'react-router-dom';

//import ReactDOM from 'react-dom';


export default function Routing(){


    return (
    <>
      
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people" element={<People />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/myprofile" element={<Myprofile />} />
        <Route path="/sponsors" element={<Sponsors />} />
      </Routes>
    </>
  )
}