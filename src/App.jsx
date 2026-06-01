import { Routes, Route, useEffect, useState } from 'react-router-dom';
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

const API = import.meta.env.VITE_API_URL;

function Home() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    fetch(`${API}/portfolio/all`, { signal: controller.signal })
      .then(r => {
        if (!r.ok) throw new Error('Failed');
        return r.json();
      })
      .then(d => { setPortfolio(d); setLoading(false); })
      .catch(err => {
        if (err.name === 'AbortError') return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  if (loading) return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        background: '#000',
        color: '#7855f7',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
      }}>
        <div style={{
          width: 32,
          height: 32,
          border: '2px solid rgba(120,85,247,0.2)',
          borderTopColor: '#7855f7',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        Loading portfolio…
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </>
  );

  if (error) return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        background: '#000',
        color: '#a78bdb',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
      }}>
        <p>Failed to load portfolio.</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '0.5rem 1.25rem',
            background: 'rgba(120,85,247,0.15)',
            border: '1px solid rgba(120,85,247,0.4)',
            borderRadius: '0.5rem',
            color: '#7855f7',
            cursor: 'pointer',
            fontFamily: 'monospace',
          }}
        >
          Retry
        </button>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <LandingPage />
      <About />
      <Service      data={portfolio?.experience   || []} />
      <Skills       data={portfolio?.skills        || {}} />
      <Projects     data={portfolio?.projects      || []} />
      <Achievements data={portfolio?.achievements  || []} />
      <Publications data={portfolio?.publications  || []} />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/"      element={<ChatBot />}    />
      <Route path="/home"  element={<Home />}        />
      <Route path="/admin" element={<AdminPanel />}  />
    </Routes>
  );
}

export default App;