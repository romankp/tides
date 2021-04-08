import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { localizeTime } from '../utils/componentUtils.js';

const hilo = {
  H: 'high',
  L: 'low',
};

const checkNext = (thisType, thisTime, nextEvent) => {
  if (thisType === nextEvent.type && thisTime === nextEvent.t) {
    return true;
  }
  return false;
};

const Today = ({ predictions, date, nextEvent }) => {
  return (
    <Fragment>
      <h2>Today / {date}</h2>
      <ol>
        {predictions.map(({ type, t }) => {
          const isNext = checkNext(type, t, nextEvent);
          return (
            <li key={`${type}${t}`} className={isNext ? 'isNext' : ''}>
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
  date: PropTypes.string,
  nextEvent: PropTypes.object,
};

export default Today;
