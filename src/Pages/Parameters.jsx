import React from "react";
import { useLocation } from "react-router-dom";

export default function Parameters() {

    const location = useLocation()
    console.log(location.state)

    return (
        <div className="container">
            <h1>What did you like about it?</h1>

            <input type="checkbox" id="director"/>
            <label htmlFor="director">Genre</label>

            <input type="checkbox" id="director"/>
            <label htmlFor="director">Actors</label>

            <input type="checkbox" id="director"/>
            <label htmlFor="director">Director</label>

            <input type="checkbox" id="writer"/>
            <label htmlFor="director">Writer</label>

            <input type="checkbox" id="writer"/>
            <label htmlFor="director">Year</label>

            <input type="checkbox" id="writer"/>
            <label htmlFor="director">Length</label>

            <input type="checkbox" id="writer"/>
            <label htmlFor="director">Language</label>

            <input type="checkbox" id="writer"/>
            <label htmlFor="director">Cinematography</label>

            <input type="checkbox" id="writer"/>
            <label htmlFor="director">Costume Design</label>

            <input type="checkbox" id="writer"/>
            <label htmlFor="director">Set Decoration</label>

            <input type="checkbox" id="writer"/>
            <label htmlFor="director">Score</label>

            <input type="checkbox" id="writer"/>
            <label htmlFor="director">Songs</label>

        </div>
    )
}