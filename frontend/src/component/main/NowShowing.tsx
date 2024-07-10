import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getName } from "../../redux/slicer";

interface movies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface genres {
  id: number;
  name: string;
}
function NowShowing() {
  const [moviesList, setMoviesList] = useState<movies[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(Number);
  const [genres, setGenres] = useState<genres[]>([]);
  const [genreArr, setGenreArr] = useState<genres[]>([]);
  const [filterArr, setFilterArr] = useState<movies[]>([]);
  const [searchResult, setSearchResult] = useState<movies[]>([]);
  const [search, setSearch] = useState(String);
  const [combineResult, setCombineResult] = useState<movies[]>([]);
  const dispatch = useDispatch();
  const URL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}&region=th`;
  const genresURL = "https://api.themoviedb.org/3/genre/movie/list";
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

  window.addEventListener("resize", updateWindowWidth);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(URL, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2UzZWVmZTI3ZjIyZTlkMGIyZjljNDUyMTE3YmVlYiIsIm5iZiI6MTcyMDEwOTIwNC4zMjE3MTMsInN1YiI6IjY2ODZjNWI0N2Y1MGVmMjQyYmE1NDMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._qdgR87Z1M3N9HjIPK0t8c3fNPgiqpTvL5g5vHHpaEA",
          },
        });
        const genreResponse = await axios.get(genresURL, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2UzZWVmZTI3ZjIyZTlkMGIyZjljNDUyMTE3YmVlYiIsIm5iZiI6MTcyMDEwOTIwNC4zMjE3MTMsInN1YiI6IjY2ODZjNWI0N2Y1MGVmMjQyYmE1NDMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._qdgR87Z1M3N9HjIPK0t8c3fNPgiqpTvL5g5vHHpaEA",
          },
        });
        setGenres(genreResponse.data.genres);
        setMaxPage(response.data.total_pages);
        setMoviesList(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [URL, page]);
  useEffect(() => {
    const filterMovies = () => {
      setFilterArr([]);
      moviesList.map((movies) => {
        genreArr.map((genres) => {
          movies.genre_ids.map((idGenres) => {
            if (genres.id == idGenres) {
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
  }, [genreArr, moviesList]);
  useEffect(() => {
    setSearchResult([]);
    if (search.length !== 0) {
      moviesList.map((movies) => {
        if (movies.title.toLowerCase().includes(search)) {
          setSearchResult((prevResult) => {
            return [...prevResult, movies];
          });
        }
      });
    }
  }, [moviesList, search]);
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
        <div className="collapse bg-slate-100 text-black w-11/12 max-w-xs mt-5 collapse-arrow">
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
        {moviesList.length !== 0 ? (
          <>
            {search.length !== 0 ? (
              <>
                {genreArr.length !== 0 ? (
                  <>
                    <section className="flex flex-col justify-center items-center w-9/12 max-w-11/12">
                      <div className="w-full flex justify-between items-center mt-3 p-3">
                        <button
                          className={`btn btn-info ${
                            page == 1 ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page > 1) {
                              setPage(page - 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Previous
                        </button>
                        <p>
                          {page}/{maxPage}
                        </p>
                        <button
                          className={`btn btn-info ${
                            page == maxPage ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page < maxPage) {
                              setPage(page + 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Next
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3 justify-items-center w-6/12">
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
                                  <Link
                                    to="/detail"
                                    className="flex justify-center items-center"
                                  >
                                    <div
                                      onClick={() => {
                                        dispatch(getName(movies.id));
                                      }}
                                      className="flex flex-col font-bold text-sm justify-center min-w-48 items-center rounded-lg bg-white w-8/12 max-w-xs m-5 p-3 text-black"
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
                                        {movies.genre_ids.map((genreId) => {
                                          return (
                                            <>
                                              {genres.map((genre) => {
                                                if (genre.id == genreId) {
                                                  return (
                                                    <>
                                                      <div className="px-2  my-1 badge badge-primary text-[15px] w-fit text-nowrap">
                                                        {genre.name}
                                                      </div>
                                                    </>
                                                  );
                                                }
                                              })}
                                            </>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </Link>
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
                      <div className="w-full flex justify-between items-center mt-3 px-2">
                        <button
                          className={`btn btn-info ${
                            page == 1 ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page > 1) {
                              setPage(page - 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Previous
                        </button>
                        <p>
                          {page}/{maxPage}
                        </p>
                        <button
                          className={`btn btn-info ${
                            page == maxPage ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page < maxPage) {
                              setPage(page + 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </section>
                  </>
                ) : (
                  <>
                    <section className="flex flex-col justify-center items-center  w-9/12 max-w-11/12">
                      <div className="w-full flex justify-between items-center mt-3 p-3">
                        <button
                          className={`btn btn-info ${
                            page == 1 ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page > 1) {
                              setPage(page - 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Previous
                        </button>
                        <p>
                          {page}/{maxPage}
                        </p>
                        <button
                          className={`btn btn-info ${
                            page == maxPage ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page < maxPage) {
                              setPage(page + 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Next
                        </button>
                      </div>
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
                                  <Link
                                    to="/detail"
                                    className="flex justify-center items-center"
                                  >
                                    <div
                                      onClick={() => {
                                        dispatch(getName(movies.id));
                                      }}
                                      className="flex flex-col font-bold text-sm justify-center min-w-48 items-center rounded-lg bg-white w-8/12 max-w-xs m-5 p-3 text-black"
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
                                        {movies.genre_ids.map((genreId) => {
                                          return (
                                            <>
                                              {genres.map((genre) => {
                                                if (genre.id == genreId) {
                                                  return (
                                                    <>
                                                      <div className="px-2  my-1 badge badge-primary text-[15px] w-fit text-nowrap">
                                                        {genre.name}
                                                      </div>
                                                    </>
                                                  );
                                                }
                                              })}
                                            </>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </Link>
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

                      <div className="w-full flex justify-between items-center mt-3 px-2">
                        <button
                          className={`btn btn-info ${
                            page == 1 ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page > 1) {
                              setPage(page - 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Previous
                        </button>
                        <p>
                          {page}/{maxPage}
                        </p>
                        <button
                          className={`btn btn-info ${
                            page == maxPage ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page < maxPage) {
                              setPage(page + 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </section>
                  </>
                )}
              </>
            ) : (
              <>
                {genreArr.length !== 0 ? (
                  <>
                    <section className="flex flex-col justify-center items-center w-9/12 max-w-11/12">
                      <div className="w-full flex justify-between items-center mt-3 p-3">
                        <button
                          className={`btn btn-info ${
                            page == 1 ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page > 1) {
                              setPage(page - 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Previous
                        </button>
                        <p>
                          {page}/{maxPage}
                        </p>
                        <button
                          className={`btn btn-info ${
                            page == maxPage ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page < maxPage) {
                              setPage(page + 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Next
                        </button>
                      </div>
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
                                  <Link
                                    to="/detail"
                                    className="flex justify-center items-center"
                                  >
                                    <div
                                      onClick={() => {
                                        dispatch(getName(movies.id));
                                      }}
                                      className="flex flex-col font-bold text-sm justify-center min-w-48 items-center rounded-lg bg-white w-8/12 max-w-xs m-5 p-3 text-black"
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
                                        {movies.genre_ids.map((genreId) => {
                                          return (
                                            <>
                                              {genres.map((genre) => {
                                                if (genre.id == genreId) {
                                                  return (
                                                    <>
                                                      <div className="px-2  my-1 badge badge-primary text-[15px] w-fit text-nowrap">
                                                        {genre.name}
                                                      </div>
                                                    </>
                                                  );
                                                }
                                              })}
                                            </>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </Link>
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
                      <div className="w-full flex justify-between items-center mt-3 px-2">
                        <button
                          className={`btn btn-info ${
                            page == 1 ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page > 1) {
                              setPage(page - 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Previous
                        </button>
                        <p>
                          {page}/{maxPage}
                        </p>
                        <button
                          className={`btn btn-info ${
                            page == maxPage ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page < maxPage) {
                              setPage(page + 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </section>
                  </>
                ) : (
                  <>
                    <section className="flex flex-col justify-center items-center w-9/12 max-w-11/12">
                      <div className="w-full flex justify-between items-center mt-3 p-3">
                        <button
                          className={`btn btn-info ${
                            page == 1 ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page > 1) {
                              setPage(page - 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Previous
                        </button>
                        <p>
                          {page}/{maxPage}
                        </p>
                        <button
                          className={`btn btn-info ${
                            page == maxPage ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page < maxPage) {
                              setPage(page + 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Next
                        </button>
                      </div>
                      <div
                        className={`${
                          windowWidth < 767
                            ? "flex flex-col w-full justify-center items-center"
                            : "grid grid-cols-3 "
                        }`}
                      >
                        {moviesList.map((movies: movies) => {
                          return (
                            <>
                              <Link
                                to="/detail"
                                className="flex justify-center items-center"
                              >
                                <div
                                  onClick={() => {
                                    dispatch(getName(movies.id));
                                  }}
                                  className="flex flex-col font-bold text-sm justify-center min-w-48 items-center rounded-lg bg-white w-8/12 max-w-xs m-5 p-3 text-black"
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
                                    {movies.genre_ids.map((genreId) => {
                                      return (
                                        <>
                                          {genres.map((genre) => {
                                            if (genre.id == genreId) {
                                              return (
                                                <>
                                                  <div className="px-2  my-1 badge badge-primary text-[15px] w-fit text-nowrap">
                                                    {genre.name}
                                                  </div>
                                                </>
                                              );
                                            }
                                          })}
                                        </>
                                      );
                                    })}
                                  </div>
                                </div>
                              </Link>
                            </>
                          );
                        })}
                      </div>
                      <div className="w-full flex justify-between items-center mt-3 px-2">
                        <button
                          className={`btn btn-info ${
                            page == 1 ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page > 1) {
                              setPage(page - 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Previous
                        </button>
                        <p>
                          {page}/{maxPage}
                        </p>
                        <button
                          className={`btn btn-info ${
                            page == maxPage ? "btn-disabled" : ""
                          }`}
                          onClick={() => {
                            if (page < maxPage) {
                              setPage(page + 1);
                              setMoviesList([]);
                              setGenreArr([]);
                            }
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </section>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <section className="w-full h-dvh flex justify-center items-center">
              <span className="loading loading-ring loading-lg"></span>
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default NowShowing;
