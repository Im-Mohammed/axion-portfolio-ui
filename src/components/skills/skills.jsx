import React from 'react';
import './skills.css';
import { SkillCard } from './SkillCard/SkillCard';

const skillGroups = {
  Languages: [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    { name: 'R', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
    { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
  ],
  Frontend: [
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  ],
  'Backend & DevOps': [
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
    { name: 'n8n', icon: '/icons/n8n.svg' },
    { name: 'Postman', icon: '/icons/postman.svg' },
    { name: 'Heroku', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg' },
    { name: 'AWS', icon: '/icons/aws.svg' },
    { name: 'Networking', icon: '/icons/network.svg' },
  ],
  'Cloud & Deployment': [
    { name: 'Google Cloud Platform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
    { name: 'Render', icon: '/icons/render.svg' },
    { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'InfinityFree', icon: '/icons/inifinityfree.svg' },
  ],
  'Security Tools': [
    { name: 'Nmap', icon: '/icons/Nmap.svg' },
    { name: 'Hydra', icon: '/icons/hydra.svg' },
    { name: 'John The Ripper', icon: '/icons/johntheripper.svg' },
    { name: 'Metasploit', icon: '/icons/metasploit.svg' },
    { name: 'Burp Suite', icon: '/icons/burpsuite.svg' },
    { name: 'Wireshark', icon: '/icons/Wireshark.svg' },
    { name: 'Kali Linux', icon: '/icons/kalilinux.svg' },
    { name: 'Parrot OS', icon: '/icons/parrot.svg' },
  ],
  Libraries: [
    { name: 'Tensorflow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'Pytorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
    { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
    { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
    { name: 'Langchain', icon: '/icons/langchain.svg' },
    { name: 'Langgraph', icon: '/icons/langgraph.svg' },
    { name: 'LangSmith', icon: '/icons/langsmith.svg' },
    { name: 'FastAPI', icon: '/icons/FastApi.svg' },
    { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  ],
};

export const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <h1 className="skills-title">Skills</h1>
      {Object.entries(skillGroups).map(([category, items]) => (
        <div key={category} className="skills-category">
          <h2 className="category-title">{category}</h2>
          <div className="card-row">
            {items.map((skill, index) => (
              <SkillCard key={index} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
