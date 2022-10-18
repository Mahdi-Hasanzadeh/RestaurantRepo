import {
  configureStore,
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

//()
//C
const url = "http://localhost:5000/";

const initialStateForDishes = {
  dishes: [],
  isLoading: true
};

const initialStateForComments = {
  comments: [],
  isLoading: true
};

const initialStateForLeaders = {
  leaders: [],
  isLoading: true
};

const initialStateForPromotions = {
  promotions: [],
  isLoading: true
};

const fetchData = async ulrSection => {
  try {
    const response = await fetch(`${url}${ulrSection}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = response.status + ":" + response.statusText;
      const throwable = {
        status: response.ok,
        error: error
      };
      throw throwable;
    }
  } catch (err) {
    console.log(err.message);
    if (err.message === "Failed to fetch") {
      return {
        status: false,
        error: err.message
      };
    } else {
      return err;
    }
  }
};

export const getLeaders = createAsyncThunk("leader/getLeaders", () => {
  return fetchData("leaders");
});

export const getComments = createAsyncThunk("comments/getComments", () => {
  return fetchData("comments");
});

export const getDishes = createAsyncThunk("dishes/getDishes", () => {
  return fetchData("dishes");
});

export const getPromotions = createAsyncThunk(
  "promotions/getPromotions",
  () => {
    return fetchData("promotions");
  }
);

const Add = async value => {
  await fetch(`${url}comments`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(value)
  });
};

const dishesSlice = createSlice({
  name: "dishes",
  initialState: initialStateForDishes,
  extraReducers: {
    [getDishes.pending]: state => {
      state.isLoading = true;
    },
    [getDishes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.dishes = action.payload;
    },
    [getDishes.rejected]: state => {
      state.isLoading = false;
    }
  }
});

const commentsSlice = createSlice({
  name: "comments",
  initialState: { comments: initialStateForComments },
  reducers: {
    addComment: (state, action) => {
      const newcomment = {
        id: state.comments.comments.length,
        dishId: action.payload.dishId,
        rating: action.payload.rating,
        comment: action.payload.comment,
        author: action.payload.author,
        date: new Date().toLocaleDateString()
      };
      state.comments.comments.push(newcomment);
      Add(newcomment);
      //?
      //()
      //C
    }
  },
  extraReducers: {
    [getComments.pending]: state => {
      state.comments.isLoading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.comments = action.payload;
    },
    [getComments.rejected]: state => {
      state.comments.isLoading = false;
    }
  }
});

const leadersSlice = createSlice({
  name: "leader",
  initialState: initialStateForLeaders,
  extraReducers: {
    [getLeaders.pending]: state => {
      state.isLoading = true;
    },
    [getLeaders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.leaders = action.payload;
    },
    [getLeaders.rejected]: state => {
      state.isLoading = false;
    }
  }
});

const promotionsSlice = createSlice({
  name: "promotions",
  initialState: initialStateForPromotions,
  extraReducers: {
    [getPromotions.pending]: state => {
      state.isLoading = true;
    },
    [getPromotions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.promotions = action.payload;
    },
    [getPromotions.rejected]: state => {
      state.isLoading = false;
    }
  }
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
