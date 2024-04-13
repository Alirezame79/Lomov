import React, { useRef, useState } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { headers } from "./privateData/private";
import snipper from "./images/spinner.gif";
import movieSign from "./images/movie.png";
import seriesSign from "./images/series.png";
import { useDispatch } from "react-redux";
import { setMovie, visibility } from "./store/index";
import ShowModal from "./portal/ShowModal";

export default function App() {
  const nameRef = useRef();
  const [loading, setLoading] = useState(false);
  const [resultList, setResultList] = useState([]);
  const [searchAnimation, setSearchAnimation] = useState(false);
  const dispatch = useDispatch();
  const [searchBtnVisibility, setSearchBtnVisibility] = useState(true);

  async function searchBtnClicked(e) {
    e.preventDefault();
    if (loading) return; // disable search when already searching

    setSearchBtnVisibility(false);
    setLoading(true);
    setSearchAnimation(true);

    // when input value is empty
    if (nameRef.current.value === "") {
      toast.error("This field can't be empty.");
      setLoading(false);
      return;
    }

    // format the name
    const title = nameRef.current.value.replaceAll(" ", "%20");

    // prepare requirement for request
    const url =
      "https://streaming-availability.p.rapidapi.com/search/title?title=" +
      title +
      "&country=us&show_type=all&output_language=en";
    const options = {
      method: "GET",
      headers: headers,
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        const data = await response.json();
        // store result array
        setResultList(data.result);
        console.log(data.result);
      } else {
        toast.error("Something wrong happened. Please try later.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong happened. Please try later.");
    }
    setLoading(false);
  }

  function searchInputFocused() {
    setSearchAnimation(false);
    setResultList([]);
    setSearchBtnVisibility(true);
  }

  function elementClicked(eachResult) {
    // console.log(eachResult);
    dispatch(setMovie(eachResult));
    dispatch(visibility(true));
  }

  return (
    <div className="appBody">
      <div>
        <Toaster />
        <ShowModal />
      </div>
      <form
        className={`searchForm ${
          searchAnimation
            ? `searchBoxResultAnimation`
            : `searchBoxResetAnimation`
        }`}
        onSubmit={searchBtnClicked}
      >
        <input
          className="searchInput"
          onFocus={searchInputFocused}
          ref={nameRef}
          placeholder="Enter Movie or Series name ..."
        />
        {!loading ? (
          <>
            {searchBtnVisibility && (
              <div className="searchBtn">
                <svg
                  onClick={searchBtnClicked}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />
                  <path
                    d="M20.56,18.44l-4.67-4.67a7,7,0,1,0-2.12,2.12l4.67,4.67a1.5,1.5,0,0,0,2.12,0A1.49,1.49,0,0,0,20.56,18.44ZM5,10a5,5,0,1,1,5,5A5,5,0,0,1,5,10Z"
                    fill="#464646"
                  />
                </svg>
              </div>
            )}
          </>
        ) : (
          <img className="searchBtn" src={snipper} alt="snipper" />
        )}
      </form>
      {resultList.length !== 0 && (
        <div className="resultListContainer">
          {resultList.slice(0, 12).map((eachResult) => (
            <div
              className="eachResultConainer"
              key={eachResult.imdbId}
              onClick={() => elementClicked(eachResult)}
            >
              {/* Movie Part */}
              {eachResult.type === "movie" && (
                <>
                  <h4 className="resultHeadData">
                    {eachResult.title} {eachResult.year}
                  </h4>
                  <img
                    className="resultSign"
                    src={movieSign}
                    alt="movie sign"
                  />
                </>
              )}

              {/* Series Part */}
              {eachResult.type === "series" && (
                <>
                  <h4 className="resultHeadData">
                    {eachResult.title} {eachResult.firstAirYear}-
                    {eachResult.lastAirYear}
                  </h4>
                  <img
                    className="resultSign"
                    src={seriesSign}
                    alt="series sign"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
