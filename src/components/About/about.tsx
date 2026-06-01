import React, { memo } from "react";
import TextType from "../../reactbits/TextType/TextType";
import ProfileCard from "../../reactbits/ProfileCard/ProfileCard";
import "./about.css";

interface AboutData {
  name:         string;
  title:        string;
  handle:       string;
  linkedin:     string;
  github:       string;
  bio:          string;
  typing_lines: string[];
}

interface AboutProps {
  data?: AboutData;
}

export const About = memo(({ data }: AboutProps) => {
  // Fallback values — shown while data loads or if backend is down
  const name        = typeof data?.name     === 'string' ? data.name     : "Mohammed Karab";
  const title       = typeof data?.title    === 'string' ? data.title    : "AI and Software Developer";
  const handle      = typeof data?.handle   === 'string' ? data.handle   : "Im-Mohammed";
  const linkedin    = typeof data?.linkedin === 'string' ? data.linkedin : "https://www.linkedin.com/in/mohammed-karab-ehtesham-469b83366";
  const bio         = typeof data?.bio      === 'string' ? data.bio      : "";
  const typingLines = Array.isArray(data?.typing_lines)
    ? data.typing_lines.filter((l: any) => typeof l === 'string')
    : ["I spend most of my time trying to make computers do what I want.",
      "I enjoy tinkering with AI, even if it occasionally ignores me."];

  return (
    <section id="about" className="about-container">

      {/* Left: Profile Card */}
      <div className="about-photo">
        <ProfileCard
          name={name}
          title={title}
          handle={handle}
          status="Online"
          contactText="Contact Me"
          avatarUrl="/images/about.png"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          grainUrl="/images/grain.png"
          iconUrl="/images/icon2.png"
          onContactClick={() => window.open(linkedin, '_blank')}
          behindGradient={undefined}
          innerGradient={undefined}
          miniAvatarUrl={undefined}
        />
      </div>

      {/* Right: Bio */}
      <div className="about-text">
        <h2>
          Hey, I'm <span className="highlight-name">
            {name.split(' ')[0]}
          </span>
        </h2>

        <TextType
          text={typingLines}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="_"
          variableSpeed={undefined}
          onSentenceComplete={undefined}
        />

        {bio && <p>{bio}</p>}
      </div>

    </section>
  );
});