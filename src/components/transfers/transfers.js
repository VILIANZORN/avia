import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAllTransfer, setNoneTransfer, setOneTransfer, setTwoTransfer, setThreeTransfer } from '../../store/filterSlice';

import classes from './transfers.module.scss';

export default function Transfers() {
  const dispatch = useDispatch();
  const filterState = useSelector(state => state.filter);

  const handleAllTransferChange = () => {
    dispatch(setAllTransfer(!filterState.allTransfer));
  };

  const handleNoneTransferChange = () => {
    dispatch(setNoneTransfer(!filterState.noneTransfer));
  };

  const handleOneTransferChange = () => {
    dispatch(setOneTransfer(!filterState.oneTransfer));
  };

  const handleTwoTransferChange = () => {
    dispatch(setTwoTransfer(!filterState.twoTransfer));
  };

  const handleThreeTransferChange = () => {
    dispatch(setThreeTransfer(!filterState.threeTransfer));
  };

  return (
    <div className={classes.transfers}>
      <p className={classes['transfers-header']}>количество пересадок</p>
      <ul className={`${classes.transfers__ul} ${classes['transfers--text']}`}>
        <li>
          <label>
            <input type="checkbox" className={classes['real-checkbox']} checked={filterState.allTransfer} onChange={handleAllTransferChange} />
            <span className={classes['custom-checkbox']} />
            Все
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" className={classes['real-checkbox']} checked={filterState.noneTransfer} onChange={handleNoneTransferChange} />
            <span className={classes['custom-checkbox']} />
            Без пересадок
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" className={classes['real-checkbox']} checked={filterState.oneTransfer} onChange={handleOneTransferChange} />
            <span className={classes['custom-checkbox']} />1 пересадка
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" className={classes['real-checkbox']} checked={filterState.twoTransfer} onChange={handleTwoTransferChange} />
            <span className={classes['custom-checkbox']} />2 пересадки
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" className={classes['real-checkbox']} checked={filterState.threeTransfer} onChange={handleThreeTransferChange} />
            <span className={classes['custom-checkbox']} />3 пересадки
          </label>
        </li>
      </ul>
    </div>
  );
}
