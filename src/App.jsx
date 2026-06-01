import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCached, setCache } from './portfolioCache';
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
  const cached                    = getCached();
  const [portfolio, setPortfolio] = useState(cached?.data || null);
  const [loading, setLoading]     = useState(!cached?.data);
  const [revalidating, setRevalidating] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const cached     = getCached();

    if (cached?.data && !cached.stale) {
      // Cache is fresh — use it, revalidate silently in background
      setPortfolio(cached.data);
      setLoading(false);
      setRevalidating(true);
    } else if (cached?.data && cached.stale) {
      // Cache is stale — show it immediately, fetch fresh in background
      setPortfolio(cached.data);
      setLoading(false);
      setRevalidating(true);
    }
    // If no cache — show loading spinner, fetch fresh

    fetch(`${API}/portfolio/all`, { signal: controller.signal })
      .then(r => {
        if (!r.ok) throw new Error('Failed');
        return r.json();
      })
      .then(data => {
        setCache(data);           // update cache
        setPortfolio(data);       // update UI silently if already showing
        setLoading(false);        // stop spinner if was loading
        setRevalidating(false);   // stop background revalidation indicator
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        // If fetch fails but we have cache — keep showing cache
        if (!portfolio) {
          setLoading(false);
        }
        setRevalidating(false);
      });

    return () => controller.abort();
  }, []);

  // Only show full loading spinner if no cache at all
  if (loading && !portfolio) return (
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
          width: 32, height: 32,
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

  return (
    <>
      <Navbar />

      {/* Subtle revalidating indicator — doesn't block content */}
      {revalidating && (
        <div style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 0.8rem',
          background: 'rgba(120,85,247,0.15)',
          border: '1px solid rgba(120,85,247,0.3)',
          borderRadius: '2rem',
          color: '#7855f7',
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          zIndex: 9999,
        }}>
          <div style={{
            width: 8, height: 8,
            border: '1px solid rgba(120,85,247,0.3)',
            borderTopColor: '#7855f7',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          Syncing…
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

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
      <Route path="/"      element={<ChatBot />}   />
      <Route path="/home"  element={<Home />}       />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;