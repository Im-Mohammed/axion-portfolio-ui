import React, { memo } from 'react';
import './Service.css';
import LightRays from '../../reactbits/LightRays/LightRays';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export const Service = memo(({ data = [] }) => {
  if (!data || data.length === 0) return null;
  return (
    <section id="experience" className="experience-section">
      <div className="light-rays-wrapper">
        <LightRays
          raysOrigin="left"
          raysColor="#5533ea"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={2}
          followMouse={true}
          mouseInfluence={0.6}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
      <div className="service-content">
        <h1 className="title">Experience</h1>
        <VerticalTimeline lineColor="#5533ea">
          {data.map((exp, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'transparent', boxShadow: 'none' }}
              contentArrowStyle={{ display: 'none' }}
              date={exp.period}
              iconStyle={{
                background: 'rgba(85, 51, 234, 0.2)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(85, 51, 234, 0.4)',
                color: '#fff',
              }}
            >
              <div className="glass-card">
                <h3 className="vertical-timeline-element-title">{exp.role}</h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {exp.company} — {exp.location}
                </h4>
                <p>{exp.description}</p>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
});