import React, { memo } from 'react';
import './skills.css';
import { SkillCard } from './SkillCard/SkillCard';

export const Skills = memo(({ data = {} }) => {
  if (!data || Object.keys(data).length === 0) return null;
  return (
    <section id="skills" className="skills-section">
      <h1 className="skills-title">Skills</h1>
      {Object.entries(data).map(([category, items]) => (
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
});