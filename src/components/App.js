import React from 'react';

import logo from '../assets/logo.svg';
import '../styles/App.css';

import Status from './Status';

const App = () => (
  <div className='container'>
    <header>
      <img src={logo} className='akira-logo' alt='logo' />
    </header>
    <Status />
  </div>
);

export default App;
