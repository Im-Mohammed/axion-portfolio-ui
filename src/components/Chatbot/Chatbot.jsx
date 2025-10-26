import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import SplitText from '../../reactbits/SplitText/SplitText';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DarkVeil from '../../reactbits/DarkVeil/DarkVeil';
import './Chatbot.css';

const GlassButton = ({ label, onClick }) => (
  <motion.button
    whileHover={{
      scale: 1.05,
      backgroundColor: '#7e22ce',
      color: '#fff',
      boxShadow: '0 0 15px rgba(126,34,206,0.6)',
    }}
    whileTap={{ scale: 0.95 }}
    className="glass-button"
    onClick={onClick}
  >
    {label}
  </motion.button>
);

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

export default function ChatBot() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isHiring, setIsHiring] = useState(null);
  const [roleDescription, setRoleDescription] = useState('');
  const [hrEmail, setHrEmail] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [resumeSent, setResumeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'https://moportfolio-backend.onrender.com';

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  const sendContactRequest = async (answers) => {
  try {
    await fetch(`${API_URL}/log-visitor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email: role === 'hr' ? hrEmail : visitorEmail,
        linkedin: '',
        github: '',
        company: role === 'hr' ? company : '',
        type: role === 'hr' ? 'HR' : 'Visitor',
        answers,
        userType: role === 'hr' ? 'hr' : 'visitor',
        isHiring
      }),
    });
  } catch (err) {
    console.error('Error sending contact request:', err);
  }
};


  const handleVisitorFlow = async () => {
    try {
      await sendContactRequest('Exploring portfolio');
      setTimeout(() => navigate('/home'), 2000);
    } catch (err) {
      console.error('Error in visitor flow:', err);
      navigate('/home');
    }
  };

  const sendCustomizedResume = async () => {
  setLoading(true);
  try {
    await sendContactRequest(`Hiring for: ${roleDescription}`);
    setResumeSent(true);
  } catch (err) {
    console.error('Error sending customized resume:', err);
    setError('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};


  const sendDefaultResume = async () => {
  setLoading(true);
  try {
    await sendContactRequest('Not hiring, just exploring the portfolio');
    setResumeSent(true);
  } catch (err) {
    console.error('Error sending default resume:', err);
    setError('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (resumeSent) {
      setTimeout(() => navigate('/home'), 1500);
    }
  }, [resumeSent]);

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
              text="Welcome to Mohammed’s digital frontier. I’m Axion—your adaptive co-pilot."
              type="lines"
              className="chat-text typing-text"
            />

            <AnimatePresence>
              {step === 0 && (
                <>
                  <p className="chat-subtext">
                    This isn’t just a portfolio—it’s a precision-crafted interface where design listens and intelligence responds.
                  </p>
                  <p className="chat-subtext mt-2">Let’s begin. Who do I have the honor of guiding today?</p>
                  <div className="button-group">
                    <GlassButton label="Visitor" onClick={() => { setRole('visitor'); nextStep(); }} />
                    <GlassButton label="HR" onClick={() => { setRole('hr'); nextStep(); }} />
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <p className="chat-subtext">May I have your name? <span className="required">*</span></p>
                  <input
                    type="text"
                    className="chat-input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                  <div className="button-group">
                    <GlassButton label="Next" onClick={nextStep} />
                  </div>
                </>
              )}

              {step === 2 && role === 'visitor' && (
                <>
                  <p className="chat-subtext">And your email? <span className="required">*</span></p>
                  <input
                    type="email"
                    className="chat-input"
                    value={visitorEmail}
                    onChange={e => setVisitorEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <div className="button-group">
                    <GlassButton label="Continue to Portfolio" onClick={handleVisitorFlow} />
                  </div>
                </>
              )}

              {step === 2 && role === 'hr' && (
                <>
                  <p className="chat-subtext">Your company? <span className="required">*</span></p>
                  <input
                    type="text"
                    className="chat-input"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="Enter company name"
                  />
                  <div className="button-group">
                    <GlassButton label="Next" onClick={nextStep} />
                  </div>
                </>
              )}

              {step === 3 && role === 'hr' && (
                <>
                  <p className="chat-subtext">Your email Please ? <span className="required">*</span></p>
                  <input
                    type="email"
                    className="chat-input"
                    value={hrEmail}
                    onChange={e => setHrEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <div className="button-group">
                    <GlassButton label="Next" onClick={nextStep} />
                  </div>
                </>
              )}

              {step === 4 && role === 'hr' && (
                <>
                  <p className="chat-subtext">Are you currently looking to hire a candidate?</p>
                  <div className="button-group">
                    <GlassButton label="Yes" onClick={() => { setIsHiring(true); nextStep(); }} />
                    <GlassButton label="No" onClick={() => { setIsHiring(false); nextStep(); }} />
                  </div>
                </>
              )}

              {step === 5 && isHiring === true && (
                <>
                  <p className="chat-subtext">Great! Could you describe the role you're hiring for?</p>
                  <textarea
                    className="chat-input"
                    value={roleDescription}
                    onChange={e => setRoleDescription(e.target.value)}
                    placeholder="Describe the role"
                  />
                                    <div className="button-group">
                    <GlassButton label="Send Resume" onClick={sendCustomizedResume} />
                  </div>
                </>
              )}

              {step === 5 && isHiring === false && (
                <>
                  <p className="chat-subtext">No problem. I’ll still send you Mohammed’s resume for future reference.</p>
                  <div className="button-group">
                    <GlassButton label="Send Resume" onClick={sendDefaultResume} />
                  </div>
                </>
              )}

              {loading && <p className="chat-subtext mt-3">Sending resume…</p>}
              {resumeSent && (<p className="chat-subtext mt-3">Resume sent via email  — If you don’t see it, please check your spam folder or promotions tab.</p>
    )}

              {error && <p className="chat-subtext error-text">{error}</p>}
            </AnimatePresence>
          </div>

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
