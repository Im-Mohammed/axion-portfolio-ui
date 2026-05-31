import { useState, useEffect } from 'react';
import { authHdr, API } from '../adminUtils';
import StatCard from '../components/StatCard';

const ENDPOINTS = [
  ['POST', '/admin/login',                          'Get JWT token'],
  ['GET',  '/admin/stats',                          'Visitor counts'],
  ['GET',  '/admin/visitors',                       'Paginated visitor list'],
  ['GET',  '/admin/visitor/{id}',                   'Single visitor detail'],
  ['GET',  '/admin/export',                         'Download Excel log'],
  ['GET',  '/portfolio/all',                        'All portfolio data'],
  ['PUT',  '/admin/portfolio/{section}',            'Replace full section'],
  ['POST', '/admin/portfolio/{section}',            'Add item to section'],
  ['DEL',  '/admin/portfolio/{section}/{id}',       'Delete item'],
  ['POST', '/admin/portfolio/skills/{cat}',         'Add skill to category'],
  ['DEL',  '/admin/portfolio/skills/{cat}/{skill}', 'Remove skill'],
];

const BADGE_METHOD = {
  GET:  'badge-developer',
  POST: 'badge-hr',
  PUT:  'badge-visitor',
  DEL:  'badge-skipped',
};

export default function OverviewTab() {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/admin/stats`, { headers: authHdr() })
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="admin-loading"><div className="spinner" /></div>;
  if (!stats)  return <div className="empty-state">Could not load stats.</div>;

  return (
    <>
      <div className="section-header">
        <div>
          <h3>Portfolio Overview</h3>
          <p>Visitor stats from Excel + Google Sheets (merged)</p>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Visitors" value={stats.total}     variant="purple" delay={0}   />
        <StatCard label="Today"          value={stats.today}     variant="green"  delay={60}  />
        <StatCard label="HR"             value={stats.hr}        variant="blue"   delay={120} />
        <StatCard label="Developers"     value={stats.developer} variant="yellow" delay={180} />
        <StatCard label="Visitors"       value={stats.visitor}   variant=""       delay={240} />
        <StatCard label="Skipped"        value={stats.skipped}   variant="red"    delay={300} />
      </div>

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
              <th>Method</th>
              <th>Endpoint</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {ENDPOINTS.map(([method, path, desc]) => (
              <tr key={path} style={{ cursor: 'default' }}>
                <td>
                  <span className={`badge ${BADGE_METHOD[method] || 'badge-skipped'}`}>
                    {method}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>
                  {path}
                </td>
                <td>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}