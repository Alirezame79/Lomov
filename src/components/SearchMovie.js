import React, { useRef, useState } from 'react';
import classes from './SearchMovie.module.css';
import { headers } from '../privateData/private';
import { useDispatch } from 'react-redux';
import { updateList, resetList } from '../store/index'

export default function SearchMovie() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const movieName = useRef('');

    function handleChange(e) {
        const action = resetList();
        dispatch(action);
    }

    async function serachMovie() {
        const title = movieName.current.value.replaceAll(" ", "%20");
        if (title === "") {
            return;
        }

        const url = 'https://streaming-availability.p.rapidapi.com/v2/search/title?title='
            + title + '&country=us&show_type=movie&output_language=en';
        const options = {
            method: 'GET',
            headers: headers
        };

        try {
            setLoading(true);
            await fetch(url, options).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data.result);
                setLoading(false);
                const action = updateList(data.result);
                dispatch(action);
            })
        } catch (error) {
            setLoading(false);
            return;
        }
    }


    return (
        <div className={classes.container}>
            <input className={classes.searchInput} ref={movieName} placeholder='Name' onChange={handleChange} />
            <button className={classes.searchBtn} onClick={serachMovie}>Search</button>
            <h6 className={classes.loading}>{loading && 'Loading...'}</h6>
        </div>
    );
}
