const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  assignment: 0,
  quiz: 0,
  subTotal: 0,
};

const markSlice = createSlice({
  name: "marks",
  initialState,
  reducers: {
    assignment: (state, action) => {
      state.assignment = action.payload;
      state.subTotal = state.subTotal + state.assignment;
    },
    quiz: (state, action) => {
      state.quiz = action.payload;
      state.subTotal = state.subTotal + state.quiz;
    },
  },
});

export default markSlice.reducer;
export const { assignment, quiz } = markSlice.actions;
