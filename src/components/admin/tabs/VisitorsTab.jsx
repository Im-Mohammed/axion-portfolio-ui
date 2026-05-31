import { useState, useCallback, useEffect } from 'react';
import { authHdr, API } from '../adminUtils';
import DetailModal from '../components/DetailModal';

const FILTERS  = ['all', 'hr', 'developer', 'visitor', 'skipped'];
const PER_PAGE = 20;
const BADGE    = {
  hr: 'badge-hr', developer: 'badge-developer',
  visitor: 'badge-visitor', skipped: 'badge-skipped',
};

export default function VisitorsTab() {
  const [records, setRecords]   = useState([]);
  const [total, setTotal]       = useState(0);
  const [pages, setPages]       = useState(1);
  const [page, setPage]         = useState(1);
  const [filter, setFilter]     = useState('all');
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);

  const load = useCallback(async (p = 1, f = 'all') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: p, per_page: PER_PAGE });
      if (f !== 'all') params.append('user_type', f);
      const res  = await fetch(`${API}/admin/visitors?${params}`, { headers: authHdr() });
      const data = await res.json();
      setRecords(data.data  || []);
      setTotal(data.total   || 0);
      setPages(data.pages   || 1);
    } catch {
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(page, filter); }, [page, filter]);

  const handleFilter = (f) => { setFilter(f); setPage(1); };

  const exportXlsx = async () => {
    const res  = await fetch(`${API}/admin/export`, { headers: authHdr() });
    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `visitors_${Date.now()}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="section-header">
        <div>
          <h3>Visitor Log</h3>
          <p>{total} records total</p>
        </div>
        <button className="export-btn" onClick={exportXlsx}>↓ Export Excel</button>
      </div>

      <div className="filter-bar">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => handleFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="admin-loading">
          <div className="spinner" />
          <span>Loading visitors…</span>
        </div>
      ) : records.length === 0 ? (
        <div className="empty-state">No records found.</div>
      ) : (
        <>
          <div className="visitor-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Timestamp</th>
                  <th>IP</th>
                  <th>Model</th>
                </tr>
              </thead>
              <tbody>
                {records.map(r => (
                  <tr key={r.ID} onClick={() => setSelected(r.ID)}>
                    <td>
                      <span className={`badge ${BADGE[r.UserType] || 'badge-visitor'}`}>
                        {r.UserType || '—'}
                      </span>
                    </td>
                    <td>{r.Name      || 'anonymous'}</td>
                    <td>{r.Email     || '—'}</td>
                    <td>{r.Company   || '—'}</td>
                    <td>{r.Timestamp || '—'}</td>
                    <td>{r.IP        || '—'}</td>
                    <td style={{ maxWidth: 120 }}>{r.ModelUsed || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setPage(p => p - 1)}
                disabled={page === 1}
              >←</button>

              {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
                const n = i + Math.max(1, page - 3);
                if (n > pages) return null;
                return (
                  <button
                    key={n}
                    className={`page-btn ${page === n ? 'active' : ''}`}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                );
              })}

              <button
                className="page-btn"
                onClick={() => setPage(p => p + 1)}
                disabled={page === pages}
              >→</button>
            </div>
          )}
        </>
      )}

      {selected && (
        <DetailModal visitorId={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}