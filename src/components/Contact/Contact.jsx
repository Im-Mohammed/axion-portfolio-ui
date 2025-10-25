import React, { useState, useEffect } from 'react';
import './Contact.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://axion-backend-api-latest.onrender.com';

export const Contact = () => {
  const [activeField, setActiveField] = useState('');
  const [formData, setFormData] = useState({ email: '', linkedin: '', github: '' });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleClick = (type) => {
    setActiveField(type);
    setStatusMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = async () => {
  setIsSending(true);
  setStatusMessage('Sending...');
  const payload = {
    name: formData.github || formData.linkedin || 'Visitor',
    email: '', // triggers fallback
    github: formData.github,
    linkedin: formData.linkedin
  };

  try {
    const response = await fetch(`${API_URL}/contact-outreach`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.email_sent) {
      setStatusMessage('Email sent ✅ — If it hasn’t landed in your inbox, take a peek in your spam folder.');
    }
    if (formData.github && result.github_followed) {
      setStatusMessage('GitHub request sent ✅');
      setFormData(prev => ({ ...prev, github: '' }));
    }
    if (formData.linkedin && result.linkedin_connected) {
      setStatusMessage('LinkedIn request sent ✅ — If you don’t see it, check your LinkedIn notifications.');
      setFormData(prev => ({ ...prev, linkedin: '' }));
    }

    document.activeElement.blur();
  } catch (err) {
    console.error('Outreach failed:', err);
    setStatusMessage('Error sending request ❌');
  } finally {
    setIsSending(false);
  }
};


  const handleEmailSubmit = async () => {
    setIsSending(true);
    setStatusMessage('Sending...');
    try {
      const response = await fetch(`${API_URL}/contact-outreach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: '',
          email: '',
          github: '',
          linkedin: ''
        })
      });

      const result = await response.json();
      if (result.status === 'outreach triggered') {
        setStatusMessage('Email sent ✅ — If you don’t see it, please check your spam folder.');
      } else {
        setStatusMessage('Something went wrong ❌');
      }
    } catch (err) {
      console.error('Email outreach failed:', err);
      setStatusMessage('Error sending email ❌');
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  return (
    <section id="contact" className="contact-section">
      <div className="gradient-blinds" />
      <h1 className="contact-title">Let’s Connect</h1>
      <p className="contact-subtext">
        Just drop your email or profile link — I’ll take care of the rest.
      </p>

      <div className="contact-buttons">
        <button className="contact-btn email" onClick={() => handleClick('email')}>
          <i className="fas fa-envelope"></i> Email
        </button>
        <button className="contact-btn linkedin" onClick={() => handleClick('linkedin')}>
          <i className="fab fa-linkedin"></i> LinkedIn
        </button>
        <button className="contact-btn github" onClick={() => handleClick('github')}>
          <i className="fab fa-github"></i> GitHub
        </button>
      </div>

      <div className="contact-inputs">
        {activeField === 'email' && (
          <div className="email-action-wrapper">
            <div className="email-action-row">
              <span className="start-label">Start Conversation</span>
              <i
                className={`fas fa-paper-plane send-icon ${isSending ? 'sending' : ''}`}
                onClick={handleEmailSubmit}
              />
            </div>
            {statusMessage && <p className="status-text">{statusMessage}</p>}
          </div>
        )}

        {activeField === 'github' && (
          <div className="contact-action-wrapper">
            <div className="contact-action-row">
              <input
                type="text"
                name="github"
                placeholder="Enter GitHub username"
                value={formData.github}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="contact-input"
              />
              <i
                className={`fas fa-paper-plane send-icon ${isSending ? 'sending' : ''}`}
                onClick={handleSend}
              />
            </div>
            {statusMessage && <p className="contact-status">{statusMessage}</p>}
          </div>
        )}

        {activeField === 'linkedin' && (
          <div className="contact-action-wrapper">
            <div className="contact-action-row">
              <input
                type="text"
                name="linkedin"
                placeholder="Enter LinkedIn username"
                value={formData.linkedin}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="contact-input"
              />
              <i
                className={`fas fa-paper-plane send-icon ${isSending ? 'sending' : ''}`}
                onClick={handleSend}
              />
            </div>
            {statusMessage && <p className="contact-status">{statusMessage}</p>}
          </div>
        )}
      </div>
    </section>
  );
};
