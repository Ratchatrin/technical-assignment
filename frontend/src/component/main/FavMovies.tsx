import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getName, deleteToFavorite } from "../redux/slicer";

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
interface genres {
  id: number;
  name: string;
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
function FavMovies() {
  const [favMovies, setFavMovies] = useState<movies[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [genres, setGenres] = useState<genres[]>([]);
  const [genreArr, setGenreArr] = useState<genres[]>([]);
  const [filterArr, setFilterArr] = useState<movies[]>([]);
  const [searchResult, setSearchResult] = useState<movies[]>([]);
  const [search, setSearch] = useState(String);
  const [combineResult, setCombineResult] = useState<movies[]>([]);
  const dispatch = useDispatch();
  const user = useSelector((state: state) => state.movies.user);
  const genresURL = "https://api.themoviedb.org/3/genre/movie/list";
  const addFavURL = `https://technical-assignment.onrender.com/delete/${user._id}`;
  const getGenres = (genres: genres) => {
    if (genreArr.length === 0) {
      setGenreArr((prevGenres) => {
        return [...prevGenres, genres];
      });
    } else {
      const checkIndex = genreArr.findIndex((list) => list.id == genres.id);
      if (checkIndex === -1) {
        setGenreArr((prevGenres) => {
          return [...prevGenres, genres];
        });
      } else {
        const result = genreArr.filter((list) => genreArr[checkIndex] !== list);
        setGenreArr(result);
      }
    }
  };
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  const deleteMovies = async (movies: movies) => {
    try {
      const respond = await axios.post(addFavURL, movies);
      dispatch(deleteToFavorite(movies));
      console.log(respond);
    } catch (error) {
      console.log(error);
    }
  };

  window.addEventListener("resize", updateWindowWidth);
  useEffect(() => {
    const getData = async () => {
      try {
        const genreResponse = await axios.get(genresURL, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2UzZWVmZTI3ZjIyZTlkMGIyZjljNDUyMTE3YmVlYiIsIm5iZiI6MTcyMDEwOTIwNC4zMjE3MTMsInN1YiI6IjY2ODZjNWI0N2Y1MGVmMjQyYmE1NDMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._qdgR87Z1M3N9HjIPK0t8c3fNPgiqpTvL5g5vHHpaEA",
          },
        });
        setGenres(genreResponse.data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const filterMovies = () => {
      setFilterArr([]);
      favMovies.map((movies) => {
        genreArr.map((genres) => {
          movies.genres.map((idGenres) => {
            if (genres.name == idGenres.name) {
              setFilterArr((prevMovies) => {
                return [...prevMovies, movies];
              });
              setFilterArr((movies) => {
                return [...new Set(movies)];
              });
            }
          });
        });
      });
    };
    filterMovies();
  }, [favMovies, genreArr]);
  useEffect(() => {
    setSearchResult([]);
    if (search.length !== 0) {
      favMovies.map((movies) => {
        if (movies.title.toLowerCase().includes(search)) {
          setSearchResult((prevResult) => {
            return [...prevResult, movies];
          });
        }
      });
    }
  }, [favMovies, search]);
  useEffect(() => {
    const combine = () => {
      setCombineResult([]);
      filterArr.map((filter) => {
        searchResult.map((search) => {
          if (filter.title === search.title) {
            setCombineResult((prev) => {
              return [...prev, filter];
            });
          }
        });
      });
    };
    combine();
  }, [filterArr, searchResult]);
  useEffect(() => {
    setFavMovies(user.favorite);
  }, [user]);
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <input
          type="text"
          placeholder="Search Movies"
          className="input input-bordered w-full max-w-xs"
          onChange={(ev) => {
            setSearch(ev.target.value);
          }}
        />
        <div className="collapse bg-slate-100 text-black w-11/12 max-w-xs mt-5 collapse-arrow mb-10">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Genres</div>
          <div className="collapse-content flex flex-col justify-center items-center">
            <div className="grid grid-cols-3 gap-2 text-center ">
              {genres.map((list) => {
                return (
                  <>
                    <p
                      className={`text-sm`}
                      onClick={() => {
                        getGenres(list);
                      }}
                    >
                      {list.name}
                    </p>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        {favMovies.length !== 0 ? (
          <>
            {search.length !== 0 ? (
              <>
                {genreArr.length !== 0 ? (
                  <>
                    <section className="flex flex-col justify-center items-center w-full">
                      <div className="grid grid-cols-2 gap-3 justify-items-center min-w-6/12">
                        {genreArr.map((list) => {
                          return (
                            <>
                              <div
                                className="badge badge-info px-3 h-fit gap-1"
                                onClick={() => {
                                  getGenres(list);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  className="inline-block h-4 w-4 stroke-current"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  ></path>
                                </svg>
                                {list.name}
                              </div>
                            </>
                          );
                        })}
                      </div>
                      {combineResult.length !== 0 ? (
                        <>
                          <div
                            className={`${
                              windowWidth < 767
                                ? "flex flex-col w-full justify-center items-center"
                                : "grid grid-cols-3 "
                            }`}
                          >
                            {combineResult.map((movies: movies) => {
                              return (
                                <>
                                  <div
                                    onClick={() => {
                                      dispatch(getName(movies.id));
                                    }}
                                    className="flex flex-col font-bold text-sm justify-center min-w-48 items-center rounded-lg bg-white w-8/12 max-w-xs m-2 p-3 text-black"
                                  >
                                    <Link
                                      to="/detail"
                                      className="flex justify-center items-center flex-col"
                                    >
                                      <img
                                        src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                                        alt="poster"
                                        className="w-5/12 min-w-40 rounded-lg"
                                      />
                                      <p className="mt-3">
                                        {movies.original_title}
                                      </p>

                                      <p>
                                        <span className="text-yellow-400">
                                          &#9733;
                                        </span>
                                        {movies.vote_average.toFixed(2)}
                                        /10
                                      </p>
                                      <div className="grid grid-cols-2 justify-items-center">
                                        {movies.genres.map((genreId) => {
                                          return (
                                            <>
                                              <div className="px-2  my-1 badge badge-primary text-[15px] w-fit text-nowrap">
                                                {genreId.name}
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </Link>{" "}
                                    <button className="btn btn-error">
                                      Delete
                                    </button>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-center items-center h-96 w-full">
                            <p>Not found :(</p>
                          </div>
                        </>
                      )}
                    </section>
                  </>
                ) : (
                  <>
                    <section className="flex flex-col justify-center items-center w-full">
                      {searchResult.length !== 0 ? (
                        <>
                          <div
                            className={`${
                              windowWidth < 767
                                ? "flex flex-col w-full justify-center items-center"
                                : "grid grid-cols-3 "
                            }`}
                          >
                            {searchResult.map((movies: movies) => {
                              return (
                                <>
                                  <div
                                    onClick={() => {
                                      dispatch(getName(movies.id));
                                    }}
                                    className="flex flex-col font-bold text-sm justify-center min-w-48 items-center rounded-lg bg-white w-8/12 max-w-xs m-2 p-3 text-black"
                                  >
                                    <Link
                                      to="/detail"
                                      className="flex justify-center items-center flex-col"
                                    >
                                      <img
                                        src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                                        alt="poster"
                                        className="w-5/12 min-w-40 rounded-lg"
                                      />
                                      <p className="mt-3">
                                        {movies.original_title}
                                      </p>

                                      <p>
                                        <span className="text-yellow-400">
                                          &#9733;
                                        </span>
                                        {movies.vote_average.toFixed(2)}
                                        /10
                                      </p>
                                      <div className="grid grid-cols-2 justify-items-center">
                                        {movies.genres.map((genreId) => {
                                          return (
                                            <>
                                              <div className="px-2  my-1 badge badge-primary text-[15px] w-fit text-nowrap">
                                                {genreId.name}
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </Link>
                                    <button className="btn btn-error">
                                      Delete
                                    </button>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="h-96 flex justify-center items-center w-full">
                            <p>Not Found :(</p>
                          </div>
                        </>
                      )}
                    </section>
                  </>
                )}
              </>
            ) : (
              <>
                {genreArr.length !== 0 ? (
                  <>
                    <section className="flex flex-col justify-center items-center w-full">
                      <div className="grid grid-cols-2 gap-3 justify-items-center min-w-6/12 ">
                        {genreArr.map((list) => {
                          return (
                            <>
                              <div
                                className="badge badge-info px-3 h-fit gap-1"
                                onClick={() => {
                                  getGenres(list);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  className="inline-block h-4 w-4 stroke-current"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  ></path>
                                </svg>
                                {list.name}
                              </div>
                            </>
                          );
                        })}
                      </div>
                      {filterArr.length !== 0 ? (
                        <>
                          <div
                            className={`${
                              windowWidth < 767
                                ? "flex flex-col w-full justify-center items-center"
                                : "grid grid-cols-3 "
                            }`}
                          >
                            {filterArr.map((movies: movies) => {
                              return (
                                <>
                                  <div
                                    onClick={() => {
                                      dispatch(getName(movies.id));
                                    }}
                                    className="flex flex-col font-bold text-sm justify-center min-w-48 items-center rounded-lg bg-white w-8/12 max-w-xs m-2 p-3 text-black"
                                  >
                                    <Link
                                      to="/detail"
                                      className="flex justify-center items-center flex-col"
                                    >
                                      <img
                                        src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                                        alt="poster"
                                        className="w-5/12 min-w-40 rounded-lg"
                                      />
                                      <p className="mt-3">
                                        {movies.original_title}
                                      </p>

                                      <p>
                                        <span className="text-yellow-400">
                                          &#9733;
                                        </span>
                                        {movies.vote_average.toFixed(2)}
                                        /10
                                      </p>
                                      <div className="grid grid-cols-2 justify-items-center">
                                        {movies.genres.map((genreId) => {
                                          return (
                                            <>
                                              <div className="px-2  my-1 badge badge-primary text-[15px] w-fit text-nowrap">
                                                {genreId.name}
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </Link>
                                    <button className="btn btn-error">
                                      Delete
                                    </button>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-center items-center h-96 w-full">
                            <p>Not found :(</p>
                          </div>
                        </>
                      )}
                    </section>
                  </>
                ) : (
                  <>
                    <section className="flex flex-col justify-center items-center w-full">
                      <div
                        className={`${
                          windowWidth < 767
                            ? "flex flex-col w-full justify-center items-center"
                            : "grid grid-cols-3 "
                        }`}
                      >
                        {favMovies.map((movies: movies) => {
                          return (
                            <>
                              <div
                                onClick={() => {
                                  dispatch(getName(movies.id));
                                }}
                                className="flex flex-col font-bold text-sm justify-center min-w-48 items-center rounded-lg bg-white w-8/12 max-w-xs m-2 p-3 text-black"
                              >
                                <Link
                                  to="/detail"
                                  className="flex justify-center items-center flex-col "
                                >
                                  <img
                                    src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                                    alt="poster"
                                    className="w-5/12 min-w-40 rounded-lg"
                                  />
                                  <p className="mt-3">
                                    {movies.original_title}
                                  </p>

                                  <p>
                                    <span className="text-yellow-400">
                                      &#9733;
                                    </span>
                                    {movies.vote_average.toFixed(2)}
                                    /10
                                  </p>
                                  <div className="grid grid-cols-2 justify-items-center">
                                    {movies.genres.map((genreId) => {
                                      return (
                                        <>
                                          <div className="px-2  my-1 badge badge-primary text-[15px] w-fit text-nowrap">
                                            {genreId.name}
                                          </div>
                                        </>
                                      );
                                    })}
                                  </div>
                                </Link>
                                <button
                                  className="btn btn-error mt-2"
                                  onClick={() => {
                                    deleteMovies(movies);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </section>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {user._id !== null ? (
              <>
                <section className="w-full h-dvh flex justify-center items-center flex-col">
                  <p>Empty Favorite Movies :(</p>
                </section>
              </>
            ) : (
              <>
                <section className="w-full h-dvh flex justify-center flex-col  items-center">
                  <p>Please Login</p>
                  <Link to="/login">
                    <button className="btn btn-info mt-5">Go to Login</button>
                  </Link>
                </section>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default FavMovies;
