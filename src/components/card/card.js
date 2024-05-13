import React from 'react';
import { format, add } from 'date-fns';

import classes from './card.module.scss';

export default function Card({ price, carrier, segments }) {
  function flightTime(num) {
    return `${Math.floor(segments[num].duration / 60)}ч ${segments[num].duration % 60}м`;
  }

  function flightTimeStart(num) {
    return format(new Date(segments[num].date), 'HH:mm');
  }

  function flightTimeEnd(num) {
    return format(
      add(new Date(segments[num].date), {
        minutes: segments[num].duration,
      }),
      'HH:mm'
    );
  }

  function flightStopsText(num) {
    let result = '';
    const stops = segments[num].stops.length;
    switch (stops) {
      case 0:
        result = `без пересадок`;
        break;
      case 1:
        result = `1 пересадка`;
        break;
      default:
        result = `${stops} пересадки`;
        break;
    }
    return result;
  }

  function flightSegment(num) {
    return (
      <div className={classes['main-info']}>
        <div>
          <p className={classes['card__area-up']}>
            {segments[num].origin}, {segments[num].destination}
          </p>
          <p className={classes['card__area-down']}>{`${flightTimeStart(num)}-${flightTimeEnd(num)}`}</p>
        </div>
        <div>
          <p className={classes['card__area-up']}>в пути</p>
          <p className={classes['card__area-down']}>{flightTime(num)}</p>
        </div>
        <div>
          <p className={classes['card__area-up']}>{flightStopsText(num)}</p>
          <p className={classes['card__area-down']}>{segments[num].stops.join(', ')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.card}>
      <div className={classes.container}>
        <div className={classes.card__header}>
          <p className={classes.card__price}>{price} P</p>
          <img className={classes.card__img} alt="#" src={`//pics.avs.io/99/36/${carrier}.png`} />
        </div>
        <div className={classes['card__main-info']}>
          {flightSegment(0)}
          {flightSegment(1)}
        </div>
      </div>
    </div>
  );
}
