import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Empty, Spin, Alert } from 'antd';

import ShowMore from '../show-more/show-more';
import { fetchSearchId, fetchTickets } from '../../store/cardSlice';
import Card from '../card/card';

import classes from './cardLIst.module.scss';

export default function CardList() {
  const dispatch = useDispatch();

  const fetchSearchIdDispatch = () => dispatch(fetchSearchId());
  const fetchTicketsDispatch = (id) => dispatch(fetchTickets(id));

  const [ticketValue, setTicketValue] = useState(5);
  const [err, setErr] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const { tickets, searchId, loading } = useSelector((state) => state.card);
  const { cheap, fast, optimal } = useSelector((state) => state.tabs);
  const { filterActive } = useSelector((state) => state.filter);

  const filtredTickets = tickets.filter((ticket) => {
    const { segments } = ticket;
    return segments.every((segment) => filterActive.includes(segment.stops.length));
  });
  const sortedPrice = filtredTickets.slice().sort((a, b) => a.price - b.price);
  const sortedDate = filtredTickets.slice().sort((a, b) => a.segments[0].duration - b.segments[0].duration);
  const loadingBar = loading ? <Spin /> : null;
  let maxTickets = sortedPrice.slice(0, ticketValue);
  
  const errorCatchingFetchTickets = (id) => {
    fetchTicketsDispatch(id)
      .unwrap()
      .catch(() => {
        setErr(prev => prev + 1);
        if (err < 3) { 
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
    if (searchId !==null && filterActive.length !== 0) {
      errorCatchingFetchTickets(searchId);
    }
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
  );
}
