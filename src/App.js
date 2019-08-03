import React from 'react';
import './App.css';
import { FlightProvider } from './Components/Contexts/FlightContext';
import FlightSearch from './Components/FlightSearch/FlightSearch';
import Search from './Components/Search/Search';

function App() {
  return (
    <FlightProvider>
      <FlightSearch/>
      <Search/>
    </FlightProvider>
  );
}

export default App;
