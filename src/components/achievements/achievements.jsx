import React, { useRef } from 'react';
import CircularGallery from '../../reactbits/CircularGallery/CircularGallery';
import './achievements.css';

const achievementItems = [
  // 🔹 Credly Badges
  {
    image: '/badges/cisco1.svg',
    title: 'CCNA Introduction to Networks',
    borderColor: '#7855f7',
    gradient: 'linear-gradient(135deg, #7855f7, #33ccff)',
    url: 'https://www.credly.com/badges/6d7f9673-6214-4ae8-b4b9-ca2319ea3ca9/public_url'
  },
  {
    image: '/badges/cisco2.svg',
    title: 'CCNA Routing Essentials',
    borderColor: '#7855f7',
    gradient: 'linear-gradient(135deg, #7855f7, #ff66cc)',
    url: 'https://www.credly.com/badges/c2ab2494-8744-4b18-9ea9-cb143d0c520e/public_url'
  },
  {
    image: '/badges/cisco3.svg',
    title: 'CCNA Enterprise Networking',
    borderColor: '#7855f7',
    gradient: 'linear-gradient(135deg, #7855f7, #00cc99)',
    url: 'https://www.credly.com/badges/ff73544f-cfb7-49f9-b347-7be4cda5bba4/public_url'
  },
  {
    image: '/badges/cisco4.svg',
    title: 'Networking Essentials',
    borderColor: '#7855f7',
    gradient: 'linear-gradient(135deg, #7855f7, #33ccff)',
    url: 'https://www.credly.com/badges/5ca0aecb-7306-4f70-abe2-2c5e25f0f4ee/public_url'
  },
  {
    image: '/badges/cisco5.svg',
    title: 'Cyber Security Essentials',
    borderColor: '#7855f7',
    gradient: 'linear-gradient(135deg, #7855f7, #ff66cc)',
    url: 'https://www.credly.com/badges/77e20ac4-9e8c-4718-a669-0dade8439b00/public_url'
  },
  {
    image: '/badges/cisco6.svg',
    title: 'Intro to Cybersecurity',
    borderColor: '#7855f7',
    gradient: 'linear-gradient(135deg, #7855f7, #00cc99)',
    url: 'https://www.credly.com/badges/cbeccd74-411e-4584-aeb7-5b6978350436/public_url'
  },
  {
    image: '/badges/cisco7.svg',
    title: 'Intro To IoT',
    borderColor: '#7855f7',
    gradient: 'linear-gradient(135deg, #7855f7, #33ccff)',
    url: 'https://www.credly.com/badges/f2646e14-ecb6-4246-a3f0-f85a4c9ceee1/public_url'
  },
  {
    image: '/badges/gcp1.svg',
    title: 'Gen AI Apps',
    borderColor: '#7855f7',
    gradient: 'linear-gradient(135deg, #7855f7, #ff66cc)',
    url: 'https://www.credly.com/badges/9d708d7c-ce24-4ebf-8271-83b553863aea/public_url'
  },
  {
    image: '/badges/gcp2.svg',
    title: 'Mulitmodal RAG',
    borderColor: '#7855f7',
    gradient: 'linear-gradient(135deg, #7855f7, #00cc99)',
    url: 'https://www.credly.com/badges/d865aa5f-865f-49be-afe6-e8634e90d156/public_url'
  },
  {
    image: '/badges/gcp3.svg',
    title: 'Prompt Design',
    borderColor: '#7855f7',
    gradient: 'linear-gradient(135deg, #7855f7, #33ccff)',
    url: 'https://www.credly.com/badges/7ae116c4-ca9c-4744-ba11-1c914f7fc651/public_url'
  },
  {
    image: '/badges/Ibm.svg',
    title: 'IBM Cybersecurity',
    borderColor: '#7855f7',
    gradient: 'linear-gradient(135deg, #7855f7, #ff66cc)',
    url: 'https://www.credly.com/badges/2c8948c3-6b39-45a7-9067-a251ea849be4/public_url'
  },

  // 🔸 LeetCode Badge
  {
    image: '/badges/Leetcode.svg',
    title: 'LeetCode 50 Days',
    borderColor: '#7855f7',
    gradient: 'linear-gradient(135deg, #7855f7, #33ccff)',
    url: 'https://leetcode.com/medal/'
  },
   {
    image: '/badges/leetcode100.svg',
    title: 'LeetCode 100 Days',
    borderColor: '#7855f7',
    gradient: 'linear-gradient(135deg, #7855f7, #33ccff)',
    url: 'https://leetcode.com/medal/'
  },
];

export const Achievements = () => {
  const galleryRef = useRef(null);

  return (
    <section id ="achievements" className="achievements-section">
      <h1 className="achievements-title">Achievements</h1>
      <div className="gallery-wrapper" ref={galleryRef}>
        <CircularGallery
          items={achievementItems}
          radius={280}
          damping={0.4}
          fadeOut={0.5}
          ease="power3.out"
          spotlightColor="rgba(120, 85, 247, 0.3)"
        />
        <div className="badge-title-links">
          {achievementItems.map((item, index) => (
            <a
              key={index}
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
};