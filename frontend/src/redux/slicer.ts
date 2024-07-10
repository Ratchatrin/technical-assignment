import { createSlice } from "@reduxjs/toolkit";

const moviesSlicer = createSlice(
  {
    name: "moives",
    initialState: {
      moviesId : null
    },
    reducers: {
      getName : (state,action) => {
        state.moviesId = action.payload
      }
    }
  }
)

export const { getName } = moviesSlicer.actions
export default moviesSlicer.reducer