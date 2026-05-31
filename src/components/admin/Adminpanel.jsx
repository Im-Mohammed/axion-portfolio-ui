import { useState, useEffect } from 'react';
import { API }         from './adminUtils';
import OverviewTab     from './tabs/OverviewTab';
import VisitorsTab     from './tabs/VisitorsTab';
import PortfolioTab    from './tabs/PortfolioTab';
import './AdminPanel.css';

const TABS = ['Overview', 'Visitors', 'Portfolio'];

function useNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!username || !password) { setError('Both fields are required.'); return; }
    setLoading(true);
    setError('');
    try {
      const res  = await fetch(`${API}/admin/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.detail || 'Invalid credentials.'); return; }
      sessionStorage.setItem('admin_token', data.token);
      onLogin();
    } catch {
      setError('Cannot reach the server. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-box">
        <div className="login-logo">
          <h1>Admin<span>.</span></h1>
          <p>Mohammed Karab — Portfolio Control</p>
        </div>
        <form onSubmit={submit}>
          <div className="login-field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              autoFocus
            />
          </div>
          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Authenticating…' : 'Access Dashboard'}
          </button>
          {error && <div className="login-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

function Dashboard({ onLogout }) {
  const [tab, setTab] = useState('Overview');
  const time          = useNow();

  return (
    <div className="admin-dashboard">
      <div className="admin-topbar">
        <div className="topbar-brand">
          <div className="dot" />
          <h2>Mohammed<span>.</span>admin</h2>
        </div>
        <div className="topbar-right">
          <span className="topbar-time">{time}</span>
          <button className="logout-btn" onClick={onLogout}>Sign out</button>
        </div>
      </div>

      <div className="admin-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`tab-btn ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {tab === 'Overview'  && <OverviewTab />}
        {tab === 'Visitors'  && <VisitorsTab />}
        {tab === 'Portfolio' && <PortfolioTab />}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(!!sessionStorage.getItem('admin_token'));

  const logout = () => {
    sessionStorage.removeItem('admin_token');
    setAuthed(false);
  };

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={logout} />;
}