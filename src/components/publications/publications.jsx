import React, { memo } from 'react';
import './publications.css';

export const Publications = memo(({ data = [] }) => {
  if (!data || data.length === 0) return null;
  return (
    <section id="publications" className="publications-section">
      <h1 className="publications-title">Publications & Articles</h1>
      <div className="bento-grid">
        {data.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card"
          >
            <img src={item.image} alt={item.title} className="bento-icon" />
            <div className="bento-content">
              <h2>{item.title}</h2>
              <p>{item.subtitle}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
});