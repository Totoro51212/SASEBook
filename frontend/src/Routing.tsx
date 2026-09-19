import { useState } from 'react'
import Chapters from './routes/chapters'
import Explore from './routes/explore'
import Home from './routes/home'
import People from './routes/people'
import Navigationbar from './components/navigationbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';


export default function Routing(){


    return (
    <>
      <BrowserRouter>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people" element={<People />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}