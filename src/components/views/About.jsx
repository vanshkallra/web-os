import React from 'react';

const About = () => {
  return (
    <div className="about-content">
      <h2>About This OS Template</h2>
      <p>
        Welcome to the React OS Template! This is a modern, interactive desktop environment 
        built with React and Redux Toolkit.
      </p>
      <h3>Features:</h3>
      <ul>
        <li>✨ Draggable and resizable windows</li>
        <li>🎨 Multiple themes (Blueprint, Windows, MacOS)</li>
        <li>📱 Responsive design</li>
        <li>⚡ Built with React + Vite for fast development</li>
        <li>🔧 Redux Toolkit for state management</li>
        <li>🖱️ Interactive window management</li>
      </ul>
      <h3>Technology Stack:</h3>
      <ul>
        <li>React 18</li>
        <li>Redux Toolkit</li>
        <li>Vite</li>
        <li>Interact.js</li>
        <li>Lucide React Icons</li>
        <li>Moment.js</li>
      </ul>
      <p>
        Originally inspired by the Vue.js OS Template by DonChiaQE, 
        this version brings the same functionality to the React ecosystem.
      </p>
    </div>
  );
};

export default About;