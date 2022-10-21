import {
  configureStore,
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import { database } from "./Firebaseconfiguration.js";

import { collection, getDocs } from "firebase/firestore";
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

//

const fetchLeaders = async () => {
  const dbInstance = collection(database, "leaders");
  try {
    const response = await getDocs(dbInstance);
    if (response.size === 0) {
      const e = "error";
      throw e;
    } else {
      const data = await response.docs.map(item => {
        return {
          id: item.id,
          ...item.data()
        };
      });

      //console.log(data);
      return data;
    }
  } catch (err) {
    //console.log("leaderError", err.message);
    if (err === "error") {
      return {
        status: false,
        error: "check Your Internet connection"
      };
    } else {
      return {
        status: false,
        error: err.message
      };
    }
  }
};
const fetchDishes = async () => {
  const dbInstance = collection(database, "dishes");

  try {
    const response = await getDocs(dbInstance);
    if (response.size === 0) {
      const e = "error";
      throw e;
    } else {
      const data = await response.docs.map(item => {
        return {
          id: item.id,
          ...item.data()
        };
      });
      //console.log(data);
      return data;
    }
    //console.log("con", response.docs.map(item => item.data()));
  } catch (err) {
    if (err === "error") {
      return {
        status: false,
        error: "check Your Internet connection"
      };
    } else {
      return {
        status: false,
        error: err.message
      };
    }
  }
};
const fetchcomments = async () => {
  const dbInstance = collection(database, "comments");
  try {
    const response = await getDocs(dbInstance);
    // console.log(response.docs.length);
    if (response.size === 0) {
      const e = "error";
      throw e;
    } else {
      const data = await response.docs.map(item => {
        return {
          id: item.id,
          ...item.data()
        };
      });

      //console.log(data);
      return data;
    }
  } catch (err) {
    if (err === "error") {
      return {
        status: false,
        error: "check Your Internet connection"
      };
    } else {
      return {
        status: false,
        error: err.message
      };
    }
  }
};
const fetchPromotions = async () => {
  const dbInstance = collection(database, "promotions");
  try {
    const response = await getDocs(dbInstance);
    if (response.size === 0) {
      const e = "error";
      throw e;
    } else {
      const data = await response.docs.map(item => item.data());

      //console.log(data);
      return data;
    }
  } catch (err) {
    if (err === "error") {
      return {
        status: false,
        error: "check Your Internet connection"
      };
    } else {
      return {
        status: false,
        error: err.message
      };
    }
  }
};

// const fetchData = async ulrSection => {
//   try {
//     const response = await fetch(`${url}${ulrSection}`);
//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       const error = response.status + ":" + response.statusText;
//       const throwable = {
//         status: response.ok,
//         error: error
//       };
//       throw throwable;
//     }
//   } catch (err) {
//     console.log(err.message);
//     if (err.message === "Failed to fetch") {
//       return {
//         status: false,
//         error: err.message
//       };
//     } else {
//       return err;
//     }
//   }
// };

//

export const getLeaders = createAsyncThunk("leader/getLeaders", () => {
  return fetchLeaders();
});

export const getComments = createAsyncThunk("comments/getComments", () => {
  return fetchcomments();
});

export const getDishes = createAsyncThunk("dishes/getDishes", () => {
  return fetchDishes();
});

export const getPromotions = createAsyncThunk(
  "promotions/getPromotions",
  () => {
    return fetchPromotions();
  }
);

const Add = async value => {
  try {
    await fetch(`${url}comments`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(value)
    });
  } catch (error) {
    alert("something went wrong");
  }
};

