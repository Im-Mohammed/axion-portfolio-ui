import React, { useState, useEffect } from 'react';
import './skills.css';
import { SkillCard } from './SkillCard/SkillCard';

export const Skills = () => {
  const [skillGroups, setSkillGroups] = useState({});
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/portfolio/skills`)
      .then(res => res.json())
      .then(data => { setSkillGroups(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <section className="skills-section"><p>Loading...</p></section>;

  return (
    <section id="skills" className="skills-section">
      <h1 className="skills-title">Skills</h1>
      {Object.entries(skillGroups).map(([category, items]) => (
        <div key={category} className="skills-category">
          <h2 className="category-title">{category}</h2>
          <div className="card-row">
            {items.map((skill, index) => (
              <SkillCard key={index} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};