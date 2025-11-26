import React, { useState, useEffect } from 'react'
import "../style/home.css"
import dockerImage from "../media/docker.png"
import Navigation from './Navigation';

export default function Home() {

  const TypingEffect = ({ text, speed }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      if (index < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText + text[index]);
          setIndex(index + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    }, [index, displayedText, text, speed]);
  
    return <h1 className="main-title gradient-text">{displayedText}</h1>;
  };

  return (
    <>
    <Navigation />
    <section className="home-section">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="main-head">
        <div className="logo-container">
          <div className="logo-glow"></div>
          <img src={dockerImage} alt="Docker" className="main-image"/>
        </div>
        
        <TypingEffect text="Docker Automation" speed={50} />
        
        <p className="subtitle">
          Next-Generation Container Management Platform
        </p>
        
        <div className="feature-pills">
          <span className="pill">Intelligent</span>
          <span className="pill">Fast</span>
          <span className="pill">Secure</span>
        </div>
      </div>
    </section>
    </>
  )
}
