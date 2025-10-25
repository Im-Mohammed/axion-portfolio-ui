import React from "react";
import TextType from "../../reactbits/TextType/TextType";
import ProfileCard from "../../reactbits/ProfileCard/ProfileCard";

import "./about.css";

export const About = () => {
  return (
     <section id ="about" className="about-container">
      {/* Left: Profile Card */}
      <div className="about-photo">
        <ProfileCard
                  name="Mohammed Karab"
                  title="AI and Software Developer"
                  handle="Im-Mohammed"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="/images/about.png"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  grainUrl="/images/grain.png"
                  iconUrl="/images/icon2.png"
                  onContactClick={() => window.open('https://www.linkedin.com/in/mohammed-karab-ehtesham-469b83366', '_blank')}
                  behindGradient={undefined}
                  innerGradient={undefined}
                  miniAvatarUrl={undefined}
                />
      </div>

      {/* Right: Bio */}
      <div className="about-text">
        <h2>
  Hey, I'm <span className="highlight-name">Mohammed</span>
</h2>


      <TextType
          text={["I spend most of my time trying to make computers do what I want, which sometimes involves talking to them like they’re humans.", 
    "I enjoy tinkering with AI, even if it occasionally ignores me.", 
    "I solve coding problems at a reasonable pace, with occasional coffee breaks.", 
    "I try to turn complex ideas into something understandable, and sometimes I succeed."]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="_" variableSpeed={undefined} onSentenceComplete={undefined}/>
        <p>
          I mess with AI, break things in security, and fix them smarter. I craft digital experiences that don’t just work — they impress. Complex problems? That’s where I have the most fun. Always building today what others will call the future tomorrow.
        </p>

      
      </div>
    </section>
  );
};