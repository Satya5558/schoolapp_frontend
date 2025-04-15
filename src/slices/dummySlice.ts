import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  name: null,
  age: null,
};

const dummySlice = createSlice({
  name: "dummySlice",
  initialState,
  reducers: {
    getReducer: function (state, payload) {
      state.name = payload.name;
      state.age = payload.age;
    },
    postreducer: function (state) {
      return state;
    },
  },
});

export const { getReducer, postreducer } = dummySlice.actions;

export default dummySlice.reducer;
