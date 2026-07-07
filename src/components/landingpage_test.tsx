import { memo } from 'react';
import Spline from '@splinetool/react-spline';
import TextPressure from '../reactbits/TextPressure/TextPressure.jsx';
import TrueFocus from '../reactbits/TrueFocus/TrueFocus.jsx';
import './landingpage.css';

export const LandingPage = memo(() => {

  return (
    <section id="home" className="landing-section">
      <div className="landing-container">
        <div className="spline-scene">
          {/* Only render Spline when landing section is visible */}
          <Spline scene="/spline/scene.splinecode" />
        </div>
        <div className="variable-text">
          <div style={{ position: 'relative', height: '200px' }}>
            <TextPressure
              text="Mohammed  Karab  Ehtesham"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={false}
              italic={false}
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={25}
            />
          </div>
          <TrueFocus
            sentence="Welcome to My Portfolio"
            manualMode={false}
            blurAmount={10}
            borderColor="dark violet"
            animationDuration={2}
            pauseBetweenAnimations={1}
          />
        </div>
      </div>
    </section>
  );
});