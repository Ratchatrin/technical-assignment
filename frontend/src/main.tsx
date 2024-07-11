import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./component/main/Home.tsx";
import { Provider } from "react-redux";
import store from "./component/redux/strore.ts";
import Detail from "./component/main/Detail.tsx";
import FavMovies from "./component/main/FavMovies.tsx";
import Login from "./component/header/Login.tsx";
import SignIn from "./component/header/SignIn.tsx";
import Reset from "./component/header/Reset.tsx";

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
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signIn",
    element: <SignIn></SignIn>,
  },
  {
    path: "/reset",
    element: <Reset></Reset>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
