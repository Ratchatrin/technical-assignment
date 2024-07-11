import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slicer.ts";
const API = "https://technical-assignment.onrender.com";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(String);
  const [password, setPassword] = useState(String);
  const [emptyInput, setEmptyInput] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [userNotFound, setUserNOtFound] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = async () => {
    try {
      if (username && password.length !== 0) {
        const user = {
          username,
          password,
        };
        const login = await axios.post(`${API}/login`, user);
        if (login.data === null) {
          setLoadingData(true);
        }
        if (login.data.message == "Incorrect password") {
          setUsername("");
          setPassword("");
          setIncorrectPassword(true);
          setTimeout(() => {
            setIncorrectPassword(false);
          }, 2000);
        } else if (login.data.message == "User not found") {
          setUsername("");
          setPassword("");
          setUserNOtFound(true);
          setTimeout(() => {
            setUserNOtFound(false);
          }, 2000);
        } else {
          setLoadingData(false);
          dispatch(loginUser(login.data));
          setUsername("");
          setPassword("");
          navigate("/");
        }
      } else {
        setEmptyInput(true);
        setTimeout(() => {
          setEmptyInput(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Nav></Nav>
      <section className="flex flex-col justify-start items-center w-full h-full ">
        <div className="rounded-lg  w-11/12 max-w-xl mt-10  p-5 flex flex-col justify-center items-center ">
          <p className="w-full text-center font-bold text-3xl ">Login</p>
          <label className="form-control  w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold border-b-2">Username</span>
            </div>
            <input
              type="text"
              placeholder="Username"
              className="input border-none  w-full max-w-xs outline-2"
              onChange={(ev) => {
                setUsername(ev.target.value);
              }}
              value={username}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold border-b-2">Password</span>
            </div>
            <div className="flex outline-2 pl-2 pr-2 rounded-lg ">
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Password"
                className="input  border-none outline-2 w-full max-w-xs pl-2 mr-2"
                onChange={(ev) => {
                  setPassword(ev.target.value);
                }}
                value={password}
              />
              <label className="swap">
                <input type="checkbox" />
                <div
                  className="swap-on"
                  onClick={() => {
                    setShowPassword(true);
                  }}
                >
                  Hide
                </div>
                <div
                  className="swap-off"
                  onClick={() => {
                    setShowPassword(false);
                  }}
                >
                  Show
                </div>
              </label>
            </div>
          </label>
          <button
            className="btn  mt-5 pl-5 pr-5 text-white rounded-xl hover:bg-transparent 
            hover:border-2 "
            onClick={userLogin}
          >
            Login
          </button>
          <Link to="/signIn">
            <div className="flex justify-evenly mt-5 font-bold">
              <p>Don't Have Account ?</p>
              <a className="link link-hover ml-5 underline ">Click</a>
            </div>
          </Link>
          <Link to="/reset">
            <div className="flex justify-evenly -3 mb-3 mt-3 font-bold">
              <p>Reset Password</p>
              <p className="ml-5 underline ">Click</p>
            </div>
          </Link>
          {emptyInput ? (
            <>
              <div role="alert" className="alert bg-red-500 mt-5 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-white">Please Fill in the Blank.</span>
              </div>
            </>
          ) : (
            <></>
          )}
          {incorrectPassword ? (
            <>
              <div role="alert" className="alert bg-red-500 mt-5 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-white">Incorrect Password.</span>
              </div>
            </>
          ) : (
            <></>
          )}
          {userNotFound ? (
            <>
              <div role="alert" className="alert bg-red-500 mt-5 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-white">User Not Found.</span>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {loadingData ? (
          <>
            <span className="loading loading-ring loading-lg"></span>
          </>
        ) : (
          <></>
        )}
      </section>
    </>
  );
}

export default Login;
