import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { localizeTime } from '../utils/parsers.js';

const hilo = {
  H: 'high',
  L: 'low'
};

const Today = ({ predictions, date }) => {
  return (
    <Fragment>
      <h2>Today / {date}</h2>
      <ol>
        {predictions.map(({ type, t }) => {
          return (
            <li key={t}>
              {hilo[type]} {localizeTime(t)}
            </li>
          );
        })}
      </ol>
    </Fragment>
  );
};

Today.propTypes = {
  predictions: PropTypes.array,
  date: PropTypes.string
};

export default Today;
