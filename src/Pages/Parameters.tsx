import React from "react";
import { useLocation } from "react-router-dom";
import { options } from '../APIoptions'
import PeopleInput from "../components/PeopleInput/PeopleInput";

export default function Parameters() {

    const location = useLocation()


    const [actors, setActors] = React.useState<{job: string, id: number, name: string}[]>([])
    // const [crew, setCrew] = React.useState<{job: string, id: number, name: string}[]>([])
    const [directorWriter, setDirectorWriter] = React.useState<{job: string, id: number, name: string}[]>([])
    const [otherCrew, setOtherCrew] = React.useState<{job: string, id: number, name: string}[]>([])
    const [movieDetails, setDetails] = React.useState<{}>({})

    // React.useEffect(() => {
    //     console.log(crew, actors)
    // }, [crew, actors])

    React.useEffect(() => {
        async function getMovie() {
            const res1 = await fetch(`https://api.themoviedb.org/3/movie/${location.state.id}/credits?language=en-US`, options)
            const credits = await res1.json()

            const res2 = await fetch(`https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US`, options)
            const details = await res2.json()

            console.log(details)

            setDetails(details)

            const newActors = credits.cast.slice(0,5).map((person : {job: string, id: number, name: string}) =>  ({"name": person.name, "id": person.id, "job": "Actor"})) 
            setActors(newActors)
           
            const crew = credits.crew.map((person : {job: string, id: number, name: string}) => ({"name": person.name, "id": person.id, "job": person.job}))
            // setCrew(newCrew)

            const directorWriters = crew.filter((crewMember: { job: string, id: number, name: string }) => {
                return crewMember.job === "Director" || crewMember.job === "Writer" || crewMember.job === "Screenplay";
            });

            setDirectorWriter(directorWriters)
        }

        getMovie()
    }, [])

    function getInfo() {
        const directorEl = document.getElementById('director') as HTMLInputElement
        console.log(directorEl.value)

    }

    return (
        <div className="container parameters">
            <h1 className="question">What did you like about {location.state.title}?</h1>

            <h2>Details</h2>

            <h2>Directors/Writers</h2>
            <PeopleInput people={directorWriter}/>

            <h2>Actors</h2>
            <PeopleInput people={actors}/>

            <hr></hr>

            <input type="checkbox" id="genre"/>
            <label htmlFor="genre">Genre</label>

            <input type="checkbox" id="actor" />
            <label htmlFor="actor">Actors</label>

            <input type="checkbox" id="director" value='director'/>
            <label htmlFor="director">Director</label>

            <input type="checkbox" id="writer"/>
            <label htmlFor="writer">Writer</label>

            <input type="checkbox" id="year"/>
            <label htmlFor="year">Year</label>

            <input type="checkbox" id="length"/>
            <label htmlFor="length">Length</label>

            <input type="checkbox" id="language"/>
            <label htmlFor="language">Language</label>

            <input type="checkbox" id="cinematography"/>
            <label htmlFor="cinematography">Cinematography</label>

            <input type="checkbox" id="costume design"/>
            <label htmlFor="costume design">Costume Design</label>

            <input type="checkbox" id="set decoration"/>
            <label htmlFor="set decoration">Set Decoration</label>

            <input type="checkbox" id="score"/>
            <label htmlFor="score">Score</label>

            <input type="checkbox" id="visual effects"/>
            <label htmlFor="visual effects">Visual Effects</label>

            <button onClick={() => getInfo()}>Click</button>

        </div>
    )
}