import React from 'react';
import './App.css';
import BreedList from './components/BreedList';
import GalleryImage from './components/GalleryImage';

function App() {
  return (
    <div className="app">
      <BreedList />
      <GalleryImage />
    </div>
  );
}

export default App;
