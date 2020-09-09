import React from 'react';
import './BreedList.css';

class BreedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: [],
      subBreeds: []
    };

    this.handleBreedSelect = this.handleBreedSelect.bind(this);
  }

  componentDidMount() {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.status === 'success') {
          this.setState({
            breeds: Object.keys(json.message)
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleBreedSelect(e) {
    if (e.target.value === '') {
      this.setState({
        subBreeds: []
      });
    } else {
      fetch(`https://dog.ceo/api/breed/${e.target.value}/list`)
        .then(response => {
          return response.json();
        })
        .then(json => {
          if (json.status === 'success') {
            this.setState({
              subBreeds: json.message
            });
          }
        })
        .catch(err => {
          console.error(err);
        })
    }
  }

  render() {
    const breedList = this.state.breeds.map(breed => {
      return (
        <li key={breed}>
          <input
            type="radio"
            name="breed"
            id={breed}
            value={breed}
            onClick={this.handleBreedSelect} />
          <label htmlFor={breed}>{breed}</label>
        </li>
      );
    });

    const subBreedList = this.state.subBreeds.map(subBreed => {
      return <li key={subBreed}>{subBreed}</li>;
    });

    return (
      <div className="breeds">
        <div id="principal-breeds">
          <h2>Breeds</h2>
          <ul>
            <li key="all">
              <input
                defaultChecked
                type="radio"
                name="breed"
                id="all"
                value=""
                onClick={this.handleBreedSelect} />
              <label htmlFor="all">All</label>
            </li>
            {breedList}
          </ul>
        </div>
        <div id="sub-breeds">
          <h2>Sub-breeds</h2>
          { this.state.subBreeds.length === 0
              ? <p>This breed hasn't sub-breeds</p>
          : <ul>{subBreedList}</ul> }
        </div>
      </div>
    );
  }
}

export default BreedList;
