import React, { useEffect } from "react";

export default function SearchByTitle({ title }) {
    console.log(title);
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
            console.log(data);
            return data;
        })
    } catch (error) {
        console.error(error);
        return error;
    }

}