const saveFeedback = async value => {
  try {
    const res = await fetch(`${url}feedback`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(value)
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  } catch (error) {
    alert("something went wrong");
  }
};

const dishesSlice = createSlice({
  name: "dishes",
  initialState: initialStateForDishes,
  extraReducers: {
    [getDishes.pending]: state => {
      state.isLoading = true;
    },
    [getDishes.fulfilled]: (state, action) => {
      // let newArr = [];
      // let firebaseData = action.payload.map(item => {
      // console.log({
      //   id: item.id,
      //   ...item.data()
      // });
      //   return f.push({
      //     id: item.id,
      //     ...item.data()
      //   });
      // });
      // console.log(f);
      state.isLoading = false;
      state.dishes = action.payload;
      // console.log("dishes", action.payload.map(item => item.data()));
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
      Add(newcomment);

      state.comments.comments.push(newcomment);

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
      //console.log("leader", action.payload);
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
const feedbackSlice = createSlice({
  name: "feedback",
  initialState: [],
  reducers: {
    postFeedback: (state, action) => {
      console.log(action.payload);
      saveFeedback(action.payload);
    }
  }
});

export const { addComment } = commentsSlice.actions;
export const { postFeedback } = feedbackSlice.actions;

export const store = configureStore({
  reducer: {
    dishes: dishesSlice.reducer,
    comments: commentsSlice.reducer,
    promotions: promotionsSlice.reducer,
    leaders: leadersSlice.reducer,
    feedback: feedbackSlice.reducer
  }
});
// (() => {
//   addDoc(collection(database, "dishes"), {
//     name: "Uthappizza",
//     image: "/assets/images/uthappizza.png",
//     category: "mains",
//     label: "Hot",
//     price: "4.99",
//     featured: true,
//     description:
//       "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer."
//   });
//   addDoc(collection(database, "dishes"), {
//     name: "Zucchipakoda",
//     image: "/assets/images/zucchipakoda.png",
//     category: "appetizer",
//     label: "",
//     price: "1.99",
//     featured: false,
//     description:
//       "Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce"
//   });

//   addDoc(collection(database, "dishes"), {
//     name: "Vadonut",
//     image: "/assets/images/vadonut.png",
//     category: "appetizer",
//     label: "New",
//     price: "1.99",
//     featured: false,
//     description:
//       "A quintessential ConFusion experience, is it a vada or is it a donut?"
//   });
//   addDoc(collection(database, "dishes"), {
//     name: "ElaiCheese Cake",
//     image: "/assets/images/elaicheesecake.png",
//     category: "dessert",
//     label: "",
//     price: "2.99",
//     featured: false,
//     description:
//       "A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms"
//   });
// })();
//(() => {
//const dbInstance = collection(database, "dishes");
//})();

//(() => {
//const dbInstance = collection(database, "leaders");

// addDoc(dbInstance, {
//   name: "Peter Pan",
//   image: "/assets/images/alberto.png",
//   designation: "Chief Epicurious Officer",
//   abbr: "CEO",
//   featured: false,
//   description:
//     "Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous journey to the shores of America with the intention of giving their children the best future. His mother's wizardy in the kitchen whipping up the tastiest dishes with whatever is available inexpensively at the supermarket, was his first inspiration to create the fusion cuisines for which The Frying Pan became well known. He brings his zeal for fusion cuisines to this restaurant, pioneering cross-cultural culinary connections."
// });

// addDoc(dbInstance, {
//   name: "Dhanasekaran Witherspoon",
//   image: "/assets/images/MahdiHasanzadeh.jpg",
//   designation: "Chief Food Officer",
//   abbr: "CFO",
//   featured: false,
//   description:
//     "Our CFO, Danny, as he is affectionately referred to by his colleagues, comes from a long established family tradition in farming and produce. His experiences growing up on a farm in the Australian outback gave him great appreciation for varieties of food sources. As he puts it in his own words, Everything that runs, wins, and everything that stays, pays!"
// })
//   .then(resp => console.log("added"))
//   .catch(error => alert(error.message));
// addDoc(dbInstance, {
//   name: "Agumbe Tang",
//   image: "/assets/images/alberto.png",
//   designation: "Chief Taste Officer",
//   abbr: "CTO",
//   featured: false,
//   description:
//     "Blessed with the most discerning gustatory sense, Agumbe, our CFO, personally ensures that every dish that we serve meets his exacting tastes. Our chefs dread the tongue lashing that ensues if their dish does not meet his exacting standards. He lives by his motto, You click only if you survive my lick."
// })
//   .then(resp => console.log("added"))
//   .catch(error => alert(error.message));

// addDoc(dbInstance, {
//   name: "Mahdi Hasanzadeh",
//   image: "/assets/images/MahdiHasanzadeh.jpg",
//   designation: "Executive Chef",
//   abbr: "EC",
//   featured: true,
//   description:
//     "Award winning three-star Michelin chef with wide International experience having worked closely with whos-who in the culinary world, he specializes in creating mouthwatering Indo-Italian fusion experiences. He says, Put together the cuisines from the two craziest cultures, and you get a winning hit! Amma Mia!"
// });
//})();

// const db = collection(database, "comments");
// addDoc(collection(database, "comments"), {
//   dishId: "HdfSSnUf586midWGGjNm",
//   rating: 5,
//   comment: "Imagine all the eatables, living in conFusion!",
//   author: "John Lemon",
//   date: "2012-10-16T17:57:28.556094Z"
// });
// addDoc(collection(database, "comments"), {
//   dishId: "HdfSSnUf586midWGGjNm",
//   rating: 4,
//   comment:
//     "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
//   author: "Paul McVites",
//   date: "2014-09-05T17:57:28.556094Z"
// });
// addDoc(db, {
//   dishId: "HdfSSnUf586midWGGjNm",
//   rating: 3,
//   comment: "Eat it, just eat it!",
//   author: "Michael Jaikishan",
//   date: "2015-02-13T17:57:28.556094Z"
// });

// addDoc(db, {
//   dishId: "HdfSSnUf586midWGGjNm",
//   rating: 4,
//   comment: "Ultimate, Reaching for the stars!",
//   author: "Ringo Starry",
//   date: "2013-12-02T17:57:28.556094Z"
// });

// addDoc(db, {
//   dishId: "HdfSSnUf586midWGGjNm",
//   rating: 2,
//   comment: "It's your birthday, we're gonna party!",
//   author: "25 Cent",
//   date: "2011-12-02T17:57:28.556094Z"
// });

// addDoc(db, {
//   dishId: "qEUEwBw8HnZjKHsNUvXk",
//   rating: 5,
//   comment: "Imagine all the eatables, living in conFusion!",
//   author: "John Lemon",
//   date: "2012-10-16T17:57:28.556094Z"
// });

// addDoc(
//   db,

//   {
//     dishId: "qEUEwBw8HnZjKHsNUvXk",
//     rating: 4,
//     comment:
//       "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
//     author: "Paul McVites",
//     date: "2014-09-05T17:57:28.556094Z"
//   }
// );

// addDoc(db, {
//   dishId: "qEUEwBw8HnZjKHsNUvXk",
//   rating: 3,
//   comment: "Eat it, just eat it!",
//   author: "Michael Jaikishan",
//   date: "2015-02-13T17:57:28.556094Z"
// });

// addDoc(
//   db,

//   {
//     dishId: "qEUEwBw8HnZjKHsNUvXk",
//     rating: 4,
//     comment: "Ultimate, Reaching for the stars!",
//     author: "Ringo Starry",
//     date: "2013-12-02T17:57:28.556094Z"
//   }
// );

// addDoc(db, {
//   dishId: "qEUEwBw8HnZjKHsNUvXk",
//   rating: 2,
//   comment: "It's your birthday, we're gonna party!",
//   author: "25 Cent",
//   date: "2011-12-02T17:57:28.556094Z"
// });

// addDoc(db, {
//   dishId: "tEEPu71Efa4Q28k41xDX",
//   rating: 5,
//   comment: "Imagine all the eatables, living in conFusion!",
//   author: "John Lemon",
//   date: "2012-10-16T17:57:28.556094Z"
// });

// addDoc(
//   db,

//   {
//     dishId: "tEEPu71Efa4Q28k41xDX",
//     rating: 4,
//     comment:
//       "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
//     author: "Paul McVites",
//     date: "2014-09-05T17:57:28.556094Z"
//   }
// );

// addDoc(db, {
//   dishId: "tEEPu71Efa4Q28k41xDX",
//   rating: 3,
//   comment: "Eat it, just eat it!",
//   author: "Michael Jaikishan",
//   date: "2015-02-13T17:57:28.556094Z"
// });

// addDoc(db, {
//   dishId: "tEEPu71Efa4Q28k41xDX",
//   rating: 4,
//   comment: "Ultimate, Reaching for the stars!",
//   author: "Ringo Starry",
//   date: "2013-12-02T17:57:28.556094Z"
// });

// addDoc(db, {
//   dishId: "tEEPu71Efa4Q28k41xDX",
//   rating: 2,
//   comment: "It's your birthday, we're gonna party!",
//   author: "25 Cent",
//   date: "2011-12-02T17:57:28.556094Z"
// });

// addDoc(db, {
//   dishId: "x83bITvc8JIuBAqtp7Ma",
//   rating: 5,
//   comment: "Imagine all the eatables, living in conFusion!",
//   author: "John Lemon",
//   date: "2012-10-16T17:57:28.556094Z"
// });

// addDoc(db, {
//   id: 16,
//   dishId: "x83bITvc8JIuBAqtp7Ma",
//   rating: 4,
//   comment:
//     "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
//   author: "Paul McVites",
//   date: "2014-09-05T17:57:28.556094Z"
// });

// addDoc(db, {
//   dishId: "x83bITvc8JIuBAqtp7Ma",
//   rating: 3,
//   comment: "Eat it, just eat it!",
//   author: "Michael Jaikishan",
//   date: "2015-02-13T17:57:28.556094Z"
// });

// addDoc(db, {
//   dishId: "x83bITvc8JIuBAqtp7Ma",
//   rating: 4,
//   comment: "Ultimate, Reaching for the stars!",
//   author: "Ringo Starry",
//   date: "2013-12-02T17:57:28.556094Z"
// });

// addDoc(db, {
//   dishId: "x83bITvc8JIuBAqtp7Ma",
//   rating: 2,
//   comment: "It's your birthday, we're gonna party!",
//   author: "25 Cent",
//   date: "2011-12-02T17:57:28.556094Z"
// });
//addDoc(collection(database, "promotions"), {
//   name: "Weekend Grand Buffet",
//   image: "/assets/images/buffet.png",
//   label: "New",
//   price: "19.99",
//   featured: true,
//   description:
//     "Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person"
// });
