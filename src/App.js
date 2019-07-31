import React from 'react';
import './App.css';
import { FlightProvider } from './Components/Contexts/FlightContext';
import FlightSearch from './Components/FlightSearch/FlightSearch';

function App() {
  return (
    <FlightProvider>
      <FlightSearch/>
    </FlightProvider>
  );
}

export default App;
