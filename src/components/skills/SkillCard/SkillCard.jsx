import React from 'react';
import './SkillCard.css';

export const SkillCard = ({ name, icon }) => {
  return (
    <div className="skill-card">
      <div className="card-inner">
        <img src={icon} alt={name} className="skill-icon" />
        <span className="skill-label">{name}</span>
      </div>
    </div>
  );
};
