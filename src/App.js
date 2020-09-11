import React from 'react';
import './App.css';
import BreedList from './components/BreedList';
import GalleryImage from './components/GalleryImage';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="app">
        <div className="breeds">
          <BreedList
            listName="Principal breeds"
            breedList={this.state.breeds} />
          <BreedList
            listName="Sub-Breeds"
            breedList={this.state.subBreeds} />
        </div>
        <GalleryImage />
      </div>
    );
  }
}

export default App;
