import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  watch: localStorage.getItem("watchedData")
    ? JSON.parse(localStorage.getItem("watchedData"))
    : false,
};
// watched koleksiyon bilgileri saklandı ve storage yazıldı sayfa yenilendiinde bilgiler kalması için.
const watchedData = createSlice({
  name: "watchedData",
  initialState,
  reducers: {
    appendWatched: (state, action) => {
      localStorage.setItem("watchedData", JSON.stringify(action.payload));
      state.watch = action.payload;
    },
    removeWatched: () => {
      localStorage.removeItem("watchedData");
    },
  },
});

export const { appendWatched, removeWatched } = watchedData.actions;
export default watchedData.reducer;
