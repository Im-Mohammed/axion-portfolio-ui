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
      role: 'Software Developer',
      company: 'Caalm-ai',
      location: 'Remote',
      period: 'Aug 2025 – Present',
      description: `At Caalm.ai, I built and scaled backend systems that power intelligent document workflows from OCR and classification to semantic search and metadata extraction. I worked across cloud and on-prem environments, using Docker, Azure Blob Storage, and Azure AI Document Intelligence to deploy flexible, reliable services. I also developed RAG applications with Melvis as a vector database, enabling smarter, context-aware responses. My backend handled asynchronous tasks with Redis and Celery, supported rollback-safe versioning, and followed modular service contracts to keep everything maintainable and audit-friendly. It was all about making complex systems feel seamless for users.` ,
    },
    {
      role: 'AI System Developer',
      company: 'Freelance Project',
      location: 'Remote',
      period: 'May 2025 – July 2025',
      description: `Built an intelligent automation agent to resolve network issues triggered by SolarWinds alerts and Freshservice tickets, reducing manual triage and speeding up recovery. Integrated secure access via CyberArk CCP for real-time diagnostics across routers and firewalls, and automated troubleshooting with SSH-based workflows. Used Azure OpenAI to generate structured recommendations, and delivered a modular framework that supported tailored recovery across Cisco, Versa, Ruckus, and Palo Alto devices cutting NOC workload by 80%.`,
    },
    {
      role: 'AI Application Developer',
      App: 'MindSYNC',
      location: 'Remote',
      period: 'Mar 2025 – April 2025',
      description: `Built MindSync, an emotion-adaptive learning platform that personalizes quiz difficulty and feedback based on real-time facial expressions. Used DeepFace, OpenCV, and Django to detect user emotions and adjust content dynamically, boosting engagement and retention through responsive, human-centered design.`,
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
