import React, { useEffect } from "react";
import SearchMovie from "./components/SearchMovie";
import SearchResult from "./components/SearchResult";
import './App.css'
import ShowModal from "./portal/ShowModal";

export default function App() {
    useEffect(() => {
        const url = 'https://streaming-availability.p.rapidapi.com/v2/search/title?title=inception&country=us&show_type=movie&output_language=en';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '86daca9d1fmshb2eeb57f7e677d9p182f67jsncf9d222a6dd5',
                'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            }
        };

        try {
            fetch(url, options).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
            })
        } catch (error) {
            console.error(error);
        }
    }, [])

    return (
        <div className='appBody'>
            <h2 className='appTopic'>Lomov App</h2>
            <SearchMovie />
            <SearchResult />

        </div>
    )
}
