import React from 'react';
import './Service.css';
import LightRays from '../../reactbits/LightRays/LightRays';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export const Service = () => {
  const experiences = [
    {
      role: 'AI Application Developer',
      company: 'Blisskart.com',
      location: 'Remote',
      period: 'June 2025 – Present',
      description: `Designing and building a complete e-commerce platform from the ground up, including storefront, backend logic, and AI-driven customer support features. Developed an intelligent assistant that helps users discover products, ask questions, and complete purchases through natural, conversational interactions.`,
    },
    {
      role: 'Prompt Engineer & UI Specialist',
      company: 'Mind-Sync',
      location: 'Remote',
      period: 'Jan 2025 – May 2025',
      description: `Led prompt design for an emotional wellness app. Engineered modular prompts and animated UI elements to enhance engagement and clarity.`,
    },
    {
      role: 'Front-End Developer',
      company: 'Autism Support System',
      location: 'Remote',
      period: 'Aug 2024 – Dec 2024',
      description: `Built accessible dashboards and visual tools for neurodiverse users. Integrated GitHub API for contributor insights and streamlined reviewer assignments.`,
    },
  ];

  return (
    <section id="experience" className="experience-section">
      {/* Background */}
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

      {/* Timeline Content */}
      <div className="service-content">
        <h1 className="title">Experience</h1>
        <VerticalTimeline lineColor="#5533ea">
          {experiences.map((exp, index) => (
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
};
