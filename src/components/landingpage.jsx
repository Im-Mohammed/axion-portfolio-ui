import './landingpage.css';
import Spline from '@splinetool/react-spline';
import TextPressure from '../reactbits/TextPressure/TextPressure.jsx';    
import TrueFocus from '../reactbits/TrueFocus/TrueFocus.jsx';    

export const LandingPage = () => {
  return (
    <section id = "home" className="landing-section">
    <div className="landing-container">
      <div className="spline-scene">
        <Spline scene="/spline/scene.splinecode" />
      </div>

      {/* Overlay text */}
      <div className="variable-text">
        <div style={{position: 'relative', height: '200px'}}>
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
};

