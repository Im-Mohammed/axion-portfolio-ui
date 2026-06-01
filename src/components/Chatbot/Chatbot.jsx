import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import SplitText from '../../reactbits/SplitText/SplitText';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DarkVeil from '../../reactbits/DarkVeil/DarkVeil';
import { setCache } from '../../portfolioCache';
import './Chatbot.css';

const API = import.meta.env.VITE_API_URL;

// ── Glass button ───────────────────────────────────────────────────────────
const GlassButton = ({ label, onClick, disabled = false }) => (
  <motion.button
    whileHover={{
      scale:           disabled ? 1 : 1.05,
      backgroundColor: '#7e22ce',
      color:           '#fff',
      boxShadow:       '0 0 15px rgba(126,34,206,0.6)',
    }}
    whileTap={{ scale: disabled ? 1 : 0.95 }}
    className="glass-button"
    onClick={onClick}
    disabled={disabled}
    style={{ opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
  >
    {label}
  </motion.button>
);

// ── Back button ────────────────────────────────────────────────────────────
const BackButton = ({ onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05, color: '#7e22ce' }}
    whileTap={{ scale: 0.95 }}
    className="back-button"
    onClick={onClick}
  >
    ← Back
  </motion.button>
);

// ── ChatBot ────────────────────────────────────────────────────────────────
export default function ChatBot() {

  // Wake backend + prefetch portfolio data while user fills the form
  useEffect(() => {
    fetch(`${API}/health`, { cache: 'no-store' }).catch(() => {});
    fetch(`${API}/portfolio/all`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setCache(data); })
      .catch(() => {});
  }, []);

  const [step, setStep]                       = useState(0);
  const [role, setRole]                       = useState('');
  const [name, setName]                       = useState('');
  const [company, setCompany]                 = useState('');
  const [isHiring, setIsHiring]               = useState(null);
  const [roleDescription, setRoleDescription] = useState('');
  const [hrEmail, setHrEmail]                 = useState('');
  const [visitorEmail, setVisitorEmail]       = useState('');
  const [resumeSent, setResumeSent]           = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState('');
  const [redirecting, setRedirecting]         = useState(false);
  const [skipping, setSkipping]               = useState(false);
  const navigate                              = useNavigate();

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => {
    setError('');
    setStep(prev => Math.max(prev - 1, 0));
  };

  // ── Save visitor context for Contact component ─────────────────────────
  const saveContext = (email, type) => {
    sessionStorage.setItem('visitor_email', email);
    sessionStorage.setItem('visitor_name',  name.trim());
    sessionStorage.setItem('visitor_type',  type);
  };

  // ── Log visitor to backend ─────────────────────────────────────────────
  const logVisitor = async (answers) => {
    const email = role === 'hr' ? hrEmail.trim() : visitorEmail.trim();

    await fetch(`${API}/log-visitor`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:     name.trim(),
        email:    email,
        userType: role,
        company:  company.trim(),
        role:     '',
        answers:  answers,
        isHiring: isHiring,
      }),
    });

    // Save context so Contact component knows the visitor's email
    saveContext(email, role);
  };

  // ── Log skip — no PII collected ────────────────────────────────────────
  const logSkip = async () => {
    try {
      await fetch(`${API}/log-skip`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch {
      // fail silently — never block navigation
    }
  };

  // ── Skip handler ───────────────────────────────────────────────────────
  const handleSkip = async () => {
    if (skipping) return;   // prevent double-click
    setSkipping(true);

    // Mark as skipped — Contact will show email input field
    sessionStorage.setItem('visitor_email', '');
    sessionStorage.setItem('visitor_name',  '');
    sessionStorage.setItem('visitor_type',  'skipped');

    await logSkip();
    navigate('/home');
  };

  // ── Visitor flow ───────────────────────────────────────────────────────
  const handleVisitorFlow = async () => {
    if (!visitorEmail.trim()) {
      setError('Please enter your email.');
      return;
    }
    setError('');
    setRedirecting(true);
    try {
      await logVisitor('Exploring portfolio');
    } catch {
      // fail silently — still navigate
    }
    setTimeout(() => navigate('/home'), 1500);
  };

  // ── HR — hiring ────────────────────────────────────────────────────────
  const sendCustomizedResume = async () => {
    if (!roleDescription.trim()) {
      setError('Please describe the role.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await logVisitor(`Hiring for: ${roleDescription}`);
      setResumeSent(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── HR — not hiring ────────────────────────────────────────────────────
  const sendDefaultResume = async () => {
    setLoading(true);
    try {
      await logVisitor('Not hiring, exploring the portfolio');
      setResumeSent(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Navigate to /home after resume sent
  useEffect(() => {
    if (resumeSent) {
      setTimeout(() => navigate('/home'), 1500);
    }
  }, [resumeSent]);

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="chatbot-container">
      <div className="background-layer">
        <DarkVeil />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="chat-box"
      >
        <div className="chat-inner">
          <div className="chat-content">
            {step > 0 && <BackButton onClick={prevStep} />}

            <SplitText
              text="Welcome to Mohammed's digital frontier. I'm Axion—your adaptive co-pilot."
              type="lines"
              className="chat-text typing-text"
            />

            <AnimatePresence>

              {/* ── Step 0 — Role selection ── */}
              {step === 0 && (
                <>
                  <p className="chat-subtext">
                    This isn't just a portfolio — it's a precision-crafted interface
                    where design listens and intelligence responds.
                  </p>
                  <p className="chat-subtext mt-2">
                    Let's begin. Who do I have the honor of guiding today?
                  </p>
                  <div className="button-group">
                    <GlassButton
                      label="Visitor"
                      onClick={() => { setRole('visitor'); nextStep(); }}
                    />
                    <GlassButton
                      label="HR"
                      onClick={() => { setRole('hr'); nextStep(); }}
                    />
                    <GlassButton
                      label={skipping ? 'Going…' : 'Skip'}
                      onClick={handleSkip}
                      disabled={skipping}
                    />
                  </div>
                </>
              )}

              {/* ── Step 1 — Name ── */}
              {step === 1 && (
                <>
                  <p className="chat-subtext">
                    May I have your name? <span className="required">*</span>
                  </p>
                  <input
                    type="text"
                    className="chat-input"
                    value={name}
                    onChange={e => { setName(e.target.value); setError(''); }}
                    placeholder="Enter your name"
                    autoFocus
                  />
                  {error && <p className="chat-subtext error-text">{error}</p>}
                  <div className="button-group">
                    <GlassButton
                      label="Next"
                      onClick={() => {
                        if (!name.trim()) { setError('Please enter your name.'); return; }
                        setError('');
                        nextStep();
                      }}
                    />
                  </div>
                </>
              )}

              {/* ── Step 2 — Visitor email ── */}
              {step === 2 && role === 'visitor' && (
                <>
                  <p className="chat-subtext">
                    And your email? <span className="required">*</span>
                  </p>
                  <input
                    type="email"
                    className="chat-input"
                    value={visitorEmail}
                    onChange={e => { setVisitorEmail(e.target.value); setError(''); }}
                    placeholder="Enter your email"
                    autoFocus
                  />
                  {error && <p className="chat-subtext error-text">{error}</p>}
                  <div className="button-group">
                    <GlassButton
                      label={redirecting ? 'Redirecting…' : 'Continue to Portfolio'}
                      onClick={handleVisitorFlow}
                      disabled={redirecting}
                    />
                  </div>
                  {redirecting && (
                    <p className="chat-subtext mt-3">Taking you to the portfolio…</p>
                  )}
                </>
              )}

              {/* ── Step 2 — HR company ── */}
              {step === 2 && role === 'hr' && (
                <>
                  <p className="chat-subtext">
                    Your company? <span className="required">*</span>
                  </p>
                  <input
                    type="text"
                    className="chat-input"
                    value={company}
                    onChange={e => { setCompany(e.target.value); setError(''); }}
                    placeholder="Enter company name"
                    autoFocus
                  />
                  {error && <p className="chat-subtext error-text">{error}</p>}
                  <div className="button-group">
                    <GlassButton
                      label="Next"
                      onClick={() => {
                        if (!company.trim()) { setError('Please enter your company name.'); return; }
                        setError('');
                        nextStep();
                      }}
                    />
                  </div>
                </>
              )}

              {/* ── Step 3 — HR email ── */}
              {step === 3 && role === 'hr' && (
                <>
                  <p className="chat-subtext">
                    Your email? <span className="required">*</span>
                  </p>
                  <input
                    type="email"
                    className="chat-input"
                    value={hrEmail}
                    onChange={e => { setHrEmail(e.target.value); setError(''); }}
                    placeholder="Enter your email"
                    autoFocus
                  />
                  {error && <p className="chat-subtext error-text">{error}</p>}
                  <div className="button-group">
                    <GlassButton
                      label="Next"
                      onClick={() => {
                        if (!hrEmail.trim()) { setError('Please enter your email.'); return; }
                        setError('');
                        nextStep();
                      }}
                    />
                  </div>
                </>
              )}

              {/* ── Step 4 — HR hiring? ── */}
              {step === 4 && role === 'hr' && (
                <>
                  <p className="chat-subtext">
                    Are you currently looking to hire?
                  </p>
                  <div className="button-group">
                    <GlassButton label="Yes" onClick={() => { setIsHiring(true);  nextStep(); }} />
                    <GlassButton label="No"  onClick={() => { setIsHiring(false); nextStep(); }} />
                  </div>
                </>
              )}

              {/* ── Step 5 — HR role description ── */}
              {step === 5 && isHiring === true && (
                <>
                  <p className="chat-subtext">
                    Great! Could you describe the role you're hiring for?
                  </p>
                  <textarea
                    className="chat-input"
                    value={roleDescription}
                    onChange={e => { setRoleDescription(e.target.value); setError(''); }}
                    placeholder="Describe the role"
                    autoFocus
                  />
                  {error && <p className="chat-subtext error-text">{error}</p>}
                  <div className="button-group">
                    <GlassButton
                      label={loading ? 'Sending…' : 'Send Resume'}
                      onClick={sendCustomizedResume}
                      disabled={loading}
                    />
                  </div>
                </>
              )}

              {/* ── Step 5 — HR not hiring ── */}
              {step === 5 && isHiring === false && (
                <>
                  <p className="chat-subtext">
                    No problem — I'll send Mohammed's resume for future reference.
                  </p>
                  <div className="button-group">
                    <GlassButton
                      label={loading ? 'Sending…' : 'Send Resume'}
                      onClick={sendDefaultResume}
                      disabled={loading}
                    />
                  </div>
                </>
              )}

              {/* ── Status ── */}
              {resumeSent && (
                <p className="chat-subtext mt-3">
                  You'll receive an email shortly — check your inbox or spam folder.
                  Taking you to the portfolio now…
                </p>
              )}

            </AnimatePresence>
          </div>

          {/* ── Spline robot ── */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="chat-robot"
          >
            <Spline scene="/spline/scene2.splinecode" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}