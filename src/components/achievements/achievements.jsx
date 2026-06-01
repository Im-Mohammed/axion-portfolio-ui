import { useRef, memo } from 'react';
import CircularGallery from '../../reactbits/CircularGallery/CircularGallery';
import { useInView } from '../../hooks/useInView';
import './achievements.css';

export const Achievements = memo(({ data = [] }) => {
  const [sectionRef, inView] = useInView({ rootMargin: '300px' });

  return (
    <section id="achievements" className="achievements-section" ref={sectionRef}>
      {data.length > 0 && (
        <>
          <h1 className="achievements-title">Achievements</h1>
          <div className="gallery-wrapper">
            {/* Only mount CircularGallery when section is near viewport */}
            {inView ? (
              <CircularGallery
                items={data}
                radius={280}
                damping={0.4}
                fadeOut={0.5}
                ease="power3.out"
                spotlightColor="rgba(120, 85, 247, 0.3)"
              />
            ) : (
              // Placeholder keeps layout height while gallery loads
              <div style={{ height: 600 }} />
            )}
            <div className="badge-title-links">
              {data.map((item, index) => (
                  <a
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
        </>
      )}
    </section>
  );
});