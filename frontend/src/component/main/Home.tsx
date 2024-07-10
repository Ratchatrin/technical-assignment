import { useState } from "react";
import Footer from "../footer/Footer";
import Nav from "../header/Nav";
import NowShowing from "./NowShowing";
import TopRate from "./TopRate";
import Upcoming from "./Upcoming";
import FavMovies from "./FavMovies";
const navMovies = ["Now Showing", "Top Rate", "Upcoming", "Favorite"];
function Home() {
  const [selectNav, setSelectNav] = useState("Now Showing");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  window.addEventListener("resize", updateWindowWidth);
  return (
    <>
      <div className="flex flex-col justify-between  h-dvh">
        <Nav></Nav>
        <section className="flex flex-col justify-start items-center">
          <div
            className={`${
              windowWidth < 767
                ? "grid grid-cols-2 gap-5 my-5 text-center"
                : " flex justify-center items-center gap-5 m-5 w-full"
            }`}
          >
            {navMovies.map((select) => {
              return (
                <>
                  <p
                    onClick={() => {
                      setSelectNav(select);
                    }}
                    className={`${
                      select == selectNav ? "border-b-2 pb-1" : ""
                    } duration-[60ms] h-8`}
                  >
                    {select}
                  </p>
                </>
              );
            })}
          </div>
          {selectNav == "Now Showing" ? (
            <>
              <NowShowing></NowShowing>
            </>
          ) : (
            <></>
          )}
          {selectNav == "Top Rate" ? (
            <>
              <TopRate></TopRate>
            </>
          ) : (
            <></>
          )}
          {selectNav == "Upcoming" ? (
            <>
              <Upcoming></Upcoming>
            </>
          ) : (
            <></>
          )}
          {selectNav == "Favorite" ? (
            <>
              <FavMovies></FavMovies>
            </>
          ) : (
            <></>
          )}
        </section>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Home;
