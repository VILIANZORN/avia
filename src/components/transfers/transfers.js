import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setAllTransfer,
  setNoneTransfer,
  setOneTransfer,
  setTwoTransfer,
  setThreeTransfer,
  selectAllTransfer,
  selectNoneTransfer,
  selectOneTransfer,
  selectTwoTransfer,
  selectThreeTransfer,
} from '../../store/filterSlice';

import classes from './transfers.module.scss';

export default function Transfers() {
  const dispatch = useDispatch();
  const noneTransfer = useSelector(selectNoneTransfer);
  const oneTransfer = useSelector(selectOneTransfer);
  const twoTransfer = useSelector(selectTwoTransfer);
  const threeTransfer = useSelector(selectThreeTransfer);
  const allTransfer = useSelector(selectAllTransfer);

  const handleAllTransferChange = () => {
    dispatch(setAllTransfer(!allTransfer));
  };

  const handleNoneTransferChange = () => {
    dispatch(setNoneTransfer(!noneTransfer));
  };

  const handleOneTransferChange = () => {
    dispatch(setOneTransfer(!oneTransfer));
  };

  const handleTwoTransferChange = () => {
    dispatch(setTwoTransfer(!twoTransfer));
  };

  const handleThreeTransferChange = () => {
    dispatch(setThreeTransfer(!threeTransfer));
  };

  return (
    <div className={classes.transfers}>
      <p className={classes['transfers-header']}>количество пересадок</p>
      <ul className={`${classes.transfers__ul} ${classes['transfers--text']}`}>
        <li>
          <label>
            <input
              type="checkbox"
              className={classes['real-checkbox']}
              checked={allTransfer}
              onChange={handleAllTransferChange}
            />
            <span className={classes['custom-checkbox']} />
            Все
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              className={classes['real-checkbox']}
              checked={noneTransfer}
              onChange={handleNoneTransferChange}
            />
            <span className={classes['custom-checkbox']} />
            Без пересадок
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              className={classes['real-checkbox']}
              checked={oneTransfer}
              onChange={handleOneTransferChange}
            />
            <span className={classes['custom-checkbox']} />1 пересадка
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              className={classes['real-checkbox']}
              checked={twoTransfer}
              onChange={handleTwoTransferChange}
            />
            <span className={classes['custom-checkbox']} />2 пересадки
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              className={classes['real-checkbox']}
              checked={threeTransfer}
              onChange={handleThreeTransferChange}
            />
            <span className={classes['custom-checkbox']} />3 пересадки
          </label>
        </li>
      </ul>
    </div>
  );
}
