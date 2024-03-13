import React from "react";
import { useLocation } from "react-router-dom";
import { options } from '../APIoptions'

export default function Parameters() {

    const location = useLocation()
    console.log(location.state)

    const [actors, setActors] = React.useState<{}[]>([])
    const [crew, setCrew] = React.useState<{}[]>([])

    React.useEffect(() => {
        async function getMovie() {
            const res1 = await fetch(`https://api.themoviedb.org/3/movie/${location.state.id}/credits?language=en-US`, options)
            const credits = await res1.json()

            const res2 = await fetch(`https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US`, options)
            const details = await res2.json()
        
            console.log(credits)
            console.log(details)

            credits.cast.slice(0,5).forEach((person : {name: string, id: number}) => {
                
                setActors(oldActors => [...oldActors, {"name": person.name, "id": person.id}])
                console.log(actors)
            })

            credits.crew.slice(0,5).forEach((person : {job: string, id: number, name: string}) => {
                setCrew(oldCrew => [{...oldCrew }, {"name": person.name, "id": person.id, "job": person.job}])
                console.log(crew)
            })
        }

        getMovie()
    }, [])

    function getInfo() {
        const directorEl = document.getElementById('director') as HTMLInputElement
        console.log(directorEl.value)
    }



    return (
        <div className="container">
            <h1>What did you like about {location.state.title}?</h1>

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