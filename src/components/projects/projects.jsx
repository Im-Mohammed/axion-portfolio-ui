import React, { useState, useEffect } from 'react';
import ChromaGrid from '../../reactbits/ChromaGrid/ChromaGrid';
import './projects.css';
import React, { memo } from 'react';

export const Projects = memo(({ data = [] }) => {
  if (!data || data.length === 0) return null;
  return (
    <section id="projects" className="projects-section">
      <h1 className="projects-title">Projects</h1>
      <div className="chroma-wrapper">
        <ChromaGrid
          items={data}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </section>
  );
});