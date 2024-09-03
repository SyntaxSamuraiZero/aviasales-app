import React from 'react'

import logo from '../../assets/images/Logo.svg'
import CheckboxFilters from '../CheckboxFilters'
import SortRadioGroup from '../SortRadioGroup'
import TicketsList from '../TicketsList'

import styles from './App.module.scss'

export default function App() {
  return (
    <div>
      <header className={styles['header']}>
        <img className={styles['logo']} src={logo} alt='logo' />
      </header>
      <main className={styles['main']}>
        <CheckboxFilters />
        <div className={styles['tickets-page']}>
          <SortRadioGroup />
          <TicketsList />
        </div>
      </main>
    </div>
  )
}
