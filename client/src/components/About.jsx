import React from 'react';
import Navigation from './Navigation';
import hari from "../media/hari.jpeg"; // make sure you add your image in media folder

export default function About() {
  return (
    <>
      <Navigation />
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', display :"flex", justifyContent:"center", flexDirection:"column",alignItems: "center" }}>
        <h1 style={{ textAlign: 'center' }}>About Me</h1>
        <p style={{ fontSize: '18px', lineHeight: '1.6' , maxWidth : "70vw"}}>
          Hi, I’m <b>Hari Kiran</b>, a final-year B.Tech student specializing in Information Technology with a strong interest in 
          <b> Full-Stack Development, Generative AI, and DevOps</b>.  
          I’ve worked on projects involving <b>Docker, MERN Stack, Chatbots, and AI-driven systems</b>.  
          My goal is to build intelligent, scalable applications that combine AI and modern web technologies 
          to solve real-world problems.
        </p>
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>Connect with me</h3>
          <ul style={{ listStyleType: 'none', padding: '0', display : 'flex', gap: '20px' }}>
            <li style={{ backgroundColor : "white", padding:"10px", display : 'flex', flexDirection : 'column', alignItems: "center", borderRadius: "10px" }}>
              <img src={hari} alt="Hari Kiran" style={{maxWidth : '120px', borderRadius:"50%"}}/>
              <p style={{color : 'black', marginTop: "10px"}}>Hari Kiran</p>
              <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer" style={{ color: '#0366d6', textDecoration: 'none' }}>
                GitHub
              </a>
              <a href="https://linkedin.com/in/your-linkedin-username" target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', textDecoration: 'none', marginTop: "5px" }}>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
