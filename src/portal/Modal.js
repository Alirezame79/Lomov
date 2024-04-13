import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { GoXCircle } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { visibility } from "../store/index";
import youtube from "./../images/youtube.png";
import imdb from "./../images/imdb.png";

function Back() {
  return <div className={classes.back}></div>;
}

function Front() {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => {
    return state.movie;
  });

  const dynamicBackgroundImage = {
    background: `linear-gradient(to bottom, #000000ff, #000000ee, #000000cc), url(${background()}) 0px 0px / cover`,
  };

  function background() {
    if (selectedMovie.backdropURLs.original !== undefined) {
      return selectedMovie.backdropURLs.original;
    } else {
      return selectedMovie.posterURLs.original;
    }
  }

  function closeClicked() {
    const action = visibility(false);
    dispatch(action);
  }

  return (
    <div style={dynamicBackgroundImage} className={classes.dfront}>
      {/* Close Button */}
      <div className={classes.dcloseBtn}>
        <GoXCircle
          className={classes.dcloseIcon}
          size={50}
          color="white"
          onClick={closeClicked}
        />
      </div>
      {/* Body */}
      <div className={classes.dheader}>
        {/* Left side - Poster */}
        <div className={classes.dimageContainer}>
          <img
            className={classes.dimg}
            src={selectedMovie.posterURLs.original}
            alt="Poster"
            width={"100%"}
          />
        </div>
        {/* Right side - Data */}
        <div className={classes.dtxtHeader}>
          {/* Title - title, year, original name and separator line */}
          <div className={classes.dtitleConatainer}>
            <h1 className={classes.dTitleInfo}>
              {selectedMovie.type === "movie" ? (
                <>
                  {selectedMovie.title} {selectedMovie.year}
                </>
              ) : (
                <>
                  {selectedMovie.title} {selectedMovie.firstAirYear}-
                  {selectedMovie.lastAirYear}
                </>
              )}
            </h1>
            {selectedMovie.originalTitle !== selectedMovie.title && (
              <h3 className={classes.dTagline}>
                ({selectedMovie.originalTitle})
              </h3>
            )}
            <div className={classes.dSeparateLine}></div>
          </div>
          {/* tag line */}
          {selectedMovie.tagline !== "" && (
            <h2 className={classes.dTagline}>" {selectedMovie.tagline} "</h2>
          )}
          {/* second line - genres and runtime */}
          <div className={classes.dgenresRuntime}>
            <h3 className={classes.linearChild}>
              {selectedMovie.genres !== undefined &&
                selectedMovie.genres.map((item, index) => {
                  let genre;
                  if (index === 0) {
                    genre = " " + item.name;
                  } else {
                    genre = ", " + item.name;
                  }
                  return (
                    <p key={index} className={classes.dhorizontalList}>
                      {genre}
                    </p>
                  );
                })}
            </h3>
            {selectedMovie.type === "movie" ? (
              <h3 className={classes.linearChild}>
                {selectedMovie.runtime} minutes
              </h3>
            ) : (
              <h3 className={classes.linearChild}>
                {selectedMovie.seasonCount} season
              </h3>
            )}
          </div>
          {/* Special series line */}
          {selectedMovie.type === "series" && (
            <div className={classes.depisodeCount}>
              <h4 className={classes.singleLinear}>
                Total Episode Count: {selectedMovie.episodeCount}
              </h4>
            </div>
          )}
          {/* third line - countries and languages */}
          <div className={classes.dCountriesLanguages}>
            <h4 className={classes.linearChild}>
              {" "}
              Countries:
              {selectedMovie.countries != undefined &&
                selectedMovie.countries.map((item, index) => {
                  let countries;
                  if (index === 0) {
                    countries = " " + item;
                  } else {
                    countries = ", " + item;
                  }
                  return <p className={classes.dhorizontalList}>{countries}</p>;
                })}
            </h4>
            <h4 className={classes.linearChild}>
              Original Language: {selectedMovie.originalLanguage}
            </h4>
          </div>
          {/* directores - creators */}
          {selectedMovie.type === "movie" ? (
            <h4 className={classes.centerizedText}>
              Directors:
              <br />
              {selectedMovie.directors !== undefined &&
                selectedMovie.directors.map((item, index) => {
                  let director;
                  if (index === 0) {
                    director = " " + item;
                  } else {
                    director = ", " + item;
                  }
                  return (
                    <h3 className={classes.dhorizontalList}>{director}</h3>
                  );
                })}
            </h4>
          ) : (
            <h4 className={classes.centerizedText}>
              Creators:
              <br />
              {selectedMovie.creators !== undefined &&
                selectedMovie.creators.map((item, index) => {
                  let creators;
                  if (index === 0) {
                    creators = " " + item;
                  } else {
                    creators = ", " + item;
                  }
                  return (
                    <h3 className={classes.dhorizontalList}>{creators}</h3>
                  );
                })}
            </h4>
          )}
          {/* Casts */}
          <h4 className={classes.centerizedText}>
            Casts:
            <br />
            {selectedMovie.cast !== undefined &&
              selectedMovie.cast.map((item, index) => {
                if (index === 0) {
                  item = " " + item;
                } else {
                  item = ", " + item;
                }
                return <h3 className={classes.dhorizontalList}> {item}</h3>;
              })}
          </h4>
          {/* Description */}
          <div className={classes.dbody}>
            {}
            <h4 className={classes.centerizedText}>
              Description:
              <br />
              <h3>{selectedMovie.overview}</h3>
            </h4>
          </div>
          {/* youtube trailer and imdb page */}
          <div className={classes.dLogos}>
            {selectedMovie.youtubeTrailerVideoLink !== "" && (
              <a
                href={selectedMovie.youtubeTrailerVideoLink}
                target="_blank"
                rel="noreferrer"
              >
                <img className={classes.logo} src={youtube} alt="Trailer" />
              </a>
            )}
            {selectedMovie.imdbId !== "" && (
              <a
                href={
                  "https://www.imdb.com/title/" + selectedMovie.imdbId + "/"
                }
                target="_blank"
                rel="noreferrer"
              >
                <img className={classes.logo} src={imdb} alt="IMDB" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Modal() {
  return ReactDOM.createPortal(
    <div>
      <Back />
      <Front />
    </div>,
    document.querySelector(".modal_container")
  );
}
