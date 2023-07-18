import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from './Modal.module.css';

function Back() {
    return <div className={classes.back}></div>
}

function Front({ movie }) {
    const [movieData, setMovieData] = useState({
        directors: []
    });
    const [movieImage, setMovieImage] = useState('');

    useEffect(() => {
        const url = 'https://movies-tv-shows-database.p.rapidapi.com/?movieid=' + movie;
        const options = {
            method: 'GET',
            headers: {
                Type: 'get-movies-images-by-imdb',
                'X-RapidAPI-Key': '86daca9d1fmshb2eeb57f7e677d9p182f67jsncf9d222a6dd5',
                'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
            }
        };

        try {
            fetch(url, options).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                setMovieData(data);
            })
        } catch (error) {
            console.error(error);
        }

        const url2 = 'https://movies-tv-shows-database.p.rapidapi.com/?movieid=' + movie;
        const options2 = {
            method: 'GET',
            headers: {
                Type: 'get-movie-details',
                'X-RapidAPI-Key': '86daca9d1fmshb2eeb57f7e677d9p182f67jsncf9d222a6dd5',
                'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
            }
        };

        try {
            fetch(url2, options2).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                setMovieImage(data);
            })
        } catch (error) {
            console.error(error);
        }
    }, [])

    return (
        <div className={classes.front}>
            <div className={classes.header}>
                <div className={classes.imageContainer}>
                    <img src={movieImage.poster} alt="Poster" width={"100%"} />
                </div>
                <div className={classes.txtHeader}>
                    <h2 >{movieData.title} {movieData.year}</h2>
                    <h3>{movieData.tagline}</h3>
                    <h3>
                        {movieData.genres != undefined &&
                            movieData.genres.map((item, index) => {
                                if (index > 2) return null;
                                if (index !== 0) item = ', ' + item;
                                return (
                                    <p className={classes.horizontalList}>{item}</p>
                                );
                            })}</h3>
                    <h4> Directors:
                        {movieData.directors != undefined &&
                            movieData.directors.map((item, index) => {
                                if (index > 2) return null;
                                if (index !== 0) item = ', ' + item;
                                return (<p className={classes.horizontalList}> {item}</p>)
                            })}
                    </h4>
                    <h4>{movieData.runtime} minutes</h4>
                </div>
            </div>
            <div className={classes.body}>
                <div className={classes.stars}>
                    <h4> Stars:
                        {movieData.stars != undefined &&
                            movieData.stars.map((item, index) => {
                                if (index > 7) return null;
                                if (index !== 0) item = ', ' + item;
                                return (<p className={classes.horizontalList}> {item}</p>)
                            })}
                    </h4>
                </div>
                <div>
                    <h4>Description: {movieData.description}</h4>
                </div>
            </div>
        </div>
    );

}

export default function Modal({ movie }) {

    return ReactDOM.createPortal(
        <div>
            <Back />
            <Front movie={movie} />
        </div>,
        document.querySelector('.modal_container')
    )
}