import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface user {
  _id: string | null;
  email: string | null;
  username: string | null;
  password: string | null;
  favorite: movie[];
}

interface moviesState {
  moviesId: number | null;
  user: user;
}

const initialState: moviesState = {
  moviesId: null,
  user: {
    _id: null,
    email: null,
    username: null,
    password: null,
    favorite: [],
  },
};

const moviesSlicer = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getName: (state, action: PayloadAction<number>) => {
      state.moviesId = action.payload;
    },
    loginUser: (state, action: PayloadAction<user>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = {
        _id: null,
        email: null,
        username: null,
        password: null,
        favorite: [],
      };
    },
    addToFavorite: (state, action: PayloadAction<movie>) => {
      const movie = action.payload;
      const findMovie = state.user.favorite.findIndex((prevMovie) => prevMovie.id === movie.id);
      if (findMovie === -1) {
        state.user.favorite.push(movie);
      }
    },
    deleteToFavorite: (state, action: PayloadAction<movie>) => {
      const movie = action.payload;
      const findMovie = state.user.favorite.findIndex((prevMovie) => prevMovie.id === movie.id);
      if (findMovie !== -1) {
        state.user.favorite.splice(findMovie, 1);
      }
    },
  },
});

export const { getName, loginUser, logoutUser, addToFavorite, deleteToFavorite } = moviesSlicer.actions;
export default moviesSlicer.reducer;
