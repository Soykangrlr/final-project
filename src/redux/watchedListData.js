import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  watchListRedux: localStorage.getItem("watchListData")
    ? JSON.parse(localStorage.getItem("watchListData"))
    : false,
};
// watchList koleksiyon bilgileri saklandı ve storage yazıldı sayfa yenilendiinde bilgiler kalması için.
const watchListData = createSlice({
  name: "watchListData",
  initialState,
  reducers: {
    appendWatchList: (state, action) => {
      localStorage.setItem("watchListData", JSON.stringify(action.payload));
      state.watchListRedux = action.payload;
    },
    removeWatchlist: () => {
      localStorage.removeItem("watchListData");
    },
  },
});

export const { appendWatchList, removeWatchlist } = watchListData.actions;
export default watchListData.reducer;
