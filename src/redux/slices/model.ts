import { createSlice } from "@reduxjs/toolkit";

export interface ModelState {
  model: string;
}

const initialState: ModelState = {
  model: "gpt-3.5-turbo",
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    changeModel: (state, action) => {
      const model = action.payload.model;
      state.model = model;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeModel } = modelSlice.actions;
export default modelSlice.reducer;
