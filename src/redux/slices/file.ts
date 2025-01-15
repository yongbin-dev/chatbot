import { createSlice } from "@reduxjs/toolkit";

// export enum EXTENSION {
//   PDF,
//   EXCEL,
//   IMG,
// }

export type FileType = {
  name: string;
  extension: string;
  size: string;
};

export interface FileState {
  currentFile: FileType | null;
}

const initialState: FileState = {
  currentFile: null,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setCurrentFile: (state, action) => {
      const currentFile = action.payload;
      state.currentFile = currentFile;
    },
    initCurrentFile: (state) => {
      state.currentFile = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentFile, initCurrentFile } = fileSlice.actions;
export default fileSlice.reducer;
