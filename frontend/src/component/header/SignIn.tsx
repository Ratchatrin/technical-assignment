import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Nav from "./Nav";
const API = "https://technical-assignment.onrender.com";
function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(String);
  const [username, setUsername] = useState(String);
  const [password, setPassword] = useState(String);
  const [emptyInput, setEmptyInput] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const navigator = useNavigate();
  const signIn = async () => {
    setLoadingData(true);
    try {
      if (email && username && password.length !== 0) {
        const user = {
          email,
          username,
          password,
        };
        const signIn = await axios.post(`${API}/signIn`, user);
        if (signIn.status === 208) {
          setEmailExist(true);
          setTimeout(() => {
            setEmailExist(false);
          }, 2000);
          setEmail("");
          setPassword("");
          setUsername("");
        }
        navigator("/login");
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
      <section className="flex flex-col justify-start items-center  w-full h-full ">
        <div className="w-11/12 max-w-xl  mt-10  p-5 flex flex-col justify-center items-center rounded-lg">
          <p className="w- full text-center font-bold text-3xl ">SignIn</p>
          <label className="form-control  w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold border-b-2">Email</span>
            </div>
            <input
              type="text"
              placeholder="Email"
              className="input border-none  w-full max-w-xs focus:outline-2"
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
              value={email}
            />
          </label>
          <label className="form-control  w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold border-b-2">Username</span>
            </div>
            <input
              type="text"
              placeholder="Username"
              className="input border-none  w-full max-w-xs focus:outline-2"
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
            <div className="flex  outline-2 pl-2 pr-2 rounded-sm ">
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
            className="btn  mt-5 pl-5 pr-5 text-white rounded-xl"
            onClick={signIn}
          >
            SignIn
          </button>
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
          {emailExist ? (
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
                <span className="text-white">Email already Exist.</span>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {loadingData ? (
          <>
            <span className="loading loading-ring loading-lg"></span>
            <p>Loading</p>
          </>
        ) : (
          <></>
        )}
      </section>
    </>
  );
}

export default SignIn;
