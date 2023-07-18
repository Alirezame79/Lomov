import { createSlice } from '@reduxjs/toolkit';

const selectedMovie = createSlice({
    name: "movie",
    initialState: {
        image: "",
        name: "",
        year: ""
    },
    reducers: {
        setMovie(state, action) {
            let data1;
            let data2;
            const url = 'https://movies-tv-shows-database.p.rapidapi.com/?movieid=' + action.payload;
            const options = {
                method: 'GET',
                headers: {
                    Type: 'get-movie-details',
                    'X-RapidAPI-Key': '86daca9d1fmshb2eeb57f7e677d9p182f67jsncf9d222a6dd5',
                    'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
                }
            };

            try {
                fetch(url, options).then((response) => {
                    return response.json();
                }).then((data) => {
                    console.log(data);
                    data1 = data;
                })
            } catch (error) {
                console.error(error);
                return error;
            }

            const url2 = 'https://movies-tv-shows-database.p.rapidapi.com/?movieid=' + action.payload;
            const options2 = {
                method: 'GET',
                headers: {
                    Type: 'get-show-images-by-imdb',
                    'X-RapidAPI-Key': '86daca9d1fmshb2eeb57f7e677d9p182f67jsncf9d222a6dd5',
                    'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
                }
            };

            try {
                fetch(url2, options2).then((response) => {
                    return response.json();
                }).then((data) => {
                    console.log(data);
                    data2 = data;
                })
            } catch (error) {
                console.error(error);
                return error;
            }

            console.log(data1);
            console.log(data2);
        }
    }
})

export { selectedMovie };
export const { setMovie } = selectedMovie.actions;