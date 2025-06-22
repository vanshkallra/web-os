import React from 'react';
import { useSelector } from 'react-redux';
import Window from './template/Window';

const WindowManager = () => {
  const { windows } = useSelector(state => state.windows);

  const openWindows = windows.filter(window => window.windowState === 'open');

  return (
    <div className="window-manager">
      {openWindows.map(window => (
        <Window
          key={window.windowId}
          windowData={window}
        />
      ))}
    </div>
  );
};

export default WindowManager;