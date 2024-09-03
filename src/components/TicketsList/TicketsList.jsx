import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Spin, Alert, Progress } from 'antd'

import Ticket from '../Ticket'
import { fetchSearchId, fetchTickets } from '../../store/ticketsSlice'
import filterAndSortTickets from '../../utils/filteredTickets'

import style from './TicketsList.module.scss'

export default function TicketsList() {
  const [visibleCount, setVisibleCount] = useState(5)
  const [percent, setPercent] = useState(0)

  const dispatch = useDispatch()
  const { checkedList } = useSelector((state) => state.checkbox)
  const { sortType } = useSelector((state) => state.sort)
  const { searchId, tickets, loading, error } = useSelector((state) => state.tickets)

  useEffect(() => {
    if (!searchId) {
      dispatch(fetchSearchId())
    } else {
      dispatch(fetchTickets(searchId))
    }
  }, [dispatch, searchId])

  useEffect(() => {
    if (tickets.length > 0) {
      const newPercent = Math.round((tickets.length / 9381) * 100)
      setPercent(newPercent)
    }
  }, [tickets])

  useEffect(() => {
    if (!loading) {
      setPercent(100)
    }
  }, [loading])

  if (loading && tickets.length === 0) {
    return (
      <div className={style['spin']}>
        <Spin size='large' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='error'>
        <Alert message='Error' description={error.message} type='error' showIcon />
      </div>
    )
  }

  if (checkedList.length === 0) {
    return (
      <div className='info'>
        <Alert message='Info' description='Рейсов, подходящих под заданные фильтры, не найдено' type='info' showIcon />
      </div>
    )
  }

  return (
    <>
      {loading && <Progress percent={percent} />}
      <ul className='tickets-list'>
        {filterAndSortTickets(tickets, checkedList, sortType)
          .slice(0, visibleCount)
          .map((ticket, index) => (
            <Ticket key={index} ticket={ticket} />
          ))}
      </ul>
      {visibleCount < tickets.length && checkedList.length !== 0 && (
        <Button
          className={style['show-more']}
          onClick={() => {
            setVisibleCount((prevCount) => prevCount + 5)
          }}
          type='primary'
        >
          Показать еще 5 билетов!
        </Button>
      )}
    </>
  )
}
