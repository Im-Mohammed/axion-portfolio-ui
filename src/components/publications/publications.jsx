import React from 'react';
import './publications.css';

const bentoItems = [
  {
    image: '/certificates/IJCRT.png', // Certificate preview
    title: 'Autism Support System',
    subtitle: 'Published in IJCRT',
    url: 'https://ijcrt.org/papers/IJCRT2407342.pdf'
  },
  {
    image: '/certificates/IJIRCCE.png', // Certificate preview
    title: 'Amazon Sales Analysis',
    subtitle: 'Published via IJIRCCE',
    url: '/certificates/cyber-cert.pdf'
  },
  {
    image: '/certificates/LLM.jpeg', // Article-specific image
    title: 'LLMs From Basics to Practical Understanding',
    subtitle: 'Medium Article',
    url: 'https://medium.com/@Im-Mohammed/large-language-models-llms-from-basics-to-practical-understanding-a171a02ba2f1'
  },
  {
    image: '/certificates/Dutch.png', // Article-specific image
    title: 'Dutch National Flag Algorithm',
    subtitle: 'Medium Article',
    url: 'https://medium.com/@Im-Mohammed/dutch-national-flag-problem-e7b0f7cb488b'
  }
];

export const Publications = () => {
  return (
    <section id="publications" className="publications-section">
      <h1 className="publications-title">Publications & Articles</h1>
      <div className="bento-grid">
        {bentoItems.map((item, index) => (
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
