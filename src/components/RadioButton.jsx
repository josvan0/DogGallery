import React from 'react';
import PropTypes from 'prop-types';

import './RadioButton.css';
import { capitalize } from '../helpers/stringUtilities';

function RadioButton(props) {
  return (
    <label
      className="radio-btn"
      htmlFor={props.value}>
      {capitalize(props.value)}
      <input
        type="radio"
        defaultChecked={props.checked}
        name={props.groupName}
        id={props.value}
        value={props.value}
        onClick={props.selectHandler} />
      <span className="checkmark"></span>
    </label>
  );
}

RadioButton.propTypes = {
  checked: PropTypes.bool,
  groupName: PropTypes.string,
  selectHandler: PropTypes.func,
  value: PropTypes.string
};

RadioButton.defaultProps = {
  checked: false,
  groupName: 'radio',
  selectHandler: () => {},
  value: 'Value'
};

export default RadioButton;
