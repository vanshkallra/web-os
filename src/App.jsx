import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/blueprint/Navbar';
import AppGrid from './components/AppGrid';
import WindowManager from './components/WindowManager';
import './assets/css/blueprint/app.css';
import './assets/css/blueprint/window.css';
import './assets/css/blueprint/appgrid.css';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="desktop">
          <Navbar />
          <AppGrid />
          <WindowManager />
        </div>
      </div>
    </Provider>
  );
}

export default App;