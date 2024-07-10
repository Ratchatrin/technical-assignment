import { createSlice } from "@reduxjs/toolkit";

const moviesSlicer = createSlice(
  {
    name: "moives",
    initialState: {
      moviesId: null
      , user : { username : null ,password : null , favorite : []}
    },
    reducers: {
      getName : (state,action) => {
        state.moviesId = action.payload
      },
      login : (state,action) => {
        state.user = action.payload
      }
      
    },
    
  }
)

export const { getName } = moviesSlicer.actions
export default moviesSlicer.reducer