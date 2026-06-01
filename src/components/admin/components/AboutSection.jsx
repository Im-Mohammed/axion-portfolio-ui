import { useState } from 'react';
import { authHdr, API, invalidatePortfolioCache } from '../adminUtils';

export default function AboutSection({ data, onRefresh }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm]       = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  // Open editor with current values
  const handleEdit = () => {
    setForm({
      name:         data?.name         || '',
      title:        data?.title        || '',
      handle:       data?.handle       || '',
      linkedin:     data?.linkedin     || '',
      github:       data?.github       || '',
      email:        data?.email        || '',
      location:     data?.location     || '',
      bio:          data?.bio          || '',
      typing_lines: (data?.typing_lines || []).join('\n'),
    });
    setEditing(true);
    setError('');
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      // Convert typing_lines textarea back to array
      const payload = {
        ...form,
        typing_lines: form.typing_lines
          .split('\n')
          .map(l => l.trim())
          .filter(Boolean),
      };

      const res = await fetch(`${API}/admin/portfolio/about`, {
        method:  'PUT',
        headers: authHdr(),
        body:    JSON.stringify(payload),
      });

      const d = await res.json();
      if (!res.ok) { setError(d.detail || 'Failed to save.'); return; }
      invalidatePortfolioCache();
      setEditing(false);
      onRefresh();
    } catch {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="portfolio-section">
      <div className="portfolio-section-header">
        <div className="ps-left">
          <h3>About</h3>
          <span className="ps-count">Personal info</span>
        </div>
        <button className="add-btn" onClick={editing ? () => setEditing(false) : handleEdit}>
          {editing ? '✕ Cancel' : '✎ Edit'}
        </button>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="add-form">
          <div className="form-field">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Mohammed Karab Ehtesham"
            />
          </div>

          <div className="form-field">
            <label>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="AI & Full Stack Developer"
            />
          </div>

          <div className="form-field">
            <label>GitHub Handle</label>
            <input
              name="handle"
              value={form.handle}
              onChange={handleChange}
              placeholder="Im-Mohammed"
            />
          </div>

          <div className="form-field">
            <label>Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Hyderabad, India"
            />
          </div>

          <div className="form-field">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@gmail.com"
            />
          </div>

          <div className="form-field">
            <label>LinkedIn URL</label>
            <input
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div className="form-field full">
            <label>GitHub URL</label>
            <input
              name="github"
              value={form.github}
              onChange={handleChange}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="form-field full">
            <label>Bio paragraph</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Short bio shown below the typing animation…"
              rows={3}
            />
          </div>

          <div className="form-field full">
            <label>Typing animation lines (one per line)</label>
            <textarea
              name="typing_lines"
              value={form.typing_lines}
              onChange={handleChange}
              placeholder={"Line one...\nLine two...\nLine three..."}
              rows={5}
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button className="save-btn" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving…' : 'Save About'}
          </button>
        </div>
      )}

      {/* Preview — shows current values when not editing */}
      {!editing && data && (
        <div className="item-list">
          {[
            ['Name',     data.name],
            ['Title',    data.title],
            ['Handle',   data.handle],
            ['Location', data.location],
            ['Email',    data.email],
            ['LinkedIn', data.linkedin],
            ['GitHub',   data.github],
            ['Bio',      data.bio],
          ].map(([label, value]) => value ? (
            <div className="item-row" key={label} style={{ cursor: 'default' }}>
              <div className="item-info">
                <span className="item-sub">{label}</span>
                <span className="item-title" style={{ fontSize: '0.82rem' }}>{value}</span>
              </div>
            </div>
          ) : null)}

          {data.typing_lines?.length > 0 && (
            <div className="item-row" style={{ cursor: 'default' }}>
              <div className="item-info">
                <span className="item-sub">Typing lines</span>
                <span className="item-title" style={{ fontSize: '0.82rem' }}>
                  {data.typing_lines.length} lines configured
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {!editing && !data && (
        <div className="empty-state" style={{ padding: '1.5rem' }}>
          No about data found. Click Edit to add.
        </div>
      )}
    </div>
  );
}