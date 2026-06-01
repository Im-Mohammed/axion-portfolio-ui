import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getCached, setCache } from './portfolioCache';
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

// ── Sync badge ─────────────────────────────────────────────────────────────
const SyncBadge = () => (
  <>
    <style>{`
      @keyframes _spin2 { to { transform: rotate(360deg); } }
      .sync-badge {
        position: fixed;
        bottom: 1.25rem; right: 1.25rem;
        display: flex; align-items: center; gap: 0.45rem;
        padding: 0.35rem 0.75rem;
        background: rgba(120,85,247,0.12);
        border: 1px solid rgba(120,85,247,0.25);
        border-radius: 2rem;
        color: #7855f7;
        font-family: monospace;
        font-size: 0.68rem;
        z-index: 9999;
        pointer-events: none;
      }
      .sync-dot {
        width: 8px; height: 8px;
        border: 1px solid rgba(120,85,247,0.3);
        border-top-color: #7855f7;
        border-radius: 50%;
        animation: _spin2 0.8s linear infinite;
      }
    `}</style>
    <div className="sync-badge">
      <div className="sync-dot" />
      Syncing…
    </div>
  </>
);

// ── Inline spinner for data sections ──────────────────────────────────────
const DataSpinner = () => (
  <>
    <style>{`
      @keyframes _spin { to { transform: rotate(360deg); } }
      .data-spinner {
        width: 28px; height: 28px;
        border: 2px solid rgba(120,85,247,0.2);
        border-top-color: #7855f7;
        border-radius: 50%;
        animation: _spin 0.8s linear infinite;
      }
    `}</style>
    <div style={{
      minHeight: '40vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      background: '#000',
      color: '#7855f7',
      fontFamily: 'monospace',
      fontSize: '0.82rem',
    }}>
      <div className="data-spinner" />
      Loading…
    </div>
  </>
);

// ── Home ───────────────────────────────────────────────────────────────────
function Home() {
  const cached = getCached();

  const [portfolio, setPortfolio]       = useState(cached?.data || null);
  const [loading, setLoading]           = useState(!cached?.data);
  const [revalidating, setRevalidating] = useState(!!cached?.data);
  const mountedRef                      = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const controller   = new AbortController();
    const cached       = getCached();

    if (cached?.data) {
      if (mountedRef.current) {
        setPortfolio(cached.data);
        setLoading(false);
        setRevalidating(true);
      }
    }

    fetch(`${API}/portfolio/all`, { signal: controller.signal })
      .then(r => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then(data => {
        if (!mountedRef.current) return;
        setCache(data);
        // Only update state if data actually changed — prevents unnecessary re-renders
        setPortfolio(prev =>
          JSON.stringify(prev) === JSON.stringify(data) ? prev : data
        );
        setLoading(false);
        setRevalidating(false);
      })
      .catch(err => {
        if (!mountedRef.current) return;
        if (err.name === 'AbortError') return;
        if (mountedRef.current) {
          setLoading(false);
          setRevalidating(false);
        }
      });

    return () => {
      mountedRef.current = false;
      controller.abort();
    };
  }, []);

  // ── CRITICAL: LandingPage is ALWAYS rendered first ─────────────────────
  // It must never be inside a conditional — Spline/WebGL context is lost
  // when the component unmounts. memo() only works if it stays in the tree.
return (
  <>
    <Navbar />
    {revalidating && <SyncBadge />}

    {loading && !portfolio ? (
      <>
        <LandingPage />
        <DataSpinner />
      </>
    ) : !portfolio ? (
      <>
        <LandingPage />
        <div style={{
          minHeight: '40vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '1rem', background: '#000',
          color: '#a78bdb', fontFamily: 'monospace', fontSize: '0.85rem',
        }}>
          <p>Could not load portfolio data.</p>
          <button onClick={() => window.location.reload()} style={{
            padding: '0.5rem 1.25rem',
            background: 'rgba(120,85,247,0.12)',
            border: '1px solid rgba(120,85,247,0.35)',
            borderRadius: '0.5rem', color: '#7855f7',
            cursor: 'pointer', fontFamily: 'monospace', fontSize: '0.82rem',
          }}>Retry</button>
        </div>
      </>
    ) : (
      <>
        <LandingPage />
        <About        data={portfolio?.about} />
        <Service      data={portfolio?.experience   || []} />
        <Skills       data={portfolio?.skills        || {}} />
        <Projects     data={portfolio?.projects      || []} />
        <Achievements data={portfolio?.achievements  || []} />
        <Publications data={portfolio?.publications  || []} />
        <Contact />
      </>
    )}
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