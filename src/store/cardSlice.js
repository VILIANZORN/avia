import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSearchId = createAsyncThunk(
  'tickets/fetchSearchId',
  async () => {
    const response = await fetch(
      'https://aviasales-test-api.kata.academy/search',
    );
    const data = await response.json();
    return data.searchId;
  },
);

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTicketsPack',
  async (id) => {
    const response = await fetch(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`,
    );
    const data = await response.json();
    return data;
  },
);

const cardSlice = createSlice({
  name: 'card',
  initialState: {
    tickets: [],
    loading: false,
    searchId: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action ) => {
        if(!action.payload.stop){
          state.tickets = [...state.tickets, ...action.payload.tickets];
        }
        if(action.payload.stop){
          state.loading = false;
        }
      })
  },
});

export default cardSlice.reducer;
