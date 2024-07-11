import { configureStore } from "@reduxjs/toolkit";
import slicerReducer from "./slicer";
const store = configureStore(
  {
    reducer : {movies :slicerReducer }
  }
)

export default store