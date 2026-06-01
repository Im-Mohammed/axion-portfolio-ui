import { useState, useEffect, useCallback } from 'react';
import { API } from '../adminUtils';
import ListSection  from '../components/ListSection';
import SkillsSection from '../components/SkillsSection';
import AboutSection  from '../components/AboutSection'; 
const PROJECT_FIELDS = [
  { key: 'title',       label: 'Title',        placeholder: 'Project name' },
  { key: 'subtitle',    label: 'Subtitle',     placeholder: 'Tech • Stack • Keywords' },
  { key: 'image',       label: 'Image path',   placeholder: '/projects/name.jpeg' },
  { key: 'handle',      label: 'Handle',       placeholder: '@Im-Mohammed/repo-name' },
  { key: 'url',         label: 'GitHub URL',   placeholder: 'https://github.com/...' },
  { key: 'borderColor', label: 'Border Color', placeholder: '#ff66cc' },
  { key: 'gradient',    label: 'Gradient',     placeholder: 'linear-gradient(135deg, #ff66cc, #000)' },
];

const EXPERIENCE_FIELDS = [
  { key: 'role',        label: 'Role',        placeholder: 'Software Developer' },
  { key: 'company',     label: 'Company',     placeholder: 'Company name' },
  { key: 'location',    label: 'Location',    placeholder: 'Remote' },
  { key: 'period',      label: 'Period',      placeholder: 'Jan 2026 – Present' },
  { key: 'description', label: 'Description', placeholder: 'What you did…', textarea: true },
];

const PUBLICATION_FIELDS = [
  { key: 'title',    label: 'Title',    placeholder: 'Publication title' },
  { key: 'subtitle', label: 'Subtitle', placeholder: 'Published in IJCRT' },
  { key: 'image',    label: 'Image',    placeholder: '/certificates/name.png' },
  { key: 'url',      label: 'URL',      placeholder: 'https://...' },
];

const ACHIEVEMENT_FIELDS = [
  { key: 'title',       label: 'Title',        placeholder: 'CCNA Introduction to Networks' },
  { key: 'image',       label: 'Badge Image',  placeholder: '/badges/cisco1.svg' },
  { key: 'url',         label: 'Credential URL', placeholder: 'https://www.credly.com/badges/...' },
  { key: 'borderColor', label: 'Border Color', placeholder: '#7855f7' },
  { key: 'gradient',    label: 'Gradient',     placeholder: 'linear-gradient(135deg, #7855f7, #33ccff)' },
];
export default function PortfolioTab() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/portfolio/all`);
      const d   = await res.json();
      setData(d);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, []);

  if (loading) return (
    <div className="admin-loading">
      <div className="spinner" />
      <span>Loading portfolio data…</span>
    </div>
  );

  if (!data) return <div className="empty-state">Could not load portfolio data.</div>;

  return (
    <>
      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h3>Portfolio Content</h3>
          <p>Changes reflect on the live site immediately</p>
        </div>
      </div>

      {/* About — edit personal info */}
      <AboutSection
        data={data.about || null}
        onRefresh={load}
      />

      <SkillsSection  data={data.skills       || {}} onRefresh={load} />
      <ListSection    title="Projects"      section="projects"     data={data.projects      || []} fields={PROJECT_FIELDS}     onRefresh={load} />
      <ListSection    title="Experience"    section="experience"   data={data.experience    || []} fields={EXPERIENCE_FIELDS}  onRefresh={load} />
      <ListSection    title="Publications"  section="publications" data={data.publications  || []} fields={PUBLICATION_FIELDS} onRefresh={load} />
      <ListSection    title="Achievements"  section="achievements" data={data.achievements  || []} fields={ACHIEVEMENT_FIELDS} onRefresh={load} />
    </>
  );
}