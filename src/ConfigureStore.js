import {
  configureStore,
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import Dishes from "./shared/dishes.js";
import Comments from "./shared/Comments.js";
import Promotions from "./shared/Promotions.js";
import Leaders from "./shared/Leaders.js";

//()
//C

const initialStateForDishes = {
  dishes: Dishes,
  isLoading: false
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

const dishesSlice = createSlice({
  name: "dishes",
  initialState: initialStateForDishes
});

const commentsSlice = createSlice({
  name: "comments",
  initialState: { comments: initialStateForComments },
  reducers: {
    addComment: (state, action) => {
      const newcomment = {
        id: state.comments.comments.length,
        dishId: action.payload.dishId,
        rating:
          action.payload.rating === "undefined" ? 1 : action.payload.rating,
        comment: action.payload.comment,
        author: action.payload.author,
        date: new Date().toLocaleDateString()
      };
      // console.log(state.comments.length);
      // console.log(action.payload);
      // console.log(state.comments.comments);
      state.comments.comments.push(newcomment);
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
