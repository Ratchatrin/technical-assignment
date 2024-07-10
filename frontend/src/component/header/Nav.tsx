import { Link } from "react-router-dom";

function Nav() {
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
        <Link to="/login">
          <div className="flex items-center justify-center gap-3">
            <p>Login</p>
            {/* <img
              src="https://www.svgrepo.com/show/105517/user-icon.svg"
              alt="login"
              className="w-5 "
            /> */}
          </div>
        </Link>
      </div>
    </>
  );
}

export default Nav;
