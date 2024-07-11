import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../footer/Footer";
import Nav from "../header/Nav";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./styles.css";
import { Grid, Pagination, Scrollbar } from "swiper/modules";
import { addToFavorite } from "../redux/slicer.ts";
import { useNavigate } from "react-router-dom";
interface movies {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  budget: number;
  genres: [{ id: number; name: string }];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    { id: number; logo_path: string; name: string; origin_country: string }
  ];
  production_countries: [{ iso_3166_1: string; name: string }];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface actor {
  actor: string;
  cast_id: number;
  character: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}
interface review {
  id: number;
  page: number;
  results: [
    {
      author: string;
      author_details: {
        avatar_path: string;
        name: string;
        rating: number;
        username: string;
      };
      content: string;
      created_at: string;
      id: string;
      updated_at: string;
      url: string;
    }
  ];
  total_pages: number;
  total_results: number;
}
interface state {
  movies: {
    moviesId: number;
    user: {
      _id: string;
      email: string;
      favorite: [];
      password: string;
      username: string;
    };
  };
}
function Detail() {
  const [moviesDetail, setMoviesDetail] = useState<movies[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [actor, setActor] = useState<actor[]>([]);
  const [review, setReview] = useState<review[]>([]);
  const [complete, setComplete] = useState(false);
  const [exist, setExist] = useState(false);
  const moviesId = useSelector((state: state) => state.movies.moviesId);
  const URL = "https://api.themoviedb.org/3/movie/";
  const actorURL = `https://api.themoviedb.org/3/movie/${moviesId}/credits`;
  const reviewURL = `https://api.themoviedb.org/3/movie/${moviesId}/reviews`;
  const addFavURL = "http://localhost:3003";
  const user = useSelector((state: state) => state.movies.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  const addToFavorites = async (newMovie: movies) => {
    try {
      if (user.username === null) {
        navigate("/login");
      } else {
        const response = await axios.post(
          `${addFavURL}/addFav/${user._id}`,
          newMovie
        );
        if (response.data === "Add Complete") {
          dispatch(addToFavorite(newMovie));
          setComplete(true);
          setTimeout(() => {
            setComplete(false);
          }, 1500);
        } else {
          setExist(true);
          setTimeout(() => {
            setExist(false);
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };
  window.addEventListener("resize", updateWindowWidth);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${URL}${moviesId}`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2UzZWVmZTI3ZjIyZTlkMGIyZjljNDUyMTE3YmVlYiIsIm5iZiI6MTcyMDEwOTIwNC4zMjE3MTMsInN1YiI6IjY2ODZjNWI0N2Y1MGVmMjQyYmE1NDMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._qdgR87Z1M3N9HjIPK0t8c3fNPgiqpTvL5g5vHHpaEA",
          },
        });
        const responseActor = await axios.get(`${actorURL}`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2UzZWVmZTI3ZjIyZTlkMGIyZjljNDUyMTE3YmVlYiIsIm5iZiI6MTcyMDEwOTIwNC4zMjE3MTMsInN1YiI6IjY2ODZjNWI0N2Y1MGVmMjQyYmE1NDMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._qdgR87Z1M3N9HjIPK0t8c3fNPgiqpTvL5g5vHHpaEA",
          },
        });
        const responseReview = await axios.get(`${reviewURL}`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2UzZWVmZTI3ZjIyZTlkMGIyZjljNDUyMTE3YmVlYiIsIm5iZiI6MTcyMDEwOTIwNC4zMjE3MTMsInN1YiI6IjY2ODZjNWI0N2Y1MGVmMjQyYmE1NDMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._qdgR87Z1M3N9HjIPK0t8c3fNPgiqpTvL5g5vHHpaEA",
          },
        });
        setReview([responseReview.data]);
        setActor(responseActor.data.cast);
        setMoviesDetail([response.data]);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [URL, moviesId, actorURL, reviewURL]);
  return (
    <>
      <Nav></Nav>
      {moviesDetail.length !== 0 ? (
        <>
          <div className="flex justify-center items-center ">
            {moviesDetail.map((detail) => {
              return (
                <>
                  <section className=" text-sm w-10/12 max-w-xl">
                    <div className="flex justify-center items-start h-fit gap-3 py-3">
                      <div className="w-fit text-center">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                          alt="backdrop"
                          className="w-full max-w-64 mb-2"
                        />
                        {!complete ? (
                          <>
                            {!exist ? (
                              <>
                                <button
                                  onClick={() => {
                                    addToFavorites(detail);
                                  }}
                                  className="btn btn-success border-2 hover:bg-transparent hover:text-white"
                                >
                                  Add to favorite
                                </button>
                              </>
                            ) : (
                              <>
                                <button className="btn btn-error border-2 hover:bg-transparent hover:text-white">
                                  Already Add
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <button className="btn btn-success border-2 hover:bg-transparent hover:text-white">
                              Add Complete
                            </button>
                          </>
                        )}
                      </div>
                      <div className="flex justify-center items-start flex-col gap-1 w-10/12">
                        <p
                          className={
                            windowWidth > 767
                              ? "text-3xl font-bold"
                              : "text-lg font-bold"
                          }
                        >
                          {detail.original_title} |
                          <span> {detail.runtime} min.</span>
                        </p>
                        <p
                          className={
                            windowWidth > 767
                              ? "text-xl font-light"
                              : "text-sm font-light"
                          }
                        >
                          {detail.tagline}
                        </p>
                        <div>
                          {detail.genres.map((badges) => {
                            return (
                              <>
                                <div className="badge badge-primary m-1 text-xs">
                                  {badges.name}
                                </div>
                              </>
                            );
                          })}
                        </div>
                        {windowWidth > 767 ? (
                          <>
                            <div className="grid grid-cols-2 gap-5 mb-4">
                              <div>
                                <p className="text-sm font-bold">Score</p>
                                <p className="text-sm font-normal">
                                  <span className="text-yellow-400">
                                    &#9733;
                                  </span>
                                  {detail.vote_average.toFixed(2)} / 10 <br />
                                  from {detail.vote_count} vote
                                </p>
                              </div>

                              <div className="">
                                <p className="text-sm font-bold">status</p>
                                <p className="text-sm font-semibold">
                                  {detail.status}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-bold">
                                  Original Language
                                </p>
                                <p className="text-sm font-semibold">
                                  {detail.original_language.toUpperCase()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-bold">Budget</p>
                                <p className="text-sm font-semibold">
                                  ${detail.budget.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-bold">Revenue</p>
                                <p className="text-sm font-semibold">
                                  ${detail.revenue.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-bold">
                                  Release Date
                                </p>
                                <p className="text-sm font-semibold">
                                  {detail.release_date.replace(/-/g, "/")}
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    {windowWidth < 767 ? (
                      <>
                        <div className="grid grid-cols-2 gap-5 mb-4">
                          <div>
                            <p className="text-sm font-bold">Review</p>
                            <p className="text-sm font-normal">
                              <span className="text-yellow-400">&#9733;</span>
                              {detail.vote_average.toFixed(2)} / 10 <br />
                              from {detail.vote_count} vote
                            </p>
                          </div>

                          <div className="">
                            <p className="text-sm font-bold">status</p>
                            <p className="text-sm font-semibold">
                              {detail.status}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-bold">
                              Original Language
                            </p>
                            <p className="text-sm font-semibold">
                              {detail.original_language.toUpperCase()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-bold">Budget</p>
                            <p className="text-sm font-semibold">
                              ${detail.budget}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <div className="bg-blue-900 p-3  rounded-lg ">
                      <p className="text-lg underline font-bold">Overview</p>
                      <p className="indent-5 text-pretty font-medium">
                        {detail.overview}
                      </p>
                    </div>
                    <div className="bg-blue-900 p-3 mt-3 rounded-lg">
                      <p className="text-lg underline mb-3 font-bold">
                        Top Billed Cast
                      </p>
                      <Swiper
                        slidesPerView={windowWidth < 767 ? 2 : 3}
                        grid={{
                          rows: 1,
                        }}
                        spaceBetween={30}
                        scrollbar={{
                          hide: false,
                        }}
                        modules={[Grid, Pagination, Scrollbar]}
                        className="mySwiper"
                      >
                        {actor.map((detailActor) => {
                          return (
                            <>
                              <SwiperSlide className="flex flex-col  text-black p-2 text-xs mb-5 font-semibold rounded-lg">
                                <img
                                  src={`https://image.tmdb.org/t/p/w500${detailActor.profile_path}`}
                                  alt="actor"
                                  className="rounded-lg mb-2 max-w-44"
                                />
                                <strong className="text-xs">
                                  {detailActor.name}
                                </strong>
                                <p className="font-normal">
                                  {detailActor.character}
                                </p>
                              </SwiperSlide>
                            </>
                          );
                        })}
                      </Swiper>
                    </div>
                    {windowWidth > 767 ? (
                      <>
                        <div className="mt-5 p-3 bg-blue-900 rounded-lg">
                          <p className="text-lg underline mb-3 font-bold">
                            Review
                          </p>
                          {review.map((detail) => {
                            return (
                              <>
                                {detail.results.map((reviewResult) => {
                                  return (
                                    <>
                                      <div className="bg-blue-950 mt-3 p-3 rounded-lg ">
                                        <p className="text-md font-bold mb-2">
                                          Review By {reviewResult.author}{" "}
                                          {reviewResult.author_details
                                            .rating !== null ? (
                                            <>
                                              <span>
                                                (
                                                <span className="text-yellow-400">
                                                  &#9733;
                                                </span>
                                                {
                                                  reviewResult.author_details
                                                    .rating
                                                }
                                                /10)
                                              </span>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </p>
                                        <p className="indent-5 font-medium">
                                          {reviewResult.content}
                                        </p>
                                      </div>
                                    </>
                                  );
                                })}
                              </>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </section>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <section className="w-full h-dvh flex justify-center items-center">
            <span className="loading loading-ring loading-lg"></span>
          </section>
        </>
      )}

      <Footer></Footer>
    </>
  );
}

export default Detail;
