import React from "react";
import ReactDOM from "react-dom";
import classes from './Modal.module.css';
import { useSelector } from 'react-redux';
import { GoXCircle } from "react-icons/go";
import { useDispatch } from 'react-redux';
import { visibility } from '../store/index'

function Back() {
    return <div className={classes.back}></div>
}

function Front() {
    const dispatch = useDispatch();
    const selectedMovie = useSelector((state) => {
        return state.movie;
    })
    // console.log(selectedMovie);
    let overview;

    function isMobile() {
        return (window.innerWidth <= 500);
    }

    function closeClicked() {
        const action = visibility(false);
        dispatch(action);
    }

    // console.log(selectedMovie.overview.length)
    if (selectedMovie.overview.length >= 400) {
        overview = <h6>{selectedMovie.overview}</h6>
    } else {
        overview = <h4>{selectedMovie.overview}</h4>
    }

    if (isMobile()) {
        return (        // Mobile mode
            <div className={classes.mfront}>
                <div className={classes.mcloseBtn} >
                    <GoXCircle className={classes.mcloseIcon} size={25} onClick={closeClicked} />
                </div>
                <div className={classes.mheader}>
                    {/* <div className={classes.imageContainer}> */}
                    <img className={classes.mimg} src={selectedMovie.posterURLs.original} alt="Poster" width={"100%"} />
                    {/* </div> */}
                    <div className={classes.mtxtHeader}>
                        <h2 className={classes.mtitle}>{selectedMovie.title}<br />{selectedMovie.year}</h2>
                        <h3 className={classes.mtagline}>{selectedMovie.tagline}</h3>
                        <h4 className={classes.mgenres}>Genres:
                            {selectedMovie.genres != undefined &&
                                selectedMovie.genres.map((item, index) => {
                                    let genre;
                                    if (index === 0) {
                                        genre = ' ' + item.name;
                                    } else {
                                        genre = ', ' + item.name;
                                    }
                                    return (
                                        <p className={classes.mhorizontalList}>{genre}</p>
                                    );
                                })}</h4>
                        <h4 className={classes.mruntime}>Runtime: {selectedMovie.runtime} minutes</h4>
                    </div>
                </div>
                <div className={classes.mbody}>
                    <h4 className={classes.mdirectors}> Directors:
                        {selectedMovie.directors != undefined &&
                            selectedMovie.directors.map((item, index) => {
                                let director;
                                if (index === 0) {
                                    director = ' ' + item;
                                } else {
                                    director = ', ' + item;
                                }
                                return (<p className={classes.mhorizontalList}>{director}</p>)
                            })}
                    </h4>
                    <h4 className={classes.mstars}> Stars:
                        {selectedMovie.cast != undefined &&
                            selectedMovie.cast.map((item, index) => {
                                if (index === 0) {
                                    item = ' ' + item;
                                } else {
                                    item = ', ' + item;
                                }
                                return (<p className={classes.mhorizontalList}> {item}</p>)
                            })}
                    </h4>
                    <h3 className={classes.moverview}> Description: {overview}</h3>
                </div>
            </div>
        );


    } else {        // Desktop mode
        return (
            <div className={classes.dfront}>
                <div className={classes.dcloseBtn} >
                    <GoXCircle className={classes.dcloseIcon} size={50} onClick={closeClicked} />
                </div>
                <div className={classes.dheader}>
                    <div className={classes.dimageContainer}>
                        <img className={classes.dimg} src={selectedMovie.posterURLs.original} alt="Poster" width={"100%"} />
                    </div>
                    <div className={classes.dtxtHeader}>
                        <h2 >{selectedMovie.title} {selectedMovie.year}</h2>
                        <h3>{selectedMovie.tagline}</h3>
                        <h4> Genres:
                            {selectedMovie.genres != undefined &&
                                selectedMovie.genres.map((item, index) => {
                                    let genre;
                                    if (index === 0) {
                                        genre = ' ' + item.name;
                                    } else {
                                        genre = ', ' + item.name;
                                    }
                                    return (
                                        <p className={classes.dhorizontalList}>{genre}</p>
                                    );
                                })}</h4>
                        <h4> Directors:
                            {selectedMovie.directors != undefined &&
                                selectedMovie.directors.map((item, index) => {
                                    let director;
                                    if (index === 0) {
                                        director = ' ' + item;
                                    } else {
                                        director = ', ' + item;
                                    }
                                    return (<p className={classes.dhorizontalList}>{director}</p>)
                                })}
                        </h4>
                        <h4> Stars:
                            {selectedMovie.cast != undefined &&
                                selectedMovie.cast.map((item, index) => {
                                    if (index === 0) {
                                        item = ' ' + item;
                                    } else {
                                        item = ', ' + item;
                                    }
                                    return (<p className={classes.dhorizontalList}> {item}</p>)
                                })}
                        </h4>
                        <h4>Runtime: {selectedMovie.runtime} minutes</h4>
                    </div>
                </div>
                <div className={classes.dbody}>
                    { }
                    <h3> Description: {overview}</h3>
                </div>
            </div>
        );
    }
}

export default function Modal() {

    return ReactDOM.createPortal(
        <div>
            <Back />
            <Front />
        </div>,
        document.querySelector('.modal_container')
    )
}