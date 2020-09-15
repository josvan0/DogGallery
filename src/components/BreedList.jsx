import React from 'react';
import PropTypes from 'prop-types';

import './BreedList.css';
import RadioButton from './RadioButton';

function BreedList(props) {
  const breeds = props.breedList.map(breed => {
    return (
      <li key={breed}>
        <RadioButton
          value={breed}
          groupName={props.listName}
          selectHandler={props.selectHandler} />
      </li>
    );
  });

  return (
    <div className="breed-list">
      <h2>{props.listName}</h2>
      <ul>
        <li key="all">
          <RadioButton
            value="all"
            groupName={props.listName}
            checked={true}
            selectHandler={props.selectHandler} />
        </li>
        {breeds}
      </ul>
    </div>
  );
}

BreedList.propTypes = {
  breedList: PropTypes.array,
  listName: PropTypes.string,
  selectHandler: PropTypes.func
};

BreedList.defaultProps = {
  breedList: [],
  listName: 'Breeds',
  selectHandler: () => {}
};

export default BreedList;
