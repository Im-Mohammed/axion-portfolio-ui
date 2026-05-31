import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { LandingPage } from './components/landingpage';
import { About } from './components/About/about';
import { Navbar } from './components/Navbar/navbar';
import { Skills } from './components/skills/skills';
import { Service } from './components/Service/Service';
import { Projects } from './components/projects/projects';
import { Achievements } from './components/achievements/achievements';
import { Publications } from './components/publications/publications';
import { Contact } from './components/Contact/Contact';
import AdminPanel from './components/admin/AdminPanel';
import ChatBot from './components/Chatbot/Chatbot';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatBot />} />

      <Route path="/home" element={
        <>
          <Navbar />
          <LandingPage />
          <About />
          <Service />
          <Skills />
          <Projects />
          <Achievements />
          <Publications />
          <Contact />
        </>
      } />

      {/* No link anywhere — only accessible by typing /admin in the URL */}
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;