import { memo } from 'react';
import ChromaGrid from '../../reactbits/ChromaGrid/ChromaGrid';
import { useInView } from '../../hooks/useInView';
import './projects.css';

export const Projects = memo(({ data = [] }) => {
  const [sectionRef, inView] = useInView({
    mode:       'toggle',
    rootMargin: '100px',
  });

  if (!data || data.length === 0) return null;

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <h1 className="projects-title">Projects</h1>
      <div className="chroma-wrapper">
        {inView ? (
          <ChromaGrid
            items={data}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        ) : (
          <div style={{ height: 600 }} />
        )}
      </div>
    </section>
  );
});