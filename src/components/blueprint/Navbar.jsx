import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAppGridStatus, openWindow } from '../../store/store';
import { Grid, Clock } from 'lucide-react';
import moment from 'moment';

const Navbar = () => {
  const dispatch = useDispatch();
  const { appGridStatus, windows } = useSelector(state => state.windows);
  const [currentTime, setCurrentTime] = React.useState(moment().format('HH:mm'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().format('HH:mm'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleAppGrid = () => {
    dispatch(setAppGridStatus(!appGridStatus));
  };

  const minimizedWindows = windows.filter(window => window.windowState === 'minimize');

  const handleWindowRestore = (windowId) => {
    dispatch(openWindow(windowId));
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="app-grid-toggle" onClick={toggleAppGrid}>
          <Grid size={20} />
        </button>
      </div>
      
      <div className="navbar-center">
        <div className="minimized-windows">
          {minimizedWindows.map(window => (
            <button
              key={window.windowId}
              className="minimized-window-btn"
              onClick={() => handleWindowRestore(window.windowId)}
            >
              <img
                src={`/src/assets/icons/${window.iconImage}`}
                alt={window.altText}
                className="window-icon"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="icon-fallback" style={{ display: 'none' }}>
                📱
              </span>
              <span className="window-title">{window.displayName}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="navbar-right">
        <div className="time-display">
          <Clock size={16} />
          <span>{currentTime}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;