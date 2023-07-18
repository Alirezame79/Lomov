import React, { useState } from 'react';
import SearchByTitle from '../fetch/SearchByTitle';
import SearchResult from './SearchResult';
import classes from './SearchMovie.module.css';

import { useDispatch } from 'react-redux';
import { updateList } from '../store/index'

export default function SearchMovie() {
    const [list, setList] = useState([]);
    const dispatch = useDispatch();

    function handleChange(e) {
        const title = e.target.value.replaceAll(" ", "%20");
        if (title === "") {
            setList([]);
            return;
        }
        const url = 'https://movies-tv-shows-database.p.rapidapi.com/?title=' + title;
        const options = {
            method: 'GET',
            headers: {
                Type: 'get-movies-by-title',
                'X-RapidAPI-Key': '86daca9d1fmshb2eeb57f7e677d9p182f67jsncf9d222a6dd5',
                'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
            }
        };

        try {
            fetch(url, options).then((response) => {
                return response.json();
            }).then((data) => {
                const action = updateList(data.movie_results);
                dispatch(action);
                // console.log(data.movie_results);
                // console.log(data);
                // let myList = [];
                // for (let i = 0; i < data.search_results; i++) {
                //     myList.push(data.movie_results[i]);
                // }
                // setList(myList);
            })
        } catch (error) {
            console.error(error);
        }
        // setList(result);
    }


    return (
        <div className={classes.container}>
            <input className={classes.searchInput} placeholder='Name' onChange={handleChange} />
            {/* <ul> */}
            {/* {list.map((item) => {
                    return <li key={item.imdb_id}>{item.title} {item.year}</li>
                })} */}
            {/* {list[0]} */}
            {/* </ul> */}

        </div>
    );
}
