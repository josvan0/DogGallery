import React from 'react';
import './App.css';
import BreedList from './components/BreedList';
import GalleryImage from './components/GalleryImage';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <div className="breeds">
          <BreedList
            listName="Principal breeds" />
          <BreedList
            listName="Sub-Breeds" />
        </div>
        <GalleryImage />
      </div>
    );
  }
}

export default App;
