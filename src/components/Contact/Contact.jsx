import React, { useState, useEffect } from 'react';
import './Contact.css';

const API_URL = import.meta.env.VITE_API_URL;

export const Contact = () => {
  const [activeField, setActiveField]     = useState('');
  const [formData, setFormData]           = useState({ email: '', linkedin: '', github: '' });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSending, setIsSending]         = useState(false);

  // Read visitor context set by chatbot
  const visitorEmail = sessionStorage.getItem('visitor_email') || '';
  const visitorName  = sessionStorage.getItem('visitor_name')  || '';
  const visitorType  = sessionStorage.getItem('visitor_type')  || 'skipped';
  const isSkipped    = visitorType === 'skipped' || !visitorEmail;

  const handleClick = (type) => {
    setActiveField(type);
    setStatusMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // ── Email ─────────────────────────────────────────────────────────────
  const handleEmailSubmit = async () => {
    // Determine which email to use
    const emailToUse = isSkipped ? formData.email.trim() : visitorEmail;

    if (isSkipped && !emailToUse) {
      setStatusMessage('Please enter your email address.');
      return;
    }
    if (isSkipped && !emailToUse.includes('@')) {
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setIsSending(true);
    setStatusMessage('Sending…');

    try {
      const response = await fetch(`${API_URL}/contact-outreach`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:     visitorName || 'Visitor',
          email:    emailToUse,
          github:   '',
          linkedin: '',
        }),
      });

      const result = await response.json();

      if (result.email_sent) {
        setStatusMessage("Email sent — check your inbox or spam folder.");
        setFormData(prev => ({ ...prev, email: '' }));
      } else {
        setStatusMessage('Something went wrong. Please try again.');
      }
    } catch {
      setStatusMessage('Error sending email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  // ── GitHub / LinkedIn ─────────────────────────────────────────────────
  const handleSend = async () => {
    const value = formData[activeField]?.trim();
    if (!value) {
      setStatusMessage(`Please enter your ${activeField} username.`);
      return;
    }

    setIsSending(true);
    setStatusMessage('Sending…');

    const payload = {
      name:     visitorName || value,
      github:   activeField === 'github'   ? value : '',
      linkedin: activeField === 'linkedin' ? value : '',
    };

    try {
      const response = await fetch(`${API_URL}/contact-outreach`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      const result = await response.json();

      if (activeField === 'github' && result.github_followed) {
        setStatusMessage('GitHub follow request sent!');
        setFormData(prev => ({ ...prev, github: '' }));
      } else if (activeField === 'linkedin' && result.linkedin_connected) {
        setStatusMessage('LinkedIn connection request sent!');
        setFormData(prev => ({ ...prev, linkedin: '' }));
      } else {
        setStatusMessage('Request sent!');
      }

      document.activeElement?.blur();
    } catch {
      setStatusMessage('Error sending request. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  return (
    <>
      <section id="contact" className="contact-section">
        <div className="gradient-blinds" />
        <h1 className="contact-title">Let's Connect</h1>
        <p className="contact-subtext">
          Just drop your email or profile link — I'll take care of the rest.
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

          {/* ── Email ── */}
          {activeField === 'email' && (
            <div className="contact-action-wrapper">
              <div className="contact-action-row">

                {isSkipped ? (
                  // Skipped users — must enter their email
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyDown={e => e.key === 'Enter' && handleEmailSubmit()}
                    className="contact-input"
                    disabled={isSending}
                    autoFocus
                  />
                ) : (
                  // Visitor / HR — email already known, just confirm
                  <span className="contact-email-known">
                    Send to <strong>{visitorEmail}</strong>
                  </span>
                )}

                <i
                  className={`fas fa-paper-plane send-icon ${isSending ? 'sending' : ''}`}
                  onClick={handleEmailSubmit}
                />
              </div>
              {statusMessage && <p className="contact-status">{statusMessage}</p>}
            </div>
          )}

          {/* ── GitHub ── */}
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
                  disabled={isSending}
                />
                <i
                  className={`fas fa-paper-plane send-icon ${isSending ? 'sending' : ''}`}
                  onClick={handleSend}
                />
              </div>
              {statusMessage && <p className="contact-status">{statusMessage}</p>}
            </div>
          )}

          {/* ── LinkedIn ── */}
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
                  disabled={isSending}
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

      <footer className="portfolio-footer">
        © 2025 Mohammed Karab Ehtesham. All rights reserved.
      </footer>
    </>
  );
};