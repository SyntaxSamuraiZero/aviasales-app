import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkedList: [],
  checkAll: false,
};

const checkboxSlice = createSlice({
  name: "checkbox",
  initialState,
  reducers: {
    setCheckedList: (state, action) => {
      state.checkedList = action.payload;
      state.checkAll = action.payload.length === 4;
    },
    setCheckAll: (state, action) => {
      state.checkAll = action.payload;
      state.checkedList = action.payload
        ? ["Без пересадок", "1 пересадка", "2 пересадки", "3 пересадки"]
        : [];
    },
  },
});

export const { setCheckedList, setCheckAll } = checkboxSlice.actions;

export default checkboxSlice.reducer;
