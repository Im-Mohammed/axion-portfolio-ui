import { useState, useEffect } from 'react';
import { authHdr, API } from '../adminUtils';
import StatCard from '../components/StatCard';

const ENDPOINTS = [
  ['POST', '/admin/login',                           'Get JWT token'],
  ['GET',  '/admin/stats',                           'Visitor counts'],
  ['GET',  '/admin/visitors',                        'Paginated visitor list'],
  ['GET',  '/admin/visitor/{id}',                    'Single visitor detail'],
  ['GET',  '/admin/export',                          'Download Excel log'],
  ['GET',  '/portfolio/all',                         'All portfolio data'],
  ['PUT',  '/admin/portfolio/{section}',             'Replace full section'],
  ['POST', '/admin/portfolio/{section}',             'Add item to section'],
  ['DEL',  '/admin/portfolio/{section}/{id}',        'Delete item by id'],
  ['POST', '/admin/portfolio/skills/{cat}',          'Add skill to category'],
  ['DEL',  '/admin/portfolio/skills/{cat}/{skill}',  'Remove skill'],
];

const METHOD_BADGE = {
  GET:  'badge-developer',
  POST: 'badge-hr',
  PUT:  'badge-visitor',
  DEL:  'badge-skipped',
};

export default function OverviewTab() {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    const headers = authHdr();
    fetch(`${API}/admin/stats`, { headers })
      .then(r => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.json();
      })
      .then(d => { setStats(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  return (
    <>
      <div className="section-header">
        <div>
          <h3>Portfolio Overview</h3>
          <p>Visitor stats — merged from Excel + Google Sheets</p>
        </div>
      </div>

      {loading ? (
        <div className="admin-loading">
          <div className="spinner" />
          <span>Loading stats…</span>
        </div>
      ) : error ? (
        <div className="empty-state" style={{ color: 'var(--red)' }}>
          Failed to load stats: {error}
        </div>
      ) : (
        <div className="stat-grid">
          <StatCard label="Total"      value={stats?.total}     variant="purple" delay={0}   />
          <StatCard label="Today"      value={stats?.today}     variant="green"  delay={50}  />
          <StatCard label="HR"         value={stats?.hr}        variant="blue"   delay={100} />
          <StatCard label="Developers" value={stats?.developer} variant="yellow" delay={150} />
          <StatCard label="Visitors"   value={stats?.visitor}   variant=""       delay={200} />
          <StatCard label="Skipped"    value={stats?.skipped}   variant="red"    delay={250} />
        </div>
      )}

      <div className="section-header" style={{ marginTop: '2rem' }}>
        <div>
          <h3>API Reference</h3>
          <p>All available admin endpoints</p>
        </div>
      </div>

      <div className="visitor-table-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: 80 }}>Method</th>
              <th>Endpoint</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {ENDPOINTS.map(([method, path, desc]) => (
              <tr key={path} style={{ cursor: 'default' }}>
                <td>
                  <span className={`badge ${METHOD_BADGE[method] || 'badge-skipped'}`}>
                    {method}
                  </span>
                </td>
                <td style={{ color: 'var(--text-primary)', fontFamily: 'var(--mono)' }}>
                  {path}
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}