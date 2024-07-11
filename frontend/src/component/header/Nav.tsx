import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/slicer";
interface state {
  movies: {
    user: {
      email: string;
      favorite: [];
      password: string;
      username: string;
    };
  };
}
function Nav() {
  const user = useSelector((state: state) => state.movies.user);
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex justify-evenly items-center bg-white text-blue-700 text-2xl font-bold gap-5 p-2 w-full">
        <Link to="/" className="flex justify-center items-center">
          <img
            src="https://images.vexels.com/content/208219/preview/film-camera-black-5aa3c0.png"
            alt="logo"
            className="w-12"
          />
          <p>MoveVee</p>
        </Link>
        {user.username !== null ? (
          <>
            <div className="flex flex-col items-center justify-center gap-3 ">
              <p>Hello'{user.username}</p>
              <button
                className="btn btn-error btn-sm"
                onClick={() => {
                  dispatch(logoutUser(null));
                }}
              >
                Log out
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <div className="flex items-center justify-center gap-3 ">
                <button className="btn btn-info btn-sm">Login</button>
                {/* <img
              src="https://www.svgrepo.com/show/105517/user-icon.svg"
              alt="login"
              className="w-5 "
            /> */}
              </div>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Nav;
