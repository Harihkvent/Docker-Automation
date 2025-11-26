import React from 'react';
import Navigation from './Navigation';
import hari from "../media/hari.jpeg";
import '../style/about.css';

export default function About() {
  return (
    <>
      <Navigation />
      <div className="about-page">
        <div className="about-header">
          <h1 className="about-title gradient-text">About Me</h1>
          <p className="about-subtitle">Building the future, one line at a time</p>
        </div>

        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-content">
              <div className="avatar-container">
                <div className="avatar-glow"></div>
                <img src={hari} alt="Hari Kiran" className="avatar-img" />
              </div>

              <div className="profile-info">
                <h2 className="profile-name">Hari Kiran</h2>
                <p className="profile-role">Full-Stack Developer • AI Enthusiast • DevOps Engineer</p>
                
                <p className="profile-bio">
                  Final-year <b>B.Tech student</b> specializing in Information Technology with a strong passion for 
                  <b> Full-Stack Development, Generative AI, and DevOps</b>. I've architected projects involving 
                  <b> Docker, MERN Stack, Chatbots, and AI-driven systems</b>. My mission is to build intelligent, 
                  scalable applications that combine cutting-edge AI with modern web technologies to solve real-world problems.
                </p>

                <div className="skills-section">
                  <h3 className="skills-title">Tech Stack & Expertise</h3>
                  <div className="skills-grid">
                    <span className="skill-tag">Docker</span>
                    <span className="skill-tag">MERN Stack</span>
                    <span className="skill-tag">TypeScript</span>
                    <span className="skill-tag">Generative AI</span>
                    <span className="skill-tag">DevOps</span>
                    <span className="skill-tag">React</span>
                    <span className="skill-tag">Node.js</span>
                    <span className="skill-tag">AI Chatbots</span>
                  </div>
                </div>

                <div className="social-links">
                  <a 
                    href="https://github.com/Harihkvent" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-btn github"
                  >
                    <span className="social-icon">🐙</span>
                    GitHub
                  </a>
                  <a 
                    href="http://linkedin.com/in/hari-kiran-ventrapragada" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-btn linkedin"
                  >
                    <span className="social-icon">💼</span>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
