import { useState } from 'react';
import { authHdr, API } from '../adminUtils';

export default function SkillsSection({ data, onRefresh }) {
  const [adding, setAdding]     = useState(false);
  const [category, setCategory] = useState('');
  const [newCat, setNewCat]     = useState('');
  const [skillName, setSkillName] = useState('');
  const [skillIcon, setSkillIcon] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const categories    = Object.keys(data);
  const resolvedCat   = category === '__new__' ? newCat.trim() : category;

  const handleAdd = async () => {
    if (!resolvedCat || !skillName || !skillIcon) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `${API}/admin/portfolio/skills/${encodeURIComponent(resolvedCat)}`,
        {
          method:  'POST',
          headers: authHdr(),
          body:    JSON.stringify({ name: skillName, icon: skillIcon }),
        }
      );
      const d = await res.json();
      if (!res.ok) { setError(d.detail || 'Failed.'); return; }
      setSkillName('');
      setSkillIcon('');
      setAdding(false);
      onRefresh();
    } catch {
      setError('Server error.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cat, name) => {
    if (!confirm(`Remove "${name}" from ${cat}?`)) return;
    try {
      await fetch(
        `${API}/admin/portfolio/skills/${encodeURIComponent(cat)}/${encodeURIComponent(name)}`,
        { method: 'DELETE', headers: authHdr() }
      );
      onRefresh();
    } catch {
      alert('Delete failed.');
    }
  };

  return (
    <div className="portfolio-section">
      <div className="section-header">
        <div>
          <h3>Skills</h3>
          <p>{categories.length} categories</p>
        </div>
        <button className="add-btn" onClick={() => setAdding(v => !v)}>
          {adding ? '✕ Cancel' : '+ Add Skill'}
        </button>
      </div>

      {adding && (
        <div className="add-form">
          <div className="form-field">
            <label>Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="form-select"
            >
              <option value="">Select category…</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
              <option value="__new__">+ New category…</option>
            </select>
          </div>

          {category === '__new__' && (
            <div className="form-field">
              <label>New Category Name</label>
              <input
                type="text"
                value={newCat}
                onChange={e => setNewCat(e.target.value)}
                placeholder="e.g. Databases"
              />
            </div>
          )}

          <div className="form-field">
            <label>Skill Name</label>
            <input
              type="text"
              value={skillName}
              onChange={e => setSkillName(e.target.value)}
              placeholder="e.g. Streamlit"
            />
          </div>

          <div className="form-field">
            <label>Icon URL</label>
            <input
              type="text"
              value={skillIcon}
              onChange={e => setSkillIcon(e.target.value)}
              placeholder="https://cdn.jsdelivr.net/... or /icons/name.svg"
            />
          </div>

          {error && <div className="form-error">{error}</div>}
          <button className="save-btn" onClick={handleAdd} disabled={loading}>
            {loading ? 'Saving…' : 'Save Skill'}
          </button>
        </div>
      )}

      {categories.map(cat => (
        <div className="skill-category-block" key={cat}>
          <div className="skill-category-title">{cat}</div>
          <div className="skill-chips">
            {data[cat].map(skill => (
              <div className="skill-chip" key={skill.name}>
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="chip-icon"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <span>{skill.name}</span>
                <button
                  className="chip-delete"
                  onClick={() => handleDelete(cat, skill.name)}
                >×</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}