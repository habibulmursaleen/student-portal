const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  filter: "total",
};

const markFilterSlice = createSlice({
  name: "markFilter",
  initialState,
  reducers: {
    filterSelected: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export default markFilterSlice.reducer;
export const { filterSelected } = markFilterSlice.actions;
