import React from "react";
import { useLocation } from "react-router-dom";
import { options } from '/src/APIoptions.jsx'

export default function Parameters() {

    const location = useLocation()
    console.log(location.state)

    const actors = []
    const crew = []

    React.useEffect(() => {
        async function getMovie() {
            const res1 = await fetch('https://api.themoviedb.org/3/movie/152601/credits?language=en-US', options)
            const credits = await res1.json()

            const res2 = await fetch('https://api.themoviedb.org/3/movie/152601?language=en-US', options)
            const details = await res2.json()
        
            console.log(credits)
            console.log(details)

            credits.cast.slice(0,5).forEach((person) => {
                actors.push(person.name)
                console.log(actors)
            })

            credits.crew.slice(0,5).forEach((person) => {
                crew.push({job: person.job})
                console.log(crew)
            })
        }

        getMovie()
    }, [])

    function getInfo() {
        console.log(document.getElementById('director').value)
    }

    actors.forEach((person) => {
        console.log(person)
    })

    return (
        <div className="container">
            <h1>What did you like about it?</h1>

            <input type="checkbox" id="genre"/>
            <label htmlFor="director">Genre</label>

            <input type="checkbox" id="actor" />
            <label htmlFor="director">Actors</label>

            <input type="checkbox" id="director" value='director'/>
            <label htmlFor="director">Director</label>

            <input type="checkbox" id="writer"/>
            <label htmlFor="director">Writer</label>

            <input type="checkbox" id="year"/>
            <label htmlFor="director">Year</label>

            <input type="checkbox" id="length"/>
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

            <button onClick={() => getInfo()}>Click</button>

        </div>
    )
}