import { useState } from 'react';
import { authHdr, API } from '../adminUtils';

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
    if (!confirm(`Delete this ${section} item?`)) return;
    try {
      await fetch(`${API}/admin/portfolio/${section}/${id}`, {
        method:  'DELETE',
        headers: authHdr(),
      });
      onRefresh();
    } catch {
      alert('Delete failed.');
    }
  };

  return (
    <div className="portfolio-section">
      <div className="section-header">
        <div>
          <h3>{title}</h3>
          <p>{data.length} items</p>
        </div>
        <button className="add-btn" onClick={() => setAdding(v => !v)}>
          {adding ? '✕ Cancel' : '+ Add'}
        </button>
      </div>

      {adding && (
        <div className="add-form">
          {fields.map(f => (
            <div className="form-field" key={f.key}>
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

      <div className="item-list">
        {data.length === 0 && <div className="empty-state">No items yet.</div>}
        {data.map(item => (
          <div className="item-row" key={item.id}>
            <div className="item-info">
              <span className="item-title">
                {item.title || item.name || item.role || '—'}
              </span>
              <span className="item-sub">
                {item.subtitle || item.summary
                  || item.description?.slice(0, 80)
                  || item.source || ''}
                {item.description?.length > 80 ? '…' : ''}
              </span>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(item.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}