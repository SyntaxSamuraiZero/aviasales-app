import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://aviasales-test-api.kata.academy/search')
    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`)
    }
    const data = await response.json()
    return data.searchId
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (searchId, { dispatch, rejectWithValue }) => {
    let stop = false

    while (!stop) {
      try {
        const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
        if (response.status === 500) {
          continue
        }
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`)
        }
        const data = await response.json()
        dispatch(addTickets(data.tickets))

        if (data.stop) {
          stop = true
        }
      } catch (error) {
        return rejectWithValue(error.message)
      }
    }
  }
)

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    searchId: null,
    tickets: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTickets: (state, action) => {
      state.tickets = state.tickets.concat(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.loading = false
        state.searchId = action.payload
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchTickets.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTickets.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { addTickets } = ticketsSlice.actions

export default ticketsSlice.reducer
