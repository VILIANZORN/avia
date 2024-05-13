import { createSlice } from '@reduxjs/toolkit';

const tabsSlice = createSlice({
  name: 'tabsReducer',
  initialState: {
    cheap: true,
    fast: false,
    optimal: false,
  },
  reducers: {
    setCheap(state) {
      state.cheap = true;
      state.fast = false;
      state.optimal = false;
    },
    setFast(state) {
      state.cheap = false;
      state.fast = true;
      state.optimal = false;
    },
    setOptimal(state) {
      state.cheap = false;
      state.fast = false;
      state.optimal = true;
    },
  },
});

export const { setCheap, setFast, setOptimal } = tabsSlice.actions;

export default tabsSlice.reducer;
