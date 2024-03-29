import { createSlice } from "@reduxjs/toolkit";

export interface ModelState {
  model: string;
  isPic: boolean;
}

const initialState: ModelState = {
  model: "gpt-3.5-turbo",
  isPic: false,
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    changeModel: (state, action) => {
      const model = action.payload.model;
      const isPic = action.payload.isPic;

      if (model) {
        state.model = model;
      }

      if (isPic != null) {
        state.isPic = isPic;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeModel } = modelSlice.actions;
export default modelSlice.reducer;
