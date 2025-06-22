import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAppGridStatus, openWindow, focusWindow } from '../store/store';

const Appgrid = () => {
  const dispatch = useDispatch();
  const { appGridStatus, windows } = useSelector(state => state.windows);

  const handleAppClick = (windowId) => {
    dispatch(openWindow(windowId));
    dispatch(focusWindow(windowId));
    dispatch(setAppGridStatus(false));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(setAppGridStatus(false));
    }
  };

  if (!appGridStatus) return null;

  return (
    <div className="app-grid-overlay" onClick={handleOverlayClick}>
      <div className="app-grid">
        <h2 className="app-grid-title">Applications</h2>
        <div className="app-grid-container">
          {windows.map(window => (
            <div
              key={window.windowId}
              className="app-grid-item"
              onClick={() => handleAppClick(window.windowId)}
            >
              <div className="app-icon">
                <img
                  src={`/src/assets/icons/${window.iconImage}`}
                  alt={window.altText}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="icon-fallback" style={{ display: 'none' }}>
                  📱
                </span>
              </div>
              <span className="app-name">{window.displayName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appgrid;