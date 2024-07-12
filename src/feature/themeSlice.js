import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: false,
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.themeMode = !state.themeMode;
    },
  },
});

export const { toggleDarkMode } = ThemeSlice.actions;
export default ThemeSlice.reducer;
