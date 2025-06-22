// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './store/store';
// import Navbar from './components/blueprint/Navbar';
// import AppGrid from './components/AppGrid';
// import WindowManager from './components/WindowManager';
// import './assets/css/blueprint/app.css';
// import './assets/css/blueprint/window.css';
// import './assets/css/blueprint/appgrid.css';


// function App() {
//   return (
//     <Provider store={store}>
//       <div className="App">
//         <div className="desktop">
//           <Navbar />
//           <AppGrid />
//           <WindowManager />
//         </div>
//       </div>
//     </Provider>
//   );
// }

// export default App;


// With Welcome loader animation

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/blueprint/Navbar';
import Appgrid from './components/Appgrid';
import WindowManager from './components/WindowManager';
import './assets/css/blueprint/app.css';
import './assets/css/blueprint/window.css';
import './assets/css/blueprint/appgrid.css';

const WelcomeScreen = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 1500);
    const timer3 = setTimeout(() => setStage(3), 2500);
    const timer4 = setTimeout(() => setFadeOut(true), 3500);
    const timer5 = setTimeout(() => onComplete(), 3700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  return (
    <div className={`welcome-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="welcome-bg">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>
      
      <div className="welcome-content">
        <div className={`welcome-logo ${stage >= 1 ? 'animate' : ''}`}>
          <div className="logo-cube">
            <div className="cube-face front">W</div>
            <div className="cube-face back">OS</div>
            <div className="cube-face right"></div>
            <div className="cube-face left"></div>
            <div className="cube-face top"></div>
            <div className="cube-face bottom"></div>
          </div>
        </div>
        
        <div className={`welcome-text ${stage >= 2 ? 'animate' : ''}`}>
          <h1>Welcome to WebOS</h1>
          <p>Experience your beloved OS on your browser</p>
        </div>
        
        <div className={`welcome-loader ${stage >= 3 ? 'animate' : ''}`}>
          <div className="loader-ring">
            <div className="loader-segment"></div>
            <div className="loader-segment"></div>
            <div className="loader-segment"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .welcome-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
          opacity: 1;
          transition: opacity 0.5s ease-out;
        }

        .welcome-screen.fade-out {
          opacity: 0;
        }

        .welcome-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.1;
        }

        .floating-shapes {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .shape-1 {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 120px;
          height: 120px;
          top: 60%;
          left: 80%;
          animation-delay: 1s;
        }

        .shape-3 {
          width: 60px;
          height: 60px;
          top: 30%;
          left: 70%;
          animation-delay: 2s;
        }

        .shape-4 {
          width: 100px;
          height: 100px;
          top: 70%;
          left: 20%;
          animation-delay: 1.5s;
        }

        .shape-5 {
          width: 40px;
          height: 40px;
          top: 10%;
          left: 50%;
          animation-delay: 0.5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .welcome-content {
          text-align: center;
          color: white;
          position: relative;
          z-index: 10;
        }

        .welcome-logo {
          margin-bottom: 2rem;
          opacity: 0;
          transform: scale(0.5) rotateY(-90deg);
          transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .welcome-logo.animate {
          opacity: 1;
          transform: scale(1) rotateY(0deg);
        }

        .logo-cube {
          width: 80px;
          height: 80px;
          position: relative;
          margin: 0 auto;
          transform-style: preserve-3d;
          animation: rotateCube 8s infinite linear;
        }

        .cube-face {
          position: absolute;
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          backdrop-filter: blur(10px);
        }

        .front { transform: rotateY(0deg) translateZ(40px); }
        .back { transform: rotateY(180deg) translateZ(40px); }
        .right { transform: rotateY(90deg) translateZ(40px); }
        .left { transform: rotateY(-90deg) translateZ(40px); }
        .top { transform: rotateX(90deg) translateZ(40px); }
        .bottom { transform: rotateX(-90deg) translateZ(40px); }

        @keyframes rotateCube {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }

        .welcome-text {
          margin-bottom: 2rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .welcome-text.animate {
          opacity: 1;
          transform: translateY(0px);
        }

        .welcome-text h1 {
          font-size: 3rem;
          margin: 0 0 1rem 0;
          font-weight: 300;
          letter-spacing: 2px;
        }

        .welcome-text p {
          font-size: 1.2rem;
          margin: 0;
          opacity: 0.8;
        }

        .welcome-loader {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.6s ease-out;
        }

        .welcome-loader.animate {
          opacity: 1;
          transform: scale(1);
        }

        .loader-ring {
          width: 60px;
          height: 60px;
          position: relative;
          margin: 0 auto;
        }

        .loader-segment {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 3px solid transparent;
          border-top: 3px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loader-segment:nth-child(2) {
          animation-delay: 0.3s;
          border-top-color: rgba(255, 255, 255, 0.6);
        }

        .loader-segment:nth-child(3) {
          animation-delay: 0.6s;
          border-top-color: rgba(255, 255, 255, 0.4);
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Remove the demo app styles - your original CSS will handle everything */
        .App {
          /* Your original app styles from app.css will take over */
        }

        .desktop {
          /* Your original desktop styles will take over */
        }
      `}</style>
    </div>
  );
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <Provider store={store}>
      <div className="App">
        {showWelcome && (
          <WelcomeScreen onComplete={() => setShowWelcome(false)} />
        )}
        <div className="desktop">
          <Navbar />
          <Appgrid />
          <WindowManager />
        </div>
      </div>
    </Provider>
  );
}

export default App;