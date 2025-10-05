import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainMenu from './pages/MainMenu.jsx'
import Site from './pages/Site.jsx'
import Visualizer from './pages/Visualizer.jsx'
import Images from './pages/Images.jsx'
import WelcomePage from './pages/Home.jsx'
import James from './pages/James.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/james" element={<James />} />
        <Route path="/site/:siteId" element={<Site />} />
        <Route path="/visualizer/:imageId" element={<Visualizer />} />'
        <Route path="/images" element={<Images />} />'
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
