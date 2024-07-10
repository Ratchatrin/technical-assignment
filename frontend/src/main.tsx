import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./component/main/Home.tsx";
import { Provider } from "react-redux";
import store from "./redux/strore.ts";
import Detail from "./component/main/Detail.tsx";
import FavMovies from "./component/main/FavMovies.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/detail",
    element: <Detail></Detail>,
  },
  {
    path: "/fav",
    element: <FavMovies></FavMovies>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
