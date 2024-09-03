import { configureStore } from '@reduxjs/toolkit'

import checkboxReducer from './checkboxSlice'
import sortReducer from './sortSlice'
import ticketsReducer from './ticketsSlice'

const store = configureStore({
  reducer: {
    checkbox: checkboxReducer,
    sort: sortReducer,
    tickets: ticketsReducer,
  },
})

export default store
