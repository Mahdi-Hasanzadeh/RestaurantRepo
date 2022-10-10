import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import Dishes from "./shared/dishes.js";
import Comments from "./shared/Comments.js";
import Promotions from "./shared/Promotions.js";
import Leaders from "./shared/Leaders.js";
import { nanoid } from "nanoid";
// const initialState = {
//   dishes: Dishes,
//   comments: Comments,
//   leaders: Leaders,
//   promotions: Promotions
// };

// const dataSlice = createSlice({
//   name: "data",
//   initialState
// });
// export const store = configureStore({
//   reducer: {
//     Data: dataSlice.reducer
//   }
//()
// });
//C
const initialStateForDishes = {
  dishes: Dishes
};
const initialStateForComments = {
  comments: Comments
};
const initialStateForLeaders = {
  leaders: Leaders
};
const initialStateForPromotions = {
  promotions: Promotions
};

// const initialState = {
//   dishes: Dishes,
//   leaders: Leaders,
//   promotions: Promotions,
//   comments: Comments
// };

const dishesSlice = createSlice({
  name: "dishes",
  initialState: initialStateForDishes
});
const commentsSlice = createSlice({
  name: "comments",
  initialState: { comments: Comments },
  reducers: {
    addComment: (state, action) => {
      const newcomment = {
        id: state.comments.length,
        dishId: action.payload.dishId,
        rating:
          action.payload.rating === "undefined" ? 1 : action.payload.rating,
        comment: action.payload.comment,
        author: action.payload.author,
        date: new Date().toLocaleDateString()
      };
      console.log(state.comments.length);
      console.log(action.payload);
      state.comments.push(newcomment);
      //?
    }
  }
});

const leadersSlice = createSlice({
  name: "leader",
  initialState: initialStateForLeaders
});

const promotionsSlice = createSlice({
  name: "promotions",
  initialState: initialStateForPromotions
});

export const { addComment } = commentsSlice.actions;

export const store = configureStore({
  reducer: {
    dishes: dishesSlice.reducer,
    comments: commentsSlice.reducer,
    promotions: promotionsSlice.reducer,
    leaders: leadersSlice.reducer
  }
});
