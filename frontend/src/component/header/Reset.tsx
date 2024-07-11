import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Nav from "./Nav";
import axios from "axios";
import { useState } from "react";
const API = "https://technical-assignment.onrender.com";
function Reset() {
  const [newPassword, setNewPassword] = useState(String);
  const [email, setEmail] = useState(String);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();
  const resetPassword = async () => {
    setLoadingData(true);
    try {
      const user = { email, newPassword };
      const changePassword = await axios.put(`${API}/resetPassword`, user);
      console.log(changePassword.status);
      if (changePassword.status === 200) {
        setComplete(true);
        setNewPassword("");
        setEmail("");
      }
    } catch (error) {
      setNewPassword("");
      setEmail("");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };
  return (
    <>
      <Nav></Nav>
      <section className="flex flex-col justify-start items-center  w-full h-full ">
        <div className=" w-11/12 rounded-lg max-w-xl mt-10  p-5 flex flex-col justify-center items-center ">
          <p className="w-full text-center font-bold text-3xl ">
            Reset Password
          </p>
          <label className="form-control  w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold border-b-2">Email</span>
            </div>
            <input
              type="text"
              placeholder="Email"
              className="input border-none  w-full max-w-xs outline-2"
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
              value={email}
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
                  setNewPassword(ev.target.value);
                }}
                value={newPassword}
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
            onClick={resetPassword}
            className="btn  mt-5 pl-5 pr-5 text-white rounded-xl hover:bg-transparent 
            hover:border-2 "
          >
            Submit
          </button>
          {error ? (
            <>
              <div
                role="alert"
                className="alert bg-red-500 text-white rounded-lg mt-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
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
                <span>Email is Incorrect.</span>
              </div>
            </>
          ) : (
            <></>
          )}
          {complete ? (
            <>
              <div role="alert" className="alert alert-success mt-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Change Password Complete Go to Login</span>
                <button
                  className="btn btn-active btn-ghost"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Click
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
          {loadingData ? (
            <>
              <span className="loading loading-ring loading-lg"></span>
              <p>Loading</p>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}

export default Reset;
