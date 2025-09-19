import React from 'react';
import ChromaGrid from '../../reactbits/ChromaGrid/ChromaGrid';
import './projects.css';

const items = [
  {
    image: '/projects/Autism.jpeg',
    title: 'Web-EmoRec',
    subtitle: 'Real-Time Emotion Recognition • ML • OpenCV',
    handle: '@Im-Mohammed/Web-EmoRec',
    borderColor: '#ff66cc',
    gradient: 'linear-gradient(135deg, #ff66cc, #000)',
    url: 'https://github.com/Im-Mohammed/Web-EmoRec'
  },
  {
    image: '/projects/MindSync.jpeg',
    title: 'Mind-Sync',
    subtitle: 'Adaptive Learning • Emotion AI • TensorFlow',
    handle: '@Im-Mohammed/Mind-Sync',
    borderColor: '#00ccff',
    gradient: 'linear-gradient(135deg, #00ccff, #000)',
    url: 'https://github.com/Im-Mohammed/Mind-Sync'
  },
  {
    image: '/projects/AIChemist.jpeg',
    title: 'AI-Chemist',
    subtitle: 'Tablet Recognition • Gemini Vision API • Streamlit',
    handle: '@Im-Mohammed/AI-Chemist',
    borderColor: '#66ff99',
    gradient: 'linear-gradient(135deg, #66ff99, #000)',
    url: 'https://github.com/Im-Mohammed/AI-Chemist'
  },
  {
    image: '/projects/API.jpeg',
    title: 'Healthcare Claims API',
    subtitle: 'Medical Data • REST API • Python',
    handle: '@Im-Mohammed/Healthcare-Claims-API',
    borderColor: '#ffcc00',
    gradient: 'linear-gradient(135deg, #ffcc00, #000)',
    url: 'https://github.com/Im-Mohammed/Healthcare-Claims-API'
  },
  {
    image: '/projects/Pneumonia.jpeg',
    title: 'Pneumonia Detection Model',
    subtitle: 'CNN • X-ray Classification • Deep Learning',
    handle: '@Im-Mohammed/PneumoniaDetectionModel',
    borderColor: '#ff4444',
    gradient: 'linear-gradient(135deg, #ff4444, #000)',
    url: 'https://github.com/Im-Mohammed/PneumoniaDetectionModel'
  },
  {
    image: '/projects/WebScrape.jpeg',
    title: 'WebscrapeModel',
    subtitle: 'Django • BeautifulSoup • Excel Export',
    handle: '@Im-Mohammed/WebscrapeModel',
    borderColor: '#33ccff',
    gradient: 'linear-gradient(135deg, #33ccff, #000)',
    url: 'https://github.com/Im-Mohammed/WebscrapeModel'
  }
];

export const Projects = () => {
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
