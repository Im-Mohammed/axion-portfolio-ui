import React, { useState, useEffect } from 'react';
import './publications.css';

export const Publications = () => {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/portfolio/publications`)
      .then(res => res.json())
      .then(data => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <section className="publications-section">
      <p>Loading...</p>
    </section>
  );

  return (
    <section id="publications" className="publications-section">
      <h1 className="publications-title">Publications & Articles</h1>
      <div className="bento-grid">
        {items.map((item, index) => (
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
};