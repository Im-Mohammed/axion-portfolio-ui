import React, { useState, useEffect } from 'react';
import ChromaGrid from '../../reactbits/ChromaGrid/ChromaGrid';
import './projects.css';

export const Projects = () => {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/portfolio/projects`)
      .then(res => res.json())
      .then(data => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <section className="projects-section"><p>Loading...</p></section>;

  return (
    <section id="projects" className="projects-section">
      <h1 className="projects-title">Projects</h1>
      <div className="chroma-wrapper">
        <ChromaGrid
          items={items}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </section>
  );
};