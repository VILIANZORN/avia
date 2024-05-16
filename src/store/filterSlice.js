import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filterReducer',
  initialState: {
    allTransfer: true,
    noneTransfer: true,
    oneTransfer: true,
    twoTransfer: true,
    threeTransfer: true,
    filterActive: [0, 1, 2, 3]
  },
  reducers: {
    setAllTransfer(state, action) {
      const { payload } = action;
      state.allTransfer = payload;
      if (!payload) {
        state.noneTransfer = false;
        state.oneTransfer = false;
        state.twoTransfer = false;
        state.threeTransfer = false;
        state.filterActive = [];
      } else {
        state.noneTransfer = true;
        state.oneTransfer = true;
        state.twoTransfer = true;
        state.threeTransfer = true;
        state.filterActive = [0, 1, 2, 3];
      }
    },
    setNoneTransfer(state, action) {
      const { payload } = action;
      state.noneTransfer = payload;
      if (payload) {
        state.allTransfer = state.oneTransfer && state.twoTransfer && state.threeTransfer;
        if (!state.filterActive.includes(0)) {
          state.filterActive.push(0);
        }
      } else {
        state.allTransfer = false;
        state.filterActive = state.filterActive.filter(value => value !== 0);
      }
    },
    setOneTransfer(state, action) {
      const { payload } = action;
      state.oneTransfer = payload;
      if (payload) {
        state.allTransfer = state.noneTransfer && state.twoTransfer && state.threeTransfer;
        if (!state.filterActive.includes(1)) {
          state.filterActive.push(1);
        }
      } else {
        state.allTransfer = false;
        state.filterActive = state.filterActive.filter(value => value !== 1);
      }
    },
    setTwoTransfer(state, action) {
      const { payload } = action;
      state.twoTransfer = payload;
      if (payload) {
        state.allTransfer = state.noneTransfer && state.oneTransfer && state.threeTransfer;
        if (!state.filterActive.includes(2)) {
          state.filterActive.push(2);
        }
      } else {
        state.allTransfer = false;
        state.filterActive = state.filterActive.filter(value => value !== 2);
      }
    },
    setThreeTransfer(state, action) {
      const { payload } = action;
      state.threeTransfer = payload;
      if (payload) {
        state.allTransfer = state.noneTransfer && state.oneTransfer && state.twoTransfer;
        if (!state.filterActive.includes(3)) {
          state.filterActive.push(3);
        }
      } else {
        state.allTransfer = false;
        state.filterActive = state.filterActive.filter(value => value !== 3);
      }
    },
  },
});

export const { setAllTransfer, setNoneTransfer, setOneTransfer, setTwoTransfer, setThreeTransfer } = filterSlice.actions;
export const selectFilterActive = (state) => state.filter.filterActive;
export const selectThreeTransfer = (state) => state.filter.threeTransfer;
export const selectTwoTransfer = (state) => state.filter.twoTransfer;
export const selectOneTransfer = (state) => state.filter.oneTransfer;
export const selectNoneTransfer = (state) => state.filter.noneTransfer;
export const selectAllTransfer = (state) => state.filter.allTransfer;

export default filterSlice.reducer;
