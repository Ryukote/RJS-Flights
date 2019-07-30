import React from 'react';
import './App.css';
import { OriginProvider } from './Components/Contexts/OriginContext';
import FlightSearch from './Components/FlightSearch/FlightSearch';

function App() {
  return (
    <OriginProvider>
      <FlightSearch/>
    </OriginProvider>
  );
}

export default App;
