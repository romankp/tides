import React from 'react';
import PropTypes from 'prop-types';
import { localizeTime } from '../utils/componentUtils.js';

// Tide prediction is limited to 10 years from current date
const hilo = {
  H: 'high',
  L: 'low',
};

const PickedDate = ({
  // futureLoaded,
  formattedDate,
  predictionsFuture,
  onBackClick,
}) => (
  <div className="futureLoaded">
    <h2>{formattedDate}</h2>
    <ol>
      {predictionsFuture.map(({ type, t }) => {
        return (
          <li key={`${type}${t}`}>
            {hilo[type]} {localizeTime(t)}
          </li>
        );
      })}
    </ol>
    {/* <button className={'back'} type="button" onClick={onBackClick()}>
      &#8617;
    </button> */}
  </div>
);

PickedDate.propTypes = {
  // futureLoaded: PropTypes.bool,
  formattedDate: PropTypes.string,
  predictionsFuture: PropTypes.array,
  onBackClick: PropTypes.func,
};

export default PickedDate;
