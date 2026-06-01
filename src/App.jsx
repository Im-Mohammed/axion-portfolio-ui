import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { LandingPage }  from './components/landingpage';
import { About }        from './components/About/about';
import { Navbar }       from './components/Navbar/navbar';
import { Skills }       from './components/skills/skills';
import { Service }      from './components/Service/Service';
import { Projects }     from './components/projects/projects';
import { Achievements } from './components/achievements/achievements';
import { Publications } from './components/publications/publications';
import { Contact }      from './components/Contact/Contact';
import AdminPanel       from './components/admin/AdminPanel';
import ChatBot          from './components/Chatbot/Chatbot';
import './App.css';

const API = import.meta.env.VITE_API_URL;

// ── Full page loader ───────────────────────────────────────────────────────
const PageLoader = () => (
  <>
    <style>{`
      @keyframes _spin { to { transform: rotate(360deg); } }
      .page-loader {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.25rem;
        background: #000;
        color: #7855f7;
        font-family: monospace;
        font-size: 0.85rem;
      }
      .page-loader-spinner {
        width: 36px; height: 36px;
        border: 2px solid rgba(120,85,247,0.2);
        border-top-color: #7855f7;
        border-radius: 50%;
        animation: _spin 0.8s linear infinite;
      }
    `}</style>
    <div className="page-loader">
      <div className="page-loader-spinner" />
      Loading portfolio…
    </div>
  </>
);

// ── Home ───────────────────────────────────────────────────────────────────
function Home() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);
  const mountedRef                = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const controller   = new AbortController();

    setLoading(true);
    setError(false);

    fetch(`${API}/portfolio/all`, { signal: controller.signal })
      .then(r => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then(data => {
        if (!mountedRef.current) return;
        setPortfolio(data);
        setLoading(false);
      })
      .catch(err => {
        if (!mountedRef.current) return;
        if (err.name === 'AbortError') return;
        setError(true);
        setLoading(false);
      });

    return () => {
      mountedRef.current = false;
      controller.abort();
    };
  }, []);

  // Loading — show full page spinner
  if (loading) return (
    <>
      <Navbar />
      <PageLoader />
    </>
  );

  // Error — show retry
  if (error || !portfolio) return (
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
        fontSize: '0.85rem',
      }}>
        <p>Could not load portfolio data.</p>
        <button
          onClick={() => {
            setError(false);
            setLoading(true);
            setPortfolio(null);
          }}
          style={{
            padding: '0.5rem 1.25rem',
            background: 'rgba(120,85,247,0.12)',
            border: '1px solid rgba(120,85,247,0.35)',
            borderRadius: '0.5rem',
            color: '#7855f7',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '0.82rem',
          }}
        >
          Retry
        </button>
      </div>
    </>
  );

  // Data loaded — render everything
  return (
    <>
      <Navbar />
      <LandingPage />
      <About        data={portfolio?.about} />
      <Service      data={portfolio?.experience   || []} />
      <Skills       data={portfolio?.skills        || {}} />
      <Projects     data={portfolio?.projects      || []} />
      <Achievements data={portfolio?.achievements  || []} />
      <Publications data={portfolio?.publications  || []} />
      <Contact />
    </>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Routes>
      <Route path="/"      element={<ChatBot />}   />
      <Route path="/home"  element={<Home />}       />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;