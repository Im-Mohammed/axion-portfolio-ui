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
import ChatBot from './components/Chatbot/Chatbot'; // Make sure this path matches your folder structure
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        {/* 👇 ChatBot is now the default landing page */}
        <Route path="/" element={<ChatBot />} />

        {/* 👇 Full portfolio moved to /home */}
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
      </Routes>
    </>
  );
}

export default App;
