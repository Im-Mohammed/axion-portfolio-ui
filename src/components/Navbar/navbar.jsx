import './navbar.css';
import React, { useState } from 'react';
import AxionTwin from '../assistant/Assistant';

export const Navbar = () => {
  const [showChat, setShowChat] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="logo-container">
          <img src="/images/Logo.png" alt="Logo" className="logo-image" />
          <a href="/" className="logo-text">Mohammed</a>
        </div>

        {/* Desktop nav */}
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#experience">Services</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Builds</a>
          <a href="#achievements">Wins</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Hamburger for mobile */}
        <div
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Desktop AI button (hidden on mobile) */}
        <button
          className="AIbutton desktop-button"
          onClick={() => setShowChat(true)}
        >
          AI Chat
        </button>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'show' : ''}`}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#experience" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
        <a href="#projects" onClick={() => setMenuOpen(false)}>Builds</a>
        <a href="#achievements" onClick={() => setMenuOpen(false)}>Wins</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </div>

      {/* Mobile AI button (round image) */}
      <button
        className="AIbutton"
        onClick={() => setShowChat(true)}
      >
        <img src="/images/Avatar.jpg" alt="AI Chat" className="ai-avatar" />
      </button>

      {/* Chat component */}
      {showChat && <AxionTwin onClose={() => setShowChat(false)} />}
    </>
  );
};
