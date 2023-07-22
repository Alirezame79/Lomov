import React from "react";
import SearchMovie from "./components/SearchMovie";
import SearchResult from "./components/SearchResult";
import './App.css'

export default function App() {

    return (
        <div className='appBody'>
            <h2 className='appTopic'>Lomov App</h2>
            <SearchMovie />
            <SearchResult />

        </div>
    )
}
