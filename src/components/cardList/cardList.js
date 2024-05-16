import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Empty, Spin, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import ShowMore from '../show-more/show-more';
import { fetchSearchId, fetchTickets, setLoading, setSearchId, setTickets } from '../../store/cardSlice';
import { selectFilterActive } from '../../store/filterSlice'
import { selectCheap, selectFast, selectOptimal } from '../../store/tabsSlice'
import Card from '../card/card';

import classes from './cardLIst.module.scss';

export default function CardList() {
  const dispatch = useDispatch();

  const fetchSearchIdDispatch = () => dispatch(fetchSearchId());
  const fetchTicketsDispatch = (id) => dispatch(fetchTickets(id));

  const [ticketValue, setTicketValue] = useState(5);
  const [errorCount, setErrorCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const tickets = useSelector(setTickets);
  const searchId = useSelector(setSearchId);
  const loading = useSelector(setLoading);
  const cheap = useSelector(selectCheap);
  const fast = useSelector(selectFast);
  const optimal = useSelector(selectOptimal);
  const filterActive = useSelector(selectFilterActive);

  const filtredTickets = tickets.filter((ticket) => {
    const { segments } = ticket;
    return segments.every((segment) => filterActive.includes(segment.stops.length));
  });
  const sortedPrice = filtredTickets.slice().sort((a, b) => a.price - b.price);
  const sortedDate = filtredTickets.slice().sort((a, b) => a.segments[0].duration - b.segments[0].duration);
  const loadingBar = loading ? <Spin /> : null;
  let maxTickets = sortedPrice.slice(0, ticketValue);

  const errorCatchingFetchTickets = (id) => {
    if (!navigator.onLine) return; 
    fetchTicketsDispatch(id)
      .unwrap()
      .catch(() => {
        setErrorCount((prevCount) => prevCount + 1);
        if (errorCount < 3) {
          errorCatchingFetchTickets(id);
        } else {
          setShowAlert(true);
        }
      });
  };

  useEffect(() => {
    if (searchId === null) fetchSearchIdDispatch();
  }, []);

  useEffect(() => {
    if (searchId !== null ) {
      errorCatchingFetchTickets(searchId);
    }
  }, [searchId, tickets, errorCount]);

  useEffect(() => {
    const handleOnline = () => {
      if (searchId !== null ) {
        errorCatchingFetchTickets(searchId);
      }
    };
  
    window.addEventListener('online', handleOnline);
  
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [searchId, tickets]);

  const handleShowMore = () => {
    setTicketValue(ticketValue + 5);
  };

  if (cheap) {
    maxTickets = sortedPrice.slice(0, ticketValue);
  }
  if (fast) {
    maxTickets = sortedDate.slice(0, ticketValue);
  }
  if (optimal) {
    maxTickets = filtredTickets.slice(0, ticketValue);
  }

  return (
    <>
      <Online>
        <div className={classes.cardList}>
          {loadingBar}
          {showAlert && <Alert message="Произошла ошибка при загрузке данных, обновите страницу" type="error" />}
          {maxTickets.map((ticket) => (
            <Card key={uuidv4()} {...ticket} />
          ))}
          {filtredTickets.length ? (
            <ShowMore onClick={handleShowMore} />
          ) : (
            <Empty description="Рейсов, подходящих под заданные фильтры, не найдено" />
          )}
        </div>
      </Online>
      <Offline>
        <Alert message="Error" description="К сожалению ты не в сети(" type="error" />
      </Offline>
    </>
  );
}
