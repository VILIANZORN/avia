import React from 'react';

import classes from './show-more.module.scss';

export default function ShowMore({onClick}) {
  return (
    <div>
      <button className={classes['show-more']} type="button" onClick={onClick}>
        Показать ещё 5 билетов
      </button>
    </div>
  );
}
