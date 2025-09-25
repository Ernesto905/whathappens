import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import App from './App.tsx'
import Blog from './Blog.tsx'
import { Navbar } from './Navbar.tsx';

import './index.css'


const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
