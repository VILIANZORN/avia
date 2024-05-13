import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCheap, setFast, setOptimal } from '../../store/tabsSlice';

import classes from './tabs.module.scss';

export default function Tabs() {
  const dispatch = useDispatch();
  const { cheap, fast, optimal } = useSelector((state) => state.tabs);

  const handleCheapClick = () => {
    dispatch(setCheap());
  };

  const handleFastClick = () => {
    dispatch(setFast());
  };

  const handleOptimalClick = () => {
    dispatch(setOptimal());
  };

  return (
    <div className={`${classes.tabs} ${classes['tabs--text']}`}>
      <button
        className={`${classes.tab} ${classes['tab-left']} ${cheap ? classes.tab__active : ''}`}
        onClick={handleCheapClick}
        type="button"
      >
        самый дешевый
      </button>
      <button
        className={`${classes.tab} ${fast ? classes.tab__active : ''}`}
        onClick={handleFastClick}
        type="button"
      >
        самый быстрый
      </button>
      <button
        className={`${classes.tab} ${classes['tab-right']} ${optimal ? classes.tab__active : ''}`}
        onClick={handleOptimalClick}
        type="button"
      >
        любые
      </button>
    </div>
  );
}
