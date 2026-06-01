import { useState } from 'react';
import { authHdr, API, invalidatePortfolioCache } from '../adminUtils';

export default function ListSection({ title, section, data, fields, onRefresh }) {
  const [adding, setAdding]   = useState(false);
  const [form, setForm]       = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleAdd = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/admin/portfolio/${section}`, {
        method:  'POST',
        headers: authHdr(),
        body:    JSON.stringify(form),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.detail || 'Failed to add item.'); return; }
      invalidatePortfolioCache();   
      setForm({});
      setAdding(false);
      onRefresh();
    } catch {
      setError('Server error.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(`Delete this item from ${section}?`)) return;
    try {
      await fetch(`${API}/admin/portfolio/${section}/${id}`, {
        method:  'DELETE',
        headers: authHdr(),
      });
      invalidatePortfolioCache();
      onRefresh();
    } catch {
      alert('Delete failed.');
    }
  };

  // Extract a readable title from any item shape
  const getTitle = (item) =>
    item.title || item.name || item.role || '—';

  // Extract a readable subtitle from any item shape
  const getSub = (item) => {
    const raw =
      item.subtitle ||
      item.summary  ||
      item.source   ||
      item.company  ||
      (item.description ? item.description.slice(0, 80) + (item.description.length > 80 ? '…' : '') : '');
    return raw || '';
  };

  return (
    <div className="portfolio-section">
      {/* Header */}
      <div className="portfolio-section-header">
        <div className="ps-left">
          <h3>{title}</h3>
          <span className="ps-count">{data.length} items</span>
        </div>
        <button className="add-btn" onClick={() => setAdding(v => !v)}>
          {adding ? '✕ Cancel' : '+ Add'}
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="add-form">
          {fields.map(f => (
            <div className={`form-field${f.textarea ? ' full' : ''}`} key={f.key}>
              <label>{f.label}</label>
              {f.textarea ? (
                <textarea
                  value={form[f.key] || ''}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder || ''}
                  rows={4}
                />
              ) : (
                <input
                  type="text"
                  value={form[f.key] || ''}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder || ''}
                />
              )}
            </div>
          ))}
          {error && <div className="form-error">{error}</div>}
          <button className="save-btn" onClick={handleAdd} disabled={loading}>
            {loading ? 'Saving…' : 'Save'}
          </button>
        </div>
      )}

      {/* Item list */}
      <div className="item-list">
        {data.length === 0 && (
          <div className="empty-state" style={{ padding: '1.5rem' }}>
            No items yet. Click + Add to get started.
          </div>
        )}
        {data.map((item, idx) => (
          <div className="item-row" key={item.id || idx}>
            <div className="item-info">
              <span className="item-title">{getTitle(item)}</span>
              {getSub(item) && (
                <span className="item-sub">{getSub(item)}</span>
              )}
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(item.id)}
              title="Delete"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}