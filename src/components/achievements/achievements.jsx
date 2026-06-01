import { memo } from 'react';
import CircularGallery from '../../reactbits/CircularGallery/CircularGallery';
import './achievements.css';

export const Achievements = memo(({ data = [] }) => {
  if (!data || data.length === 0) return null;
  return (
    <section id="achievements" className="achievements-section">
      <h1 className="achievements-title">Achievements</h1>
      <div className="gallery-wrapper">
        <CircularGallery
          items={data}
          radius={280}
          damping={0.4}
          fadeOut={0.5}
          ease="power3.out"
          spotlightColor="rgba(120, 85, 247, 0.3)"
        />
        <div className="badge-title-links">
          {data.map((item, index) => (
            
              key={item.id || index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="badge-title-link"
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});