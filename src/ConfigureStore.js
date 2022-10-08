import { configureStore, createSlice } from "@reduxjs/toolkit";
import Dishes from "./shared/dishes.js";
import Comments from "./shared/Comments.js";
import Promotions from "./shared/Promotions.js";
import Leaders from "./shared/Leaders.js";
const initialState = {
  dishes: Dishes,
  comments: Comments,
  leaders: Leaders,
  promotions: Promotions
};

const dataSlice = createSlice({
  name: "data",
  initialState
});
export const store = configureStore({
  reducer: {
    Data: dataSlice.reducer
  }
});
