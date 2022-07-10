import React from 'react';
import logo from './codestepper.png';
import './App.css';

const styles = {
  img: {
    width: '300',
    height: '200',
    margin: '50px auto',
  },
} as const;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} style={styles.img} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